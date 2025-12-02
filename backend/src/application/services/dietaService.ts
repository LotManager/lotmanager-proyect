import { IDietaRepository } from "../../domain/interfaces/IDietaRepository";
import { Dieta } from "../../domain/entities/Dieta";
import { DetalleDieta } from "../../domain/entities/DetalleDieta";
import { DietaMapper } from "../../application/mappers/dieta.mapper";
import type { CreateDietaDto, UpdateDietaDto } from "../dtos/dieta.dto";
import type { CreateDetalleDietaDto } from "../dtos/detalle-dieta.dto";

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
    async updateDieta(id: number, dto: UpdateDietaDto): Promise<Dieta | null> {
      // 1) Buscar la dieta existente
      const existing = await this.dietaRepository.findById(id);
      if (!existing) return null;

      // 2) Actualizar SOLO lo que venga en el DTO
      if (dto.nombre !== undefined) {
        existing.setNombre(dto.nombre);
      }

      if (dto.descripcion !== undefined) {
        existing.setDescripcion(dto.descripcion);
      }

      // 3) Persistir cambios de dieta (nombre / descripción)
      await this.dietaRepository.update(existing);

      // 4) Si vienen detalles en el body, actualizar cada uno
      if (dto.detalles && dto.detalles.length > 0) {
        for (const det of dto.detalles) {
          if (det.alimentoId === undefined || det.proporcionKg === undefined) {
            throw new Error("Detalle inválido: 'alimentoId' y 'proporcionKg' son requeridos");
          }

          const detalle = new DetalleDieta(
            id,               // dietaId (viene de la URL)
            det.alimentoId,   // del body
            det.proporcionKg  // del body
          );

          await this.dietaRepository.updateDetalle(id, detalle);
        }
      }

      // 5) Volver a leer la dieta actualizada (si querés devolverla completa)
      const updated = await this.dietaRepository.findById(id);
      return updated ?? existing;
    }
    async exists(id: number): Promise<boolean> {
      return this.dietaRepository.exists(id);
    }
      // AGREGA un detalle a una dieta ya existente
    async addDetalle(dietaId: number, dto: CreateDetalleDietaDto): Promise<Dieta> {
      // Verificar que la dieta existe
      const dieta = await this.dietaRepository.findById(dietaId);
      if (!dieta) {
          throw new Error("Dieta no encontrada");
      }

      // Crear entidad detalle
      const detalle = new DetalleDieta(
          dietaId,
          dto.alimentoId,
          dto.proporcionKg
      );

      // Insertar detalle en DB
      return await this.dietaRepository.addDetalle(dietaId, detalle);
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
    if (!dieta) throw new Error("Dieta no encontrada");

    await this.dietaRepository.updateDetalle(
      dietaId,
      new DetalleDieta(dietaId, alimentoId, proporcionKg)
    );
    }
}