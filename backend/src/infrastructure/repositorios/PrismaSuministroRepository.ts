import prisma from "../../config/db"
import { Suministro } from "../../domain/entities/Suministro"
import { ISuministroRepository } from "../../domain/interfaces/ISuministroRepository"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export class PrismaSuministroRepository implements ISuministroRepository {
  private toDomain(data: {
    id: number
    cantidad: number
    id_alimentacion: number
    id_alimento: number
  }): Suministro {
    return new Suministro(
      data.id,
      data.cantidad,
      data.id_alimentacion,
      data.id_alimento
    )
  }

  public async findById(id: number): Promise<Suministro | null> {
    const data = await prisma.suministro.findUnique({ where: { id } })
    return data ? this.toDomain(data) : null
  }

  public async findAll(): Promise<Suministro[]> {
    const data = await prisma.suministro.findMany()
    return data.map(this.toDomain)
  }

  public async create(suministro: Suministro): Promise<Suministro> {
    const nuevo = await prisma.suministro.create({
      data: {
        cantidad: suministro.cantidad,
        id_alimentacion: suministro.idAlimentacion,
        id_alimento: suministro.idAlimento
      }
    })
    return this.toDomain(nuevo)
  }

  public async update(suministro: Suministro): Promise<void> {
    try {
      await prisma.suministro.update({
        where: { id: suministro.id },
        data: {
          cantidad: suministro.cantidad,
          id_alimentacion: suministro.idAlimentacion,
          id_alimento: suministro.idAlimento
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Suministro no encontrado")
      }
      throw error
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await prisma.suministro.delete({ where: { id } })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Suministro no encontrado")
      }
      throw error
    }
  }

  public async exists(id: number): Promise<boolean> {
    const count = await prisma.suministro.count({ where: { id } })
    return count > 0
  }
}