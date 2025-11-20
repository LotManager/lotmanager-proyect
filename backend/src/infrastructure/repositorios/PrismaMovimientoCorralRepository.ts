import prisma from "../../config/db";
import { MovimientoCorral } from "../../domain/entities/MovimientoCorral";
import { IMovimientoCorralRepository } from "../../domain/interfaces/IMovimientoCorralRepository";
import { MovimientoCorral as PrismaMovimientoModel } from "@prisma/client";

export class PrismaMovimientoCorralRepository implements IMovimientoCorralRepository {
  
  private toDomain(data: PrismaMovimientoModel): MovimientoCorral {
    return new MovimientoCorral(
      data.id,
      data.bovinoId,
      data.corralOrigenId,
      data.corralDestinoId,
      data.fecha,
      data.motivo
    );
  }

  async create(data: Omit<MovimientoCorral, "id">): Promise<MovimientoCorral> {
    const nuevo = await prisma.movimientoCorral.create({
      data: {
        bovinoId: data.bovinoId,
        corralOrigenId: data.corralOrigenId,
        corralDestinoId: data.corralDestinoId,
        fecha: data.fecha,
        motivo: data.motivo,
      },
    });
    return this.toDomain(nuevo);
  }

  async findByBovino(bovinoId: number): Promise<MovimientoCorral[]> {
    const data = await prisma.movimientoCorral.findMany({
      where: { bovinoId },
      orderBy: { fecha: "desc" }, // Los más recientes primero
    });
    return data.map((d) => this.toDomain(d));
  }
}