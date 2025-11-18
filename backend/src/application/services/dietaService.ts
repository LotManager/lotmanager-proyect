import { IDietaRepository } from "domain/interfaces/IDietaRepository";
import { Dieta } from "domain/entities/Dieta";
import { DetalleDieta } from "domain/entities/DetalleDieta";
import { DietaMapper } from "application/mappers/dieta.mapper";
import type { CreateDietaDto, UpdateDietaDto } from "../dtos/dieta.dto";
import type { CreateDetalleDietaDto } from "../dtos/detalle-dieta.dto";

type UpdateDietaInput = {
  id: number;
  data: UpdateDietaDto;
};

export class DietaService {
  constructor(private readonly dietaRepository: IDietaRepository) {}
  // CREA dieta + detalles de una
  
  async createDieta(dto: CreateDietaDto): Promise<Dieta> {
    // Mapear DTOs de detalle -> entidades DetalleDieta
    const detalles = dto.detalles.map(d =>
      new DetalleDieta(
        0,               // dietaId placeholder, lo completa la DB
        d.alimentoId,
        d.proporcionKg
      )
    );
    // Crear entidad Dieta
    const dieta = new Dieta(
      0,                  // id: placeholder
      dto.nombre,
      dto.descripcion,
      detalles
    );
    // Guardar en repositorio (Prisma hace el nested create de detalles)
    return this.dietaRepository.create(dieta);
    }

    async findById(id: number): Promise<Dieta | null> {
      if (id <= 0) throw new Error("ID inválido");
      return this.dietaRepository.findById(id);
    }
    async findAll(): Promise<Dieta[]> {
      return this.dietaRepository.findAll();
    }
    async delete(id: number): Promise<void> {
      await this.dietaRepository.delete(id);
    }
    async updateDieta(input: UpdateDietaInput): Promise<Dieta | null> {
      const existing = await this.dietaRepository.findById(input.id);
      if (!existing) return null;

      const updated = DietaMapper.applyUpdateDto(existing, input.data);
      await this.dietaRepository.update(updated);

      return updated;
    }
    async exists(id: number): Promise<boolean> {
      return this.dietaRepository.exists(id);
    }
      // AGREGA un detalle a una dieta ya existente
    async addDetalle(dietaId: number, dto: CreateDetalleDietaDto): Promise<Dieta> {
    const dieta = await this.dietaRepository.findById(dietaId);
    if (!dieta) {
      throw new Error("Dieta no encontrada");
    }

    const nuevoDetalle = new DetalleDieta(
      dietaId,             // ahora sí conocemos la dieta
      dto.alimentoId,
      dto.proporcionKg
    );

    // Actualizar la colección en la entidad
    const detallesActuales = dieta.getDetalles();
    dieta.setDetalles([...detallesActuales, nuevoDetalle]);

    // Persistir cambios
    await this.dietaRepository.update(dieta);
    return dieta;
  }
  async removeDetalle(dietaId: number, alimentoId: number): Promise<void> {
    const dieta = await this.dietaRepository.findById(dietaId);
    if (!dieta) {
      throw new Error("Dieta no encontrada");
    }
    await this.dietaRepository.removeDetalle(dietaId, alimentoId);
  }

  async updateDetalle(
    dietaId: number,
    alimentoId: number,
    proporcionKg: number
  ): Promise<void> {
    const dieta = await this.dietaRepository.findById(dietaId);
    if (!dieta) {
      throw new Error("Dieta no encontrada");
    }
    const detalle = new DetalleDieta(dietaId, alimentoId, proporcionKg);
    await this.dietaRepository.updateDetalle(dietaId, detalle);
  }
}