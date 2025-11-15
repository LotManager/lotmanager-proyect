import { Prisma, PrismaClient } from "@prisma/client";
import { Enfermedad } from "../../domain/entities/Enfermedad";
import { IEnfermedadRepository } from "../../domain/interfaces/IEnfermedadRepository";
import { TipoEnfermedad } from "../../domain/enums/TipoEnfermedad";
import { TipoEnfermedadMapper } from "application/mappers/tipoEnfermedadMapper";

const prisma = new PrismaClient();

export class PrismaEnfermedadRepository implements IEnfermedadRepository {
  async findById(id: number): Promise<Enfermedad | null> {
    const data = await prisma.enfermedad.findUnique({
      where: { id }
    });
    if (!data) return null;
    const tipoEnum = TipoEnfermedad[data.tipo as keyof typeof TipoEnfermedad];
    return new Enfermedad(data.id, data.nombre, data.descripcion ?? '', tipoEnum);
  }

  async findAll(): Promise<Enfermedad[]> {
    const lista = await prisma.enfermedad.findMany({

    });
    return lista.map(e => {
      const tipoEnum = TipoEnfermedad[e.tipo as keyof typeof TipoEnfermedad];
      return new Enfermedad(e.id, e.nombre, e.descripcion ?? '', tipoEnum);
    });
  }

  async create(enfermedad: { nombre: string; descripcion: string; tipo: TipoEnfermedad }): Promise<Enfermedad> {
    const data = await prisma.enfermedad.create({
      data: {
        nombre: enfermedad.nombre,
        descripcion: enfermedad.descripcion,
        tipo: TipoEnfermedadMapper.toPrisma(enfermedad.tipo),

      }
    });
    const tipoEnum = TipoEnfermedad[data.tipo as keyof typeof TipoEnfermedad];
    return new Enfermedad(data.id, data.nombre, data.descripcion ?? '', tipoEnum);
  }

  async update(id: number, enfermedad: { nombre?: string; descripcion?: string; tipo?: TipoEnfermedad }): Promise<void> {
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