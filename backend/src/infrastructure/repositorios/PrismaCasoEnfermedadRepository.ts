import { PrismaClient } from "@prisma/client";
import { ICasoEnfermedadRepository } from "../../domain/interfaces/ICasoEnfermedadRepository";
import { CasoEnfermedad } from "../../domain/entities/CasoEnfermedad";
import { CasoEnfermedadMapper } from "../../application/mappers/CasoEnfermedadMapper";

export class CasoEnfermedadPrismaRepository implements ICasoEnfermedadRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(caso: CasoEnfermedad): Promise<CasoEnfermedad> {
    const data = CasoEnfermedadMapper.toPrisma(caso);
    const created = await this.prisma.casoEnfermedad.create({
      data,
      include: { bovino: true, enfermedad: true, tratamiento: true },
    });
    return CasoEnfermedadMapper.toDomain(created);
  }

  async findById(id: number): Promise<CasoEnfermedad | null> {
    const caso = await this.prisma.casoEnfermedad.findUnique({
      where: { id },
    });
    return caso ? CasoEnfermedadMapper.toDomain(caso) : null;
  }

  async findAll(): Promise<CasoEnfermedad[]> {
    const casos = await this.prisma.casoEnfermedad.findMany();
    return casos.map(CasoEnfermedadMapper.toDomain);
  }

  async update(caso: CasoEnfermedad): Promise<void> {
    await this.prisma.casoEnfermedad.update({
      where: { id: caso.getId() },
      data: {
        fechaDeteccion: caso.getFechaDeteccion(),
        fechaAlta: caso.getFechaAlta() ?? null,
        enfermedadId: caso.getEnfermedadId(),
        tratamientoId: caso.getTratamientoId(),
        bovinoId: caso.getBovinoId(),
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.casoEnfermedad.delete({ where: { id } });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.prisma.casoEnfermedad.count({ where: { id } });
    return count > 0;
  }
}