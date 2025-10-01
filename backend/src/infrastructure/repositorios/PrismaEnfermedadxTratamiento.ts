// src/infrastructure/repositorios/PrismaEnfermedadxTratamientoRepository.ts
import { PrismaClient } from "@prisma/client";
import { IEnfermedadxTratamientoRepository } from "../../domain/interfaces/IEnfermedadxTratamientoRepository";

const prisma = new PrismaClient();

export class PrismaEnfermedadxTratamientoRepository implements IEnfermedadxTratamientoRepository {
  async vincular(idEnfermedad: number, idTratamiento: number, periodo: string): Promise<void> {
    await prisma.enfermedadxTratamiento.create({
      data: {
        id_enfermedad: idEnfermedad,
        id_tratamiento: idTratamiento,
        periodo_aplicado: periodo
      }
    });
  }

  async desvincular(idEnfermedad: number, idTratamiento: number): Promise<void> {
    await prisma.enfermedadxTratamiento.delete({
      where: {
        id_tratamiento_id_enfermedad: {
          id_tratamiento: idTratamiento,
          id_enfermedad: idEnfermedad
        }
      }
    });
  }

  async existeRelacion(idEnfermedad: number, idTratamiento: number): Promise<boolean> {
    const count = await prisma.enfermedadxTratamiento.count({
      where: {
        id_enfermedad: idEnfermedad,
        id_tratamiento: idTratamiento
      }
    });
    return count > 0;
  }
}