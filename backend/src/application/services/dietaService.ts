import { IDietaRepository } from "domain/interfaces/IDietaRepository";
import { Dieta } from "domain/entities/Dieta";
import { DetalleDieta } from "domain/entities/DetalleDieta";
import type { CreateDietaDto } from "../dtos/dieta.dto";
import type { CreateDetalleDietaDto } from "../dtos/detalle-dieta.dto";

export class DietaService {
  constructor(private readonly dietaRepository: IDietaRepository) {}
  // CREA dieta + detalles de una
  async createDieta(dto: CreateDietaDto): Promise<Dieta> {
    // Mapear DTOs de detalle -> entidades DetalleDieta
    const detalles = dto.detalles.map(d =>
      new DetalleDieta(
        0,
        d.proporcionKg, // dietaId: placeholder (la DB lo completará)
        d.alimentoId
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
    async update(dieta: Dieta): Promise<void> {
      return this.dietaRepository.update(dieta);
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

    }   
    async updateDetalle(dietaId: number, dto: CreateDetalleDietaDto): Promise<void> {
    const dieta = await this.dietaRepository.findById(dietaId);
        if (!dieta) {
        throw new Error("Dieta no encontrada");
        }
    }
}