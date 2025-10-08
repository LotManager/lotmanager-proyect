import { Bovino } from '../../domain/entities/Bovino';
import { IBovinoRepository } from '../../domain/interfaces/IBovinoRepository';
import { EstadoBovino, EstadoSalud, Sexo, TipoBovino } from '../../domain/entities/Bovino';
import prisma from './client';
import { $Enums } from '@prisma/client'; // Importa los enums de Prisma

const toDomain = (p: any): Bovino =>
  new Bovino(
    p.id,
    p.id_raza,
    p.id_corral,
    p.caravana,
    p.estado_bovino as EstadoBovino,
    p.estado_salud as EstadoSalud,
    p.ingreso,
    p.egreso,
    p.peso_ingreso,
    p.peso_egreso,
    p.sexo as Sexo,
    p.tipo_bovino as TipoBovino
  );

export class PrismaBovinoRepository implements IBovinoRepository {
  async findById(id: number): Promise<Bovino | null> {
    const b = await prisma.bovino.findUnique({ where: { id } });
    return b ? toDomain(b) : null;
  }

  async update(bovino: Bovino): Promise<Bovino> {
    const updated = await prisma.bovino.update({
      where: { id: bovino.id! },
      data: {
        id_raza: bovino.id_raza,
        id_corral: bovino.id_corral,
        caravana: bovino.caravana,
        estado_bovino: bovino.estado_bovino as unknown as $Enums.EstadoBovino,
        estado_salud: bovino.estado_salud as unknown as $Enums.EstadoSalud,
        ingreso: bovino.ingreso,
        egreso: bovino.egreso,
        peso_ingreso: bovino.peso_ingreso,
        peso_egreso: bovino.peso_egreso,
        sexo: bovino.sexo as unknown as $Enums.Sexo,
        tipo_bovino: bovino.tipo_bovino as unknown as $Enums.TipoBovino,
      },
    });
    return toDomain(updated);
  }

  async softDelete(id: number): Promise<void> {
    await prisma.bovino.update({
      where: { id },
      data: { egreso: new Date(), estado_bovino: 'EGRESADO' as unknown as $Enums.EstadoBovino },
    });
  }
}