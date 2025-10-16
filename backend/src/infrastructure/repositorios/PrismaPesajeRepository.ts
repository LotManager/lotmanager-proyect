import prisma from "../../config/db"
import { Pesaje } from "../../domain/entities/Pesaje"
import { IPesajeRepository } from "../../domain/interfaces/IPesajeRepository"

export class PrismaPesajeRepository implements IPesajeRepository {
  private toDomain(data: {
    id: number
    id_bovino: number
    fecha: Date
    peso_dado: number
  }): Pesaje {
    return new Pesaje(data.id, data.id_bovino, data.fecha, data.peso_dado)
  }

  public async create(data: Omit<Pesaje, "id">): Promise<Pesaje> {
    const nuevo = await prisma.pesaje.create({
      data: {
        id_bovino: data.id_bovino,
        fecha: data.fecha,
        peso_dado: data.peso_dado,
      },
    })
    return this.toDomain(nuevo)
  }

  public async findByBovino(id_bovino: number): Promise<Pesaje[]> {
    const pesajes = await prisma.pesaje.findMany({
      where: { id_bovino },
      orderBy: { fecha: "asc" },
    })
    return pesajes.map(p => this.toDomain(p))
  }
}