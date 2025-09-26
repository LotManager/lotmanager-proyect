import prisma from "../../infrastructure/repositorios/client";
import { Provincia } from "../../domain/entities/Provincia";
import { IProvinciaRepository } from "../../domain/interfaces/IProvinciaRepository";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


export class PrismaProvinciaRepository implements IProvinciaRepository {
  private toDomain(data: { id: number; nombre: string }): Provincia {
    return new Provincia(data.id, data.nombre);
  }

  public async findById(id: number): Promise<Provincia | null> {
    const data = await prisma.provincia.findUnique({ where: { id } });
    return data ? this.toDomain(data) : null;
  }

  public async findAll(): Promise<Provincia[]> {
    const data = await prisma.provincia.findMany();
    return data.map(this.toDomain);
  }

  public async create(provincia: Provincia): Promise<Provincia> {
    if (!provincia.isValid()) {
      throw new Error("Provincia inválida");
    }
    const nueva = await prisma.provincia.create({
      data: {
        id: provincia.getId(),
        nombre: provincia.getNombre(),
      },
    });
    return this.toDomain(nueva);
  }

  public async update(provincia: Provincia): Promise<void> {
    try {
      await prisma.provincia.update({
        where: { id: provincia.getId() },
        data: { nombre: provincia.getNombre() },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Provincia no encontrada");
      }
      throw error;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await prisma.provincia.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Provincia no encontrada");
      }
      throw error;
    }
  }

  public async exists(id: number): Promise<boolean> {
    const count = await prisma.provincia.count({ where: { id } });
    return count > 0;
  }
}