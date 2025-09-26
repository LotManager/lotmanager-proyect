import prisma from "../../infrastructure/repositorios/client.js";
import { Feedlot } from "../../domain/entities/Feedlot.js";
import { IFeedlotRepository } from "../../domain/interfaces/IFeedlotRepository.js";
import { Localidad } from "../../domain/entities/Localidad.js";
import { Provincia } from "../../domain/entities/Provincia.js";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';



export class PrismaFeedlotRepository implements IFeedlotRepository {
  private toDomain(data: {
    id: number;
    nombre: string;
    localidad: {
      id: number;
      nombre: string;
      codigo_postal: number;
      provincia: {
        id: number;
        nombre: string;
      };
    };
  }): Feedlot {
    const provincia = new Provincia(data.localidad.provincia.id, data.localidad.provincia.nombre);
    const localidad = new Localidad(
      data.localidad.id,
      data.localidad.codigo_postal,
      data.localidad.nombre,
      provincia
    );
    return new Feedlot(data.id, data.nombre, localidad);
  }

  public async findById(id: number): Promise<Feedlot | null> {
    const data = await prisma.feedlot.findUnique({
      where: { id },
      include: {
        localidad: {
          include: { provincia: true },
        },
      },
    });
    return data ? this.toDomain(data) : null;
  }

  public async findAll(): Promise<Feedlot[]> {
    const data = await prisma.feedlot.findMany({
      include: {
        localidad: {
          include: { provincia: true },
        },
      },
    });
    return data.map(this.toDomain);
  }

  public async create(feedlot: Feedlot): Promise<Feedlot> {
    if (!feedlot.isValid()) {
      throw new Error("Feedlot inválido");
    }

    const nuevo = await prisma.feedlot.create({
      data: {
        id: feedlot.getId(),
        nombre: feedlot.getNombre(),
        id_localidad: feedlot.getIdLocalidad(),
      },
      include: {
        localidad: {
          include: { provincia: true },
        },
      },
    });

    return this.toDomain(nuevo);
  }

  public async update(feedlot: Feedlot): Promise<void> {
    try {
      await prisma.feedlot.update({
        where: { id: feedlot.getId() },
        data: {
          nombre: feedlot.getNombre(),
          id_localidad: feedlot.getIdLocalidad(),
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Feedlot no encontrado");
      }
      throw error;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await prisma.feedlot.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new Error("Feedlot no encontrado");
      }
      throw error;
    }
  }

  public async exists(id: number): Promise<boolean> {
    const count = await prisma.feedlot.count({ where: { id } });
    return count > 0;
  }
}