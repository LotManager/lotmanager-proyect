import prisma from "./client";
import { Localidad } from "../../domain/entities/Localidad";
import { ILocalidadRepository } from "../../domain/interfaces/ILocalidadRepository";
import { Provincia } from "../../domain/entities/Provincia";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class PrismaLocalidadRepository implements ILocalidadRepository {
  private toDomain(data: {
    id: number;
    codigoPostal: number | null;
    nombre: string;
    provinciaId: number;
  }): Localidad {
    const provincia = new Provincia(data.provinciaId, ""); // Assuming you might want to fetch the province name elsewhere
    return new Localidad(data.id, data.codigoPostal, data.nombre, provincia);
  }

  public async findById(id: number): Promise<Localidad | null> {
    const data = await prisma.localidad.findUnique({
      where: { id },
      include: { provincia: true },
    });
    return data ? this.toDomain(data) : null;
  }

  public async findAll(): Promise<Localidad[]> {
    const data = await prisma.localidad.findMany({
      include: { provincia: true },
    });
    return data.map(this.toDomain);
  }

  public async create(localidad: Localidad): Promise<Localidad> {
    if (!localidad.isValid()) {
      throw new Error("Localidad inválida");
    }

    const nueva = await prisma.localidad.create({
    data: {
      id: localidad.getId(),
      nombre: localidad.getNombre(),
      codigoPostal: localidad.getCodigoPostal(),
      provinciaId: localidad.getIdProvincia(), // ✅ clave foránea directa
    },
    include: { provincia: true },
    });
    return this.toDomain(nueva);
  }

  public async update(localidad: Localidad): Promise<void> {
    try {
      await prisma.localidad.update({
        where: { id: localidad.getId() },
        data: {
          nombre: localidad.getNombre(),
          codigoPostal: localidad.getCodigoPostal(),
          provincia: {
            connect: { id: localidad.getIdProvincia() }
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Localidad no encontrada");
      }
      throw error;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await prisma.localidad.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Localidad no encontrada");
      }
      throw error;
    }
  }

  public async exists(id: number): Promise<boolean> {
    const count = await prisma.localidad.count({ where: { id } });
    return count > 0;
  }
}