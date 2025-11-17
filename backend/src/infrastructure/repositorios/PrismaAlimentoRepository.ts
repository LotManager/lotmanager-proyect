import { PrismaClient } from "@prisma/client";
import { Alimento } from "../../domain/entities/Alimento";
import { IAlimentoRepository } from "domain/interfaces/IAlimentoRepository";
import { $Enums } from "@prisma/client";

export class PrismaAlimentoRepository implements IAlimentoRepository {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async create(alimento: Alimento): Promise<Alimento> {
        const created = await this.prisma.alimento.create({
            data: {
                nombre: alimento.getNombre(),
                tipo: alimento.getTipo() as $Enums.TipoAlimento,
            },
        });
        return new Alimento(
            created.id,
            created.nombre,
            created.tipo as $Enums.TipoAlimento
        );
    }
    async findById(id: number): Promise<Alimento | null> {
        const found = await this.prisma.alimento.findUnique({
            where: { id },
        });
        if (!found) return null;
        return new Alimento(
            found.id,
            found.nombre,
            found.tipo as $Enums.TipoAlimento
        );
    }
    async findAll(): Promise<Alimento[]> {
        const alimentos = await this.prisma.alimento.findMany();
        return alimentos.map(
            (a) => new Alimento(a.id, a.nombre, a.tipo as $Enums.TipoAlimento)
        );
    }
    async update(alimento: Alimento): Promise<void> {
        await this.prisma.alimento.update({
            where: { id: alimento.getId() },
            data: {
                nombre: alimento.getNombre(),
                tipo: alimento.getTipo() as $Enums.TipoAlimento,
            },
        });
    }
    async delete(id: number): Promise<void> {
        await this.prisma.alimento.delete({
            where: { id },
        });
    }
    async exists(id: number): Promise<boolean> {
        const count = await this.prisma.alimento.count({
            where: { id },
        });
        return count > 0;
    }
}