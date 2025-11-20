import prisma from "../../config/db"
import { Corral } from "../../domain/entities/Corral" // Importa la NUEVA entidad
import { ICorralRepository } from "../../domain/interfaces/ICorralRepository"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

// Importamos el TIPO que Prisma genera para el modelo Corral
import { Corral as PrismaCorralModel } from "@prisma/client"

export class PrismaCorralRepository implements ICorralRepository {
  private toDomain(data: {
    id: number
    capacidad_maxima: number
    numero: number
    tipo_corral: PrismaTipoCorral
    id_alimentacion: number | null
    id_feedlot: number
    alimentacion?: { id: number; nombre: string } | null
  }): Corral {
    return new Corral(
      data.id,
      data.capacidad_maxima,
      data.numero,
      fromPrismaTipoCorral(data.tipo_corral),
      data.id_alimentacion,
      data.id_feedlot,
      data.alimentacion?.nombre // 👈 ahora mapeamos el nombre de la dieta
    )
  }

  public async findById(id: number): Promise<Corral | null> {
    const data = await prisma.corral.findUnique({
      where: { id },
<<<<<<< HEAD
=======
      include: { alimentacion: true }, // 👈 incluimos la relación
>>>>>>> 84711866ea9d4a65d49833b54dfd103de65827aa
    })
    return data ? this.toDomain(data) : null
  }

  public async findAll(): Promise<Corral[]> {
    const data = await prisma.corral.findMany({
<<<<<<< HEAD
=======
      include: { alimentacion: true }, // 👈 incluimos la relación
>>>>>>> 84711866ea9d4a65d49833b54dfd103de65827aa
    })
    return data.map(d => this.toDomain(d))
  }

  public async create(data: Omit<Corral, "id">): Promise<Corral> {
    const nuevo = await prisma.corral.create({
<<<<<<< HEAD
      data: data, 
=======
      data: {
        capacidad_maxima: corral.capacidadMaxima,
        numero: corral.numero,
        tipo_corral: toPrismaTipoCorral(corral.tipoCorral),
        id_alimentacion: corral.idAlimentacion,
        id_feedlot: corral.idFeedlot,
      },
      include: { alimentacion: true }, // 👈 devolvemos también la dieta
>>>>>>> 84711866ea9d4a65d49833b54dfd103de65827aa
    })
    return this.toDomain(nuevo)
  }

  public async update(id: number, data: Partial<Omit<Corral, "id">>): Promise<Corral> {
    try {
<<<<<<< HEAD
      const actualizado = await prisma.corral.update({
        where: { id: id },
        data: data, 
=======
      await prisma.corral.update({
        where: { id: corral.id },
        data: {
          capacidad_maxima: corral.capacidadMaxima,
          numero: corral.numero,
          tipo_corral: toPrismaTipoCorral(corral.tipoCorral),
          id_alimentacion: corral.idAlimentacion,
          id_feedlot: corral.idFeedlot,
        },
>>>>>>> 84711866ea9d4a65d49833b54dfd103de65827aa
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
}