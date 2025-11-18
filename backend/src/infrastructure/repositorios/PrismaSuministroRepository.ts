import { Suministro } from "domain/entities/Suministro";
import { ISuministroRepository } from "domain/interfaces/ISuministroRepository";
import { PrismaClient } from "@prisma/client";

export class PrismaSuministroRepository implements ISuministroRepository {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async create(suministro: Suministro): Promise<Suministro> {
        const created = await this.prisma.suministro.create({
            data: {
                fecha: suministro.getFecha(),
                cantidadKg: suministro.getCantidadKg(),
                dietaId: suministro.getDietaId(),
                corralId: suministro.getCorralId(),
            },
        });
        return new Suministro(
            created.id,
            created.fecha,
            created.cantidadKg,
            created.dietaId,
            created.corralId
        );
    }
    async findById(id: number): Promise<Suministro | null> {
        const found = await this.prisma.suministro.findUnique({
            where: { id },
        });
        if (!found) return null;
        return new Suministro(
            found.id,
            found.fecha,
            found.cantidadKg,
            found.dietaId,
            found.corralId
        );
    }
    async findAll(): Promise<Suministro[]> {
        const suministros = await this.prisma.suministro.findMany();
        return suministros.map(suministro => new Suministro(
            suministro.id,
            suministro.fecha,
            suministro.cantidadKg,
            suministro.dietaId,
            suministro.corralId
        ));
    }
    async update(suministro: Suministro): Promise<Suministro> {
        const updated = await this.prisma.suministro.update({
            where: { id: suministro.getId() },
            data: {
                fecha: suministro.getFecha(),
                cantidadKg: suministro.getCantidadKg(),
                dietaId: suministro.getDietaId(),
                corralId: suministro.getCorralId(),
            },
        });
        return new Suministro(
            updated.id,
            updated.fecha,
            updated.cantidadKg,
            updated.dietaId,
            updated.corralId
        );
    }
    async delete(id: number): Promise<void> {
        await this.prisma.suministro.delete({
            where: { id },
        });
    }
    async exists(id: number): Promise<boolean> {
        const count = await this.prisma.suministro.count({
            where: { id },
        });
        return count > 0;
    }
}