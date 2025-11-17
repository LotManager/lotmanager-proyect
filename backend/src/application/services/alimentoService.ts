import { IAlimentoRepository } from "domain/interfaces/IAlimentoRepository";
import { Alimento } from "domain/entities/Alimento";
import { CreateAlimentoDto } from "application/dtos/alimento.dto";
import { $Enums } from "@prisma/client";

export class AlimentoService {
    constructor(private alimentoRepository: IAlimentoRepository) {}

    async createAlimento(dto: CreateAlimentoDto): Promise<Alimento> {
        const alimento = new Alimento(0, dto.nombre, dto.tipo as $Enums.TipoAlimento);
        return this.alimentoRepository.create(alimento);
    }
    async getAlimentoById(id: number): Promise<Alimento | null> {
        return this.alimentoRepository.findById(id);
    }
    async getAllAlimentos(): Promise<Alimento[]> {
        return this.alimentoRepository.findAll();
    }
    async updateAlimento(alimento: Alimento): Promise<void> {
        return this.alimentoRepository.update(alimento);
    }
    async deleteAlimento(id: number): Promise<void> {
        return this.alimentoRepository.delete(id);
    }
    async alimentoExists(id: number): Promise<boolean> {
        return this.alimentoRepository.exists(id);
    }
}