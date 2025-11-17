import { IAlimentoRepository } from "domain/interfaces/IAlimentoRepository";
import { Alimento } from "domain/entities/Alimento";
import { CreateAlimentoSchema } from "application/dtos/alimento.dto";

export class AlimentoService {
    constructor(private alimentoRepository: IAlimentoRepository) {}

    async createAlimento(dto: CreateAlimentoSchema): Promise<Alimento> {
        const alimento = new Alimento(0, dto.nombre, dto.tipo, []);
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