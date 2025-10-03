import { Raza } from 'domain/entities/Raza';
import { IRazaRepository } from 'domain/interfaces/IRazaRepository';
import prisma from './client';

export class PrismaRazaRepository implements IRazaRepository {
  private toDomain(p: any): Raza {
    return new Raza(p.id, p.nombre);
  }

  async findAll(): Promise<Raza[]> {
    const razas = await prisma.raza.findMany();
    return razas.map(this.toDomain.bind(this));
  }

  async findById(id: number): Promise<Raza | null> {
    const r = await prisma.raza.findUnique({ where: { id } });
    return r ? this.toDomain(r) : null;
  }

  async save(r: Raza): Promise<Raza> {
    const created = await prisma.raza.create({ data: { nombre: r.nombre } });
    return this.toDomain(created);
  }

  async update(r: Raza): Promise<Raza> {
    const updated = await prisma.raza.update({
      where: { id: r.id! },
      data: { nombre: r.nombre },
    });
    return this.toDomain(updated);
  }

  async remove(id: number): Promise<void> {
    await prisma.raza.delete({ where: { id } });
  }
}