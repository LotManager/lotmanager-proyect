import prisma from "../../config/db"
import { Alimentacion } from "../../domain/entities/Alimentacion"
import { IAlimentacionRepository } from "../../domain/interfaces/IAlimentacionRepository"
import { Corral } from "../../domain/entities/Corral"
import { Suministro } from "../../domain/entities/Suministro"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export class PrismaAlimentacionRepository implements IAlimentacionRepository {
  private toDomain(data: any): Alimentacion {
    if (!data) throw new Error("Invalid database object")

    const id = typeof data.id === "number" ? data.id : (typeof data.ID === "number" ? data.ID : undefined)
    if (id === undefined) throw new Error("Missing id in alimentacion DB object")

  const descripcion = data.descripcion ?? data.description ?? data.name ?? undefined
  if (descripcion === undefined || descripcion === null) throw new Error("Missing descripcion in alimentacion DB object")

  const nombre = data.nombre ?? data.name ?? data.nombre ?? String(descripcion).slice(0, 100)

    // mapear corrales (relación opcional) -> Alimentacion.corral es Corral[] en el dominio
    let corrales: Corral[] | undefined = undefined
    const corralRaw = data.corral ?? data.Corral ?? data.corrales
    if (Array.isArray(corralRaw) && corralRaw.length > 0) {
      corrales = corralRaw.map((c: any) => new Corral(c.id, c.capacidad_maxima, c.numero, c.tipo_corral, c.id_alimentacion, c.id_feedlot))
    } else if (corralRaw && typeof corralRaw === "object") {
      // caso cuando viene un solo objeto (compatibilidad)
      const c = corralRaw
      corrales = [new Corral(c.id, c.capacidad_maxima, c.numero, c.tipo_corral, c.id_alimentacion, c.id_feedlot)]
    }

    // mapear suministros (puede venir en diferentes nombres)
    let suministros: Suministro[] | undefined = undefined
    const suministrosRaw = data.Suministro ?? data.suministros ?? data.suministro
    if (Array.isArray(suministrosRaw) && suministrosRaw.length > 0) {
      suministros = suministrosRaw.map((s: any) => new Suministro(s.id, s.cantidad, s.id_alimentacion, s.id_alimento))
    }

  return new Alimentacion(id, descripcion, nombre, corrales, suministros)
  }

  public async findById(id: number): Promise<Alimentacion | null> {
    const data = await prisma.alimentacion.findUnique({ where: { id }, include: { corral: true, Suministro: true } })
    return data ? this.toDomain(data) : null
  }

  public async findAll(): Promise<Alimentacion[]> {
    const data = await prisma.alimentacion.findMany({ include: { corral: true, Suministro: true } })
    return data.map(this.toDomain)
  }

  public async create(alimentacion: Alimentacion): Promise<Alimentacion> {
  const corrales = alimentacion.getCorral()
  const suministros = alimentacion.getSuministro()

    const nuevo = await prisma.alimentacion.create({
      data: {
        nombre: alimentacion.getNombre(),
        descripcion: alimentacion.getDescripcion(),
  corral: corrales && Array.isArray(corrales) && corrales.length > 0 ? { connect: corrales.map(c => ({ id: c.id })) } : undefined,
  Suministro: suministros ? { create: suministros.map(s => ({ cantidad: s.cantidad, id_alimento: s.idAlimento })) } : undefined
      },
      include: { corral: true, Suministro: true }
    })
    return this.toDomain(nuevo)
  }

  public async update(alimentacion: Alimentacion): Promise<void> {
    try {
      await prisma.alimentacion.update({
        where: { id: alimentacion.getId() },
        data: {
          descripcion: alimentacion.getDescripcion(),
          nombre: alimentacion.getNombre()
          // actualizaciones de relaciones (corral/suministros) se manejan desde servicios/repositorios específicos
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Alimentacion no encontrada")
      }
      throw error
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await prisma.alimentacion.delete({ where: { id } })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Alimentacion no encontrada")
      }
      throw error
    }
  }

  public async exists(id: number): Promise<boolean> {
    const count = await prisma.alimentacion.count({ where: { id } })
    return count > 0
  }
}
