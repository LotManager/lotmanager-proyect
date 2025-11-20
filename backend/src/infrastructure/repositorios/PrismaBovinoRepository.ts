import prisma from "../../config/db"
import { Bovino } from "../../domain/entities/Bovino"
import { IBovinoRepository } from "../../domain/interfaces/IBovinoRepository"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

// Enums de Prisma
import {
  EstadoBovino as PrismaEstadoBovino,
  EstadoSalud as PrismaEstadoSalud,
  Sexo as PrismaSexo,
  TipoBovino as PrismaTipoBovino,
} from "@prisma/client"

// Mappers dominio <-> prisma
import { fromPrismaEstadoBovino, toPrismaEstadoBovino } from "../../application/mappers/estadoBovino.mapper"
import { fromPrismaEstadoSalud, toPrismaEstadoSalud } from "../../application/mappers/estadoSalud.mapper"
import { fromPrismaSexo, toPrismaSexo } from "../../application/mappers/sexo.mapper"
import { fromPrismaTipoBovino, toPrismaTipoBovino } from "../../application/mappers/tipoBovino.mapper"

export class PrismaBovinoRepository implements IBovinoRepository {
  private toDomain(data: {
    id: number
    id_raza: number
    id_corral: number
    caravana: number
    estado_bovino: PrismaEstadoBovino
    estado_salud: PrismaEstadoSalud
    ingreso: Date
    egreso: Date | null
    peso_ingreso: number
    peso_egreso: number | null
    sexo: PrismaSexo
    tipo_bovino: PrismaTipoBovino
  }): Bovino {
    return new Bovino(
      data.id,
      data.id_raza,
      data.id_corral,
      data.caravana,
      fromPrismaEstadoBovino(data.estado_bovino),
      fromPrismaEstadoSalud(data.estado_salud),
      data.ingreso,
      data.egreso,
      data.peso_ingreso,
      data.peso_egreso,
      fromPrismaSexo(data.sexo),
      fromPrismaTipoBovino(data.tipo_bovino)
    )
  }

  public async findById(id: number): Promise<Bovino | null> {
    const data = await prisma.bovino.findUnique({ where: { id } })
    return data ? this.toDomain(data) : null
  }

  public async findAll(): Promise<Bovino[]> {
    const data = await prisma.bovino.findMany()
    return data.map(d => this.toDomain(d))
  }

  public async create(bovino: Omit<Bovino, "id">): Promise<Bovino> {
    const nuevo = await prisma.bovino.create({
      data: {
        id_raza: bovino.id_raza,
        id_corral: bovino.id_corral,
        caravana: bovino.caravana,
        estado_bovino: toPrismaEstadoBovino(bovino.estado_bovino),
        estado_salud: toPrismaEstadoSalud(bovino.estado_salud),
        ingreso: bovino.ingreso,
        egreso: bovino.egreso,
        peso_ingreso: bovino.peso_ingreso,
        peso_egreso: bovino.peso_egreso,
        sexo: toPrismaSexo(bovino.sexo),
        tipo_bovino: toPrismaTipoBovino(bovino.tipo_bovino),
      },
    })
    return this.toDomain(nuevo)
  }

  public async update(bovino: Bovino): Promise<Bovino> {
    try {
      const actualizado = await prisma.bovino.update({
        where: { id: bovino.id! },
        data: {
          id_raza: bovino.id_raza,
          id_corral: bovino.id_corral,
          caravana: bovino.caravana,
          estado_bovino: toPrismaEstadoBovino(bovino.estado_bovino),
          estado_salud: toPrismaEstadoSalud(bovino.estado_salud),
          ingreso: bovino.ingreso,
          egreso: bovino.egreso,
          peso_ingreso: bovino.peso_ingreso,
          peso_egreso: bovino.peso_egreso,
          sexo: toPrismaSexo(bovino.sexo),
          tipo_bovino: toPrismaTipoBovino(bovino.tipo_bovino),
        },
      })
      return this.toDomain(actualizado)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Bovino no encontrado")
      }
      throw error
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await prisma.bovino.delete({ where: { id } })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Bovino no encontrado")
      }
      throw error
    }
  }

  public async exists(id: number): Promise<boolean> {
    const count = await prisma.bovino.count({ where: { id } })
    return count > 0
  }

 public async findByCorral(idCorral: number): Promise<Bovino[]> {
  const data = await prisma.bovino.findMany({
    where: { id_corral: idCorral },
    orderBy: { id: "asc" },
  })
  return data.map(d => this.toDomain(d))
}
}