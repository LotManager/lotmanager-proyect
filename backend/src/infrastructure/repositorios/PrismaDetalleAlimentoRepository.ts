import prisma from "../../config/db"
import { DetalleAlimento } from "../../domain/entities/DetalleAlimento"
import { IDetalleAlimentoRepository } from "../../domain/interfaces/IDetalleAlimentoRepository"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export class PrismaDetalleAlimentoRepository implements IDetalleAlimentoRepository {
  private toDomain(data: {
    id: number
    nombre: string
    tipo: string
    id_alimento: number
  }): DetalleAlimento {
    return new DetalleAlimento(data.id, data.nombre, data.tipo, data.id_alimento)
  }

  public async findById(id: number): Promise<DetalleAlimento | null> {
    const data = await prisma.detalleAlimento.findUnique({ where: { id } })
    return data ? this.toDomain(data) : null
  }

  public async findAll(): Promise<DetalleAlimento[]> {
    const data = await prisma.detalleAlimento.findMany()
    return data.map(this.toDomain)
  }

  public async create(detalle: DetalleAlimento): Promise<DetalleAlimento> {
    const nuevo = await prisma.detalleAlimento.create({
      data: {
        nombre: detalle.nombre,
        tipo: detalle.tipo,
        id_alimento: detalle.idAlimento
      }
    })
    return this.toDomain(nuevo)
  }

  public async update(detalle: DetalleAlimento): Promise<void> {
    try {
      await prisma.detalleAlimento.update({
        where: { id: detalle.id },
        data: {
          nombre: detalle.nombre,
          tipo: detalle.tipo,
          id_alimento: detalle.idAlimento
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("DetalleAlimento no encontrado")
      }
      throw error
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await prisma.detalleAlimento.delete({ where: { id } })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("DetalleAlimento no encontrado")
      }
      throw error
    }
  }

  public async exists(id: number): Promise<boolean> {
    const count = await prisma.detalleAlimento.count({ where: { id } })
    return count > 0
  }
}