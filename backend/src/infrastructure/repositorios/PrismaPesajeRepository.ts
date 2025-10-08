import { Pesaje } from '../../domain/entities/Pesaje';
import { IPesajeRepository } from '../../domain/interfaces/IPesajeRepository';
import prisma from './client';

export class PrismaPesajeRepository implements IPesajeRepository {
  private toDomain(p: any): Pesaje {
    return new Pesaje(p.id, p.id_bovino, p.fecha, p.peso_dado);
  }

  async save(p: Pesaje): Promise<Pesaje> {
    const created = await prisma.pesaje.create({
      data: {
        id_bovino: p.id_bovino,
        fecha: p.fecha,
        peso_dado: p.peso_dado,
      },
    });
    return this.toDomain(created);
  }

  async findByBovinoId(id_bovino: number): Promise<Pesaje[]> {
    const rows = await prisma.pesaje.findMany({
      where: { id_bovino },
      orderBy: { fecha: 'asc' },
    });
    return rows.map(this.toDomain);
  }
}