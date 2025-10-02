import { Bovino} from 'domain/entities/Bovino';
import { EstadoBovino, EstadoSalud, Sexo, TipoBovino } from 'domain/enums/BovinoEnum';
import { Bovino as PrismaBovino } from '@prisma/client';
import { IBovinoRepository } from 'domain/interfaces/IBovinoRepository'; // lo creamos abajo
import prisma from './client';


/* --------- Helper interno: Prisma ➜ Entidad --------- */
const toDomain = (p: PrismaBovino): Bovino =>
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

import { $Enums } from '@prisma/client';
// ...existing code...

const toPersistence = (b: Bovino): Omit<PrismaBovino, 'id'> => ({
  id_raza: b.id_raza,
  id_corral: b.id_corral,
  caravana: b.caravana,
  estado_bovino: b.estado_bovino as unknown as $Enums.EstadoBovino,
  estado_salud: b.estado_salud as unknown as $Enums.EstadoSalud,
  ingreso: b.ingreso,
  egreso: b.egreso,
  peso_ingreso: b.peso_ingreso,
  peso_egreso: b.peso_egreso,
  sexo: b.sexo as unknown as $Enums.Sexo,
  tipo_bovino: b.tipo_bovino as unknown as $Enums.TipoBovino,
});

/* --------- Implementación del repositorio --------- */
export class PrismaBovinoRepository implements IBovinoRepository {
  async findById(id: number): Promise<Bovino | null> {
    const b = await prisma.bovino.findUnique({ where: { id } });
    return b ? toDomain(b) : null;
  }

  async update(bovino: Bovino): Promise<Bovino> {
    // El ID siempre existe porque la entidad viene de BD
    const updated = await prisma.bovino.update({
      where: { id: bovino.id! },
      data: toPersistence(bovino),
    });
    return toDomain(updated);
  }

  async softDelete(id: number): Promise<void> {
    await prisma.bovino.update({
      where: { id },
      data: {
        egreso: new Date(),
        estado_bovino: 'EGRESADA',
      },
    });
  }
}