import { Dieta } from "../../domain/entities/Dieta";
import { IDietaRepository } from "../../domain/interfaces/IDietaRepository";
import { PrismaClient } from "@prisma/client";
import { DetalleDieta } from "../../domain/entities/DetalleDieta";

export class PrismaDietaRepository implements IDietaRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    async create(dieta: Dieta): Promise<Dieta> {
        const created = await this.prisma.dieta.create({
            data: {
                nombre: dieta.getNombre(),
                descripcion: dieta.getDescripcion(),
                detallesDieta: {
                    create: dieta.getDetalles().map(detalle => ({
                        alimentoId: detalle.getAlimentoId(),
                        proporcionKg: detalle.getProporcionKg(),
                    })),
                },
            },
            include: { detallesDieta: true } // incluir relación
        });
        return new Dieta(
            created.id,
            created.nombre,
            created.descripcion ?? "",
            (created.detallesDieta ?? []).map(detalle => new DetalleDieta(
                detalle.dietaId,
                detalle.alimentoId,
                detalle.proporcionKg
            ))
        );
    }
    async findById(id: number): Promise<Dieta | null> {
        const found = await this.prisma.dieta.findUnique({
            where: { id },
            include: { detallesDieta: true } // incluir relación
        });
        if (!found) return null;
        return new Dieta(
            found.id,
            found.nombre,
            found.descripcion ?? "",
            (found.detallesDieta ?? []).map(detalle => new DetalleDieta(
                detalle.dietaId,
                detalle.alimentoId,
                detalle.proporcionKg
            ))
        );
    }
    async findAll(): Promise<Dieta[]> {
        const dietas = await this.prisma.dieta.findMany({
            include: { detallesDieta: true } // incluir relación
        });
        return dietas.map(dieta => new Dieta(
            dieta.id,
            dieta.nombre,
            dieta.descripcion ?? "",
            (dieta.detallesDieta ?? []).map(detalle => new DetalleDieta(
                detalle.dietaId,
                detalle.alimentoId,
                detalle.proporcionKg
            ))
        ));
    }
    async update(dieta: Dieta): Promise<void> {
        await this.prisma.dieta.update({
            where: { id: dieta.getId() },
            data: {
                nombre: dieta.getNombre(),
                descripcion: dieta.getDescripcion(),
                // Para detalles, se asume que se manejan por separado
            },
        });
    }
    async delete(id: number): Promise<void> {
        await this.prisma.dieta.delete({
            where: { id },
        });
    }
    async exists(id: number): Promise<boolean> {
        const count = await this.prisma.dieta.count({
            where: { id },
        });
        return count > 0;
    }

    async addDetalle(dietaId: number, detalle: DetalleDieta): Promise<Dieta> {
        await this.prisma.detalleDieta.create({
            data: {
                dietaId: dietaId,
                alimentoId: detalle.getAlimentoId(),
                proporcionKg: detalle.getProporcionKg(),
            },
        });
        return this.findById(dietaId) as Promise<Dieta>;
    }

    async removeDetalle(dietaId: number, alimentoId: number): Promise<void> {
        await this.prisma.detalleDieta.delete({
            where: {
                dietaId_alimentoId: {
                    dietaId: dietaId,
                    alimentoId: alimentoId,
                },
            },
        });
    }

    async updateDetalle(dietaId: number, detalle: DetalleDieta): Promise<void> {
        await this.prisma.detalleDieta.update({
            where: {
                dietaId_alimentoId: {
                    dietaId: dietaId,
                    alimentoId: detalle.getAlimentoId(),
                },
            },
            data: {
                proporcionKg: detalle.getProporcionKg(),
            },
        });
    }
}