import prisma from "../../config/db";
import { Alimento } from "../../domain/entities/Alimento";
import { IAlimentoRepository } from "../../domain/interfaces/IAlimentoRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Alimento as PrismaAlimentoModel } from "@prisma/client";

export class PrismaAlimentoRepository implements IAlimentoRepository {
  
  private toDomain(data: PrismaAlimentoModel): Alimento {
    return new Alimento(data.id, data.nombre, data.tipo);
  }

  async create(data: Omit<Alimento, "id">): Promise<Alimento> {
    const nuevo = await prisma.alimento.create({ data });
    return this.toDomain(nuevo);
  }

  async findAll(): Promise<Alimento[]> {
    const data = await prisma.alimento.findMany();
    return data.map(this.toDomain);
  }

  async findById(id: number): Promise<Alimento | null> {
    const data = await prisma.alimento.findUnique({ where: { id } });
    return data ? this.toDomain(data) : null;
  }

  async update(id: number, data: Partial<Omit<Alimento, "id">>): Promise<Alimento> {
    try {
      const actualizado = await prisma.alimento.update({ where: { id }, data });
      return this.toDomain(actualizado);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Alimento no encontrado");
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.alimento.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Alimento no encontrado");
      }
      throw error;
    }
  }
}