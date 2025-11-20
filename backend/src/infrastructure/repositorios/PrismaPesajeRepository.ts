import prisma from "../../config/db";
import { Pesaje } from "../../domain/entities/Pesaje";
import { IPesajeRepository } from "../../domain/interfaces/IPesajeRepository";
import { Pesaje as PrismaPesajeModel } from "@prisma/client";

export class PrismaPesajeRepository implements IPesajeRepository {
  
  private toDomain(data: PrismaPesajeModel): Pesaje {
    return new Pesaje(
      data.id,
      data.bovinoId,
      data.fecha,
      data.pesoActual
    );
  }

  async create(data: Omit<Pesaje, "id">): Promise<Pesaje> {
    const nuevo = await prisma.pesaje.create({
      data: {
        bovinoId: data.bovinoId,
        pesoActual: data.pesoActual,
        fecha: data.fecha,
      },
    });
    return this.toDomain(nuevo);
  }

  async findByBovino(bovinoId: number): Promise<Pesaje[]> {
    const data = await prisma.pesaje.findMany({
      where: { bovinoId },
      orderBy: { fecha: "desc" },
    });
    return data.map(this.toDomain);
  }
}