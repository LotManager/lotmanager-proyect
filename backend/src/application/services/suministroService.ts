import { Suministro } from "../../domain/entities/Suministro";
import { ISuministroRepository } from "domain/interfaces/ISuministroRepository";
import type { CreateSuministroDto, UpdateSuministroDto } from "../dtos/suministro.dto";

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
    async update(params: { id: number; data: UpdateSuministroDto }): Promise<Suministro | null> {
        const { id, data } = params;
        if (id <= 0) throw new Error("ID inválido");
        const exists = await this.suministroRepository.exists(id);
        if (!exists) return null;
        if (data.fecha == null) throw new Error("Fecha es obligatoria para actualizar el suministro");
        if (data.cantidadKg == null) throw new Error("cantidadKg es obligatorio para actualizar el suministro");
        if (data.dietaId == null) throw new Error("dietaId es obligatorio para actualizar el suministro");
        if (data.corralId == null) throw new Error("corralId es obligatorio para actualizar el suministro");
        const suministro = new Suministro(
            id,
            new Date(data.fecha),
            data.cantidadKg,
            data.dietaId,
            data.corralId
        );
        const updated = await this.suministroRepository.update(suministro);
        return updated;
    }
    async exists(id: number): Promise<boolean> {
        return this.suministroRepository.exists(id);
    }
}