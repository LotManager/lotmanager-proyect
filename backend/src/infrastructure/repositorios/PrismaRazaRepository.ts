import prisma from "../../config/db";
import { Raza } from "../../domain/entities/Raza";
import { IRazaRepository } from "../../domain/interfaces/IRazaRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Raza as PrismaRazaModel } from "@prisma/client";

export class PrismaRazaRepository implements IRazaRepository {
  
  private toDomain(data: PrismaRazaModel): Raza {
    return new Raza(data.id, data.nombre);
  }

  async create(data: Omit<Raza, "id">): Promise<Raza> {
    const nuevo = await prisma.raza.create({ data });
    return this.toDomain(nuevo);
  }

  async findAll(): Promise<Raza[]> {
    const data = await prisma.raza.findMany();
    return data.map(this.toDomain);
  }

  async findById(id: number): Promise<Raza | null> {
    const data = await prisma.raza.findUnique({ where: { id } });
    return data ? this.toDomain(data) : null;
  }

  async update(id: number, data: Partial<Omit<Raza, "id">>): Promise<Raza> {
    try {
      const actualizado = await prisma.raza.update({ where: { id }, data });
      return this.toDomain(actualizado);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Raza no encontrada");
      }
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.raza.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Raza no encontrada");
      }
      throw error;
    }
  }
}