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
}