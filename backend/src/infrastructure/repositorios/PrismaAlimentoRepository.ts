import { PrismaClient, $Enums } from "@prisma/client";
import { Alimento } from "../../domain/entities/Alimento";
import { IAlimentoRepository, AlimentoFilter } from "domain/interfaces/IAlimentoRepository";

export class PrismaAlimentoRepository implements IAlimentoRepository {
  private toDomain(data: any): Alimento {
    if (!data) throw new Error("Invalid database object")

    const id = typeof data.id === "number" ? data.id : (typeof data.ID === "number" ? data.ID : undefined)
    if (id === undefined) throw new Error("Missing id in alimento DB object")

    const nroSerieRaw = data.nro_serie ?? data.nroSerie ?? data.nro ?? undefined
    if (nroSerieRaw === undefined || nroSerieRaw === null) throw new Error("Missing nroSerie in alimento DB object")
    const nroSerie = Number(nroSerieRaw)

    if (data.vencimiento == null) throw new Error("Missing vencimiento in alimento DB object")
    const vencimiento = new Date(data.vencimiento)

    // mapear detallealimento: Prisma define `detallealimento` como array. Tomamos el primero si existe.
    let detalle: DetalleAlimento | undefined = undefined
    if (Array.isArray(data.detallealimento) && data.detallealimento.length > 0) {
      const d = data.detallealimento[0]
      detalle = new DetalleAlimento(d.id, d.nombre, d.tipo, d.id_alimento)
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
    async findFiltered(filter: AlimentoFilter): Promise<Alimento[]> {
        const { tipo, nombre } = filter;
        const alimentos = await this.prisma.alimento.findMany({
            where: {
                ...(tipo ? { tipo } : {}),
                ...(nombre ? { nombre: { contains: nombre } } : {}),
            },
        });
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