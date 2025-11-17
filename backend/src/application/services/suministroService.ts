 import { Suministro } from "domain/entities/Suministro";
import { ISuministroRepository } from "domain/interfaces/ISuministroRepository";
import type { CreateSuministroDto } from "../dtos/suministro.dto";

export class SuministroService {
    constructor(private readonly suministroRepository: ISuministroRepository) {}
    async createSuministro(dto: CreateSuministroDto): Promise<Suministro> {
        const suministro = new Suministro(
            0, // id: placeholder, la DB lo asignará
            new Date(dto.fecha),
            dto.cantidadKg,
            dto.dietaId,
            dto.corralId
        );
        return this.suministroRepository.create(suministro);
    }
    async findById(id: number): Promise<Suministro | null> {
        if (id <= 0) throw new Error("ID inválido");
        return this.suministroRepository.findById(id);
    }
    async findAll(): Promise<Suministro[]> {
        return this.suministroRepository.findAll();
    }
    async delete(id: number): Promise<void> {
        await this.suministroRepository.delete(id);
    }
    async update(suministro: Suministro): Promise<void> {
        return this.suministroRepository.update(suministro);
    }
    async exists(id: number): Promise<boolean> {
        return this.suministroRepository.exists(id);
    }
}