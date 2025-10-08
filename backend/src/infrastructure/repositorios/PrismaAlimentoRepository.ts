import prisma from "../../config/db"
import { Alimento } from "../../domain/entities/Alimento"
import { IAlimentoRepository } from "../../domain/interfaces/IAlimentoRepository"
import { DetalleAlimento } from "../../domain/entities/DetalleAlimento"
import { Suministro } from "../../domain/entities/Suministro"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export class PrismaAlimentoRepository implements IAlimentoRepository {
  private toDomain(data: any): Alimento {
    if (!data) throw new Error("Invalid database object")

    const id = typeof data.id === "number" ? data.id : (typeof data.ID === "number" ? data.ID : undefined)
    if (id === undefined) throw new Error("Missing id in alimento DB object")

    const nroSerieRaw = data.nro_serie ?? data.nroSerie ?? data.nro ?? undefined
    if (nroSerieRaw === undefined || nroSerieRaw === null) throw new Error("Missing nroSerie in alimento DB object")
    const nroSerie = Number(nroSerieRaw)

    if (data.vencimiento == null) throw new Error("Missing vencimiento in alimento DB object")
    const vencimiento = new Date(data.vencimiento)

    // mapear detallealimento: Prisma define `detallealimento` como array. Tomamos el primero si existe.
    let detalle: DetalleAlimento | undefined = undefined
    if (Array.isArray(data.detallealimento) && data.detallealimento.length > 0) {
      const d = data.detallealimento[0]
      detalle = new DetalleAlimento(d.id, d.nombre, d.tipo, d.id_alimento)
    }

    let suministros: Suministro[] | undefined = undefined
    const suministrosRaw = data.Suministro ?? data.suministros ?? data.suministro
    if (Array.isArray(suministrosRaw) && suministrosRaw.length > 0) {
      suministros = suministrosRaw.map((s: any) => new Suministro(s.id, s.cantidad, s.id_alimentacion, s.id_alimento))
    }

    return new Alimento(id, nroSerie, vencimiento, detalle, suministros)
  }

  public async findById(id: number): Promise<Alimento | null> {
    const data = await prisma.alimento.findUnique({
      where: { id },
      include: { detallealimento: true, Suministro: true }
    })
    return data ? this.toDomain(data) : null
  }

  public async findAll(): Promise<Alimento[]> {
    const data = await prisma.alimento.findMany({ include: { detallealimento: true, Suministro: true } })
    return data.map(this.toDomain)
  }

  public async create(alimento: Alimento): Promise<Alimento> {
    // preparar nested create si vienen relaciones
    const detalle = alimento.getDetalleAlimento()
    const suministros = alimento.getSuministro()

    const nuevo = await prisma.alimento.create({
      data: {
        nro_serie: Number(alimento.getNroSerie()),
        vencimiento: alimento.getVencimiento().toISOString(),
        detallealimento: detalle ? { create: { nombre: detalle.nombre, tipo: detalle.tipo } } : undefined,
        Suministro: suministros ? { create: suministros.map(s => ({ cantidad: s.cantidad, id_alimentacion: s.idAlimentacion })) } : undefined
      },
      include: { detallealimento: true, Suministro: true }
    })
    return this.toDomain(nuevo)
  }

  public async update(alimento: Alimento): Promise<void> {
    try {
      await prisma.alimento.update({
        where: { id: alimento.getId() },
        data: {
          nro_serie: Number(alimento.getNroSerie()),
          vencimiento: alimento.getVencimiento().toISOString()
          // actualizaciones de relaciones (detalle/suministros) normalmente se manejan en repositorios específicos
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Alimento no encontrado")
      }
      throw error
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await prisma.alimento.delete({ where: { id } })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Alimento no encontrado")
      }
      throw error
    }
  }

  public async exists(id: number): Promise<boolean> {
    const count = await prisma.alimento.count({ where: { id } })
    return count > 0
  }
}
