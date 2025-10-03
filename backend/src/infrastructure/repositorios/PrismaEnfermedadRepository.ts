import { PrismaClient } from "@prisma/client";
import { Enfermedad } from "../../domain/entities/Enfermedad";
import { IEnfermedadRepository } from "../../domain/interfaces/IEnfermedadRepository";
import { TipoEnfermedad } from "../../domain/enums/TipoEnfermedad";

const prisma = new PrismaClient();

export class PrismaEnfermedadRepository implements IEnfermedadRepository {
  async findById(id: number): Promise<Enfermedad | null> {
    const data = await prisma.enfermedad.findUnique({
      where: { id },
      include: {
        detallesenfermedad: true,
        enfermedadxtratamiento: true
      }
    });
    if (!data) return null;
    const tipoEnum = TipoEnfermedad[data.tipo as keyof typeof TipoEnfermedad];
    const tratamientos = data.enfermedadxtratamiento.map(et => ({ idTratamiento: et.id_tratamiento, periodo: et.periodo_aplicado }));
    return new Enfermedad(data.id, data.nombre, data.descripcion, tipoEnum, tratamientos);
  }

  async findAll(): Promise<Enfermedad[]> {
    const lista = await prisma.enfermedad.findMany({
      include: {
        detallesenfermedad: true,
        enfermedadxtratamiento: true
      }
    });
    return lista.map(e => {
      const tipoEnum = TipoEnfermedad[e.tipo as keyof typeof TipoEnfermedad];
      const tratamientos = e.enfermedadxtratamiento.map(et => ({ idTratamiento: et.id_tratamiento, periodo: et.periodo_aplicado }));
      return new Enfermedad(e.id, e.nombre, e.descripcion, tipoEnum, tratamientos);
    });
  }

  async create(enfermedad: Enfermedad): Promise<Enfermedad> {
    const data = await prisma.enfermedad.create({
      data: {
        id: enfermedad.getId(),
        nombre: enfermedad.getNombre(),
        descripcion: enfermedad.getDescripcion(),
        tipo: enfermedad.getTipo()
      }
    });
    const tipoEnum = TipoEnfermedad[data.tipo as keyof typeof TipoEnfermedad];
    return new Enfermedad(data.id, data.nombre, data.descripcion, tipoEnum);
  }

  async update(enfermedad: Enfermedad): Promise<void> {
    await prisma.enfermedad.update({
      where: { id: enfermedad.getId() },
      data: {
        nombre: enfermedad.getNombre(),
        descripcion: enfermedad.getDescripcion(),
        tipo: enfermedad.getTipo()
      }
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