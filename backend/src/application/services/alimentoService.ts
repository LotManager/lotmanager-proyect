import { IAlimentoRepository } from "domain/interfaces/IAlimentoRepository";
import { Alimento } from "domain/entities/Alimento";
import { CreateAlimentoDto } from "application/dtos/alimento.dto";
import { UpdateAlimentoInput } from "application/dtos/alimento.dto";
import { $Enums } from "@prisma/client";
import { TipoAlimento } from "domain/enums/TipoAlimento";

export class AlimentoService {
    constructor(private alimentoRepository: IAlimentoRepository) {}

    async createAlimento(dto: CreateAlimentoDto): Promise<Alimento> {
        const alimento = new Alimento(0, dto.nombre, dto.tipo as $Enums.TipoAlimento);
        return this.alimentoRepository.create(alimento);
    }
    async getAlimentoById(id: number): Promise<Alimento | null> {
        return this.alimentoRepository.findById(id);
    }
    async getAllAlimentos(filter?: { tipo?: $Enums.TipoAlimento; nombre?: string }): Promise<Alimento[]> {
        if (filter && (filter.tipo || filter.nombre)) {
            return this.alimentoRepository.findFiltered(filter);
        }
        return this.alimentoRepository.findAll();
    }
    async updateAlimento(input: UpdateAlimentoInput): Promise<Alimento | null> {
    const { id, nombre, tipo } = input;

    const alimento = await this.alimentoRepository.findById(id);
    if (!alimento) return null;

    if (nombre !== undefined) alimento.setNombre(nombre);
    if (tipo !== undefined) alimento.setTipo(tipo as any); // tu enum acá

    await this.alimentoRepository.update(alimento);

    return alimento;
    }
    async deleteAlimento(id: number): Promise<void> {
        return this.alimentoRepository.delete(id);
    }
    async alimentoExists(id: number): Promise<boolean> {
        return this.alimentoRepository.exists(id);
    }
    getTipos(): string[] {
        return [TipoAlimento.GRANO, TipoAlimento.FORRAJE, TipoAlimento.SUPLEMENTO];
    }
}