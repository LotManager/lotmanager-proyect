import prisma from "../../config/db"
import { Corral } from "../../domain/entities/Corral" // Importa la NUEVA entidad
import { ICorralRepository } from "../../domain/interfaces/ICorralRepository"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

// Importamos el TIPO que Prisma genera para el modelo Corral
import { Corral as PrismaCorralModel } from "@prisma/client"

export class PrismaCorralRepository implements ICorralRepository {

  private toDomain(prismaCorral: PrismaCorralModel): Corral {
    return new Corral(
      prismaCorral.id,
      prismaCorral.capacidadMaxima,
      prismaCorral.numero,
      prismaCorral.tipo,
      prismaCorral.feedlotId
    )
  }

  public async findById(id: number): Promise<Corral | null> {
    const data = await prisma.corral.findUnique({
      where: { id },
    })
    return data ? this.toDomain(data) : null
  }

  public async findAll(): Promise<Corral[]> {
    const data = await prisma.corral.findMany({
    })
    return data.map(d => this.toDomain(d))
  }

  public async create(data: Omit<Corral, "id">): Promise<Corral> {
    const nuevo = await prisma.corral.create({
      data: data, 
    })
    return this.toDomain(nuevo)
  }

  public async update(id: number, data: Partial<Omit<Corral, "id">>): Promise<Corral> {
    try {
      const actualizado = await prisma.corral.update({
        where: { id: id },
        data: data, 
      })
      return this.toDomain(actualizado)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Corral no encontrado")
      }
      throw error
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await prisma.corral.delete({ where: { id } })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Corral no encontrado")
      }
      throw error
    }
  }

  public async exists(id: number): Promise<boolean> {
    const count = await prisma.corral.count({ where: { id } })
    return count > 0
  }

  public async findAllConUltimoSuministro(): Promise<any[]> {
    return prisma.corral.findMany({
      include: {
        suministros: {
          orderBy: { fecha: 'desc' }, 
          take: 1,                    
          include: {
            dieta: true               
          }
        }
      },
      orderBy: { numero: 'asc' }     
    });
  }

  public async getConsumoReciente(idCorral: number, dias: number): Promise<number> {
    // 1. Calculamos la fecha límite (Hoy - X días)
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - dias);

    // 2. Usamos Prisma aggregate para sumar rápido en la base de datos
    const aggregations = await prisma.suministro.aggregate({
      _sum: {
        cantidadKg: true, // Sumamos esta columna
      },
      where: {
        corralId: idCorral, // Solo de este corral
        fecha: {
          gte: fechaLimite, // gte = Greater Than or Equal (Mayor o igual a la fecha límite)
        },
      },
    });

    // 3. Devolvemos la suma (o 0 si no hubo suministros)
    return aggregations._sum.cantidadKg || 0;
  }

  public async findByIdConUltimoSuministro(id: number): Promise<any> {
    return prisma.corral.findUnique({
      where: { id },
      include: {
        suministros: {
          orderBy: { fecha: 'desc' },
          take: 1,
          include: { dieta: true } // Traemos el nombre de la dieta
        }
      }
    });
  }

  public async findUltimosSuministros(idCorral: number, limite: number): Promise<any[]> {
    return prisma.suministro.findMany({
      where: { corralId: idCorral },
      orderBy: { fecha: 'desc' }, // Del más nuevo al más viejo
      take: limite,
      include: {
        dieta: { select: { nombre: true } } // Solo necesitamos el nombre
      }
    });
  }
}


