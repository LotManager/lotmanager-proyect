import prisma from "../../config/db"
import { Corral } from "../../domain/entities/Corral"
import { ICorralRepository } from "../../domain/interfaces/ICorralRepository"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { toPrismaTipoCorral, fromPrismaTipoCorral } from "../../application/mappers/tipoCorral.mapper"
import { TipoCorral as PrismaTipoCorral } from "@prisma/client"

export class PrismaCorralRepository implements ICorralRepository {
  private toDomain(data: {
    id: number
    capacidad_maxima: number
    numero: number
    tipo_corral: PrismaTipoCorral
    id_alimentacion: number | null
    id_feedlot: number
  }): Corral {
    return new Corral(
      data.id,
      data.capacidad_maxima,
      data.numero,
      fromPrismaTipoCorral(data.tipo_corral),
      data.id_alimentacion,
      data.id_feedlot
    )
  }

  public async findById(id: number): Promise<Corral | null> {
    const data = await prisma.corral.findUnique({ where: { id } })
    return data ? this.toDomain(data) : null
  }

  public async findAll(): Promise<Corral[]> {
    const data = await prisma.corral.findMany()
    return data.map(this.toDomain)
  }

  public async create(corral: Corral): Promise<Corral> {
    const nuevo = await prisma.corral.create({
      data: {
        capacidad_maxima: corral.capacidadMaxima,
        numero: corral.numero,
        tipo_corral: toPrismaTipoCorral(corral.tipoCorral),
        id_alimentacion: corral.idAlimentacion,
        id_feedlot: corral.idFeedlot
      }
    })
    return this.toDomain(nuevo)
  }

  public async update(corral: Corral): Promise<void> {
    try {
      await prisma.corral.update({
        where: { id: corral.id },
        data: {
          capacidad_maxima: corral.capacidadMaxima,
          numero: corral.numero,
          tipo_corral: toPrismaTipoCorral(corral.tipoCorral),
          id_alimentacion: corral.idAlimentacion,
          id_feedlot: corral.idFeedlot
        }
      })
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