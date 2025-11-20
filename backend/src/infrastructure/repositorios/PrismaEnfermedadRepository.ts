import { Prisma, PrismaClient} from "@prisma/client";
import { Enfermedad } from "../../domain/entities/Enfermedad";
import { IEnfermedadRepository } from "../../domain/interfaces/IEnfermedadRepository";
import { TipoEnfermedad as DomainTipoEnfermedad} from "../../domain/enums/TipoEnfermedad";
import { mapTipoFromPrisma, mapToPrismaTipo } from "../../application/mappers/EnfermedadMapper";

const prisma = new PrismaClient();

export class PrismaEnfermedadRepository implements IEnfermedadRepository {
  async findById(id: number): Promise<Enfermedad | null> {
    const data = await prisma.enfermedad.findUnique({
      where: { id }
    });
    if (!data) return null;
    const tipoEnum = DomainTipoEnfermedad[data.tipo as keyof typeof DomainTipoEnfermedad];
    return new Enfermedad(data.id, data.nombre, data.descripcion ?? '', tipoEnum);
  }

  async findAll(): Promise<Enfermedad[]> {
    const lista = await prisma.enfermedad.findMany({

    });
    return lista.map(e => new Enfermedad(e.id, e.nombre, e.descripcion ?? '', mapTipoFromPrisma(e.tipo)));
  }

  async create(enfermedad:{nombre: string; descripcion: string; tipo: DomainTipoEnfermedad;}): Promise<Enfermedad> {
      const data = await prisma.enfermedad.create({
        data: {
          nombre: enfermedad.nombre,
          descripcion: enfermedad.descripcion,
          tipo: mapToPrismaTipo(enfermedad.tipo),
        },
      });

      return new Enfermedad(
        data.id,
        data.nombre,
        data.descripcion ?? '',
        data.tipo as DomainTipoEnfermedad
      );
    }
  async update(id: number, enfermedad: { nombre?: string; descripcion?: string; tipo?: DomainTipoEnfermedad }): Promise<void> {
    const data = {
  ...(enfermedad.nombre !== undefined && { nombre: enfermedad.nombre }),
  ...(enfermedad.descripcion !== undefined && { descripcion: enfermedad.descripcion }),
  ...(enfermedad.tipo !== undefined && { tipo: { set: enfermedad.tipo } }),
} as Prisma.EnfermedadUpdateInput;
    await prisma.enfermedad.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.enfermedad.delete({ where: { id } });
  }

  async exists(id: number): Promise<boolean> {
    const count = await prisma.enfermedad.count({ where: { id } });
    return count > 0;
  }
}