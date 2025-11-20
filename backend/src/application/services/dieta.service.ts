import { IDietaRepository } from "../../domain/interfaces/IDietaRepository";
import { CreateDietaDtoType, UpdateDietaDtoType } from "../../application/dtos/dieta.dto";
import { Dieta, DetalleDieta } from "../../domain/entities/Dieta";

export class DietaService {
  constructor(private readonly repo: IDietaRepository) {}

  async crear(dto: CreateDietaDtoType): Promise<Dieta> {
    // Convertimos el DTO a la estructura de Entidad
    // No tenemos ID todavía (0), y los detalles se mapean simple
    const detalles = dto.detalles.map(d => new DetalleDieta(0, d.alimentoId, d.proporcionKg));
    const nuevaDieta = new Dieta(0, dto.nombre, dto.descripcion || null, detalles);
    
    return this.repo.create(nuevaDieta);
  }

  async listar(): Promise<Dieta[]> {
    return this.repo.findAll();
  }

  async obtener(id: number): Promise<Dieta | null> {
    return this.repo.findById(id);
  }

  /**
   * ✅ MÉTODO QUE FALTABA
   */
  async actualizar(id: number, dto: UpdateDietaDtoType): Promise<Dieta> {
    // 1. Verificamos que la dieta exista
    const dietaExistente = await this.repo.findById(id);
    if (!dietaExistente) {
      throw new Error(`Dieta con ID ${id} no encontrada.`);
    }

    // 2. Llamamos al update del repositorio
    // Nota: Por ahora el repo solo actualiza nombre y descripción, no los ingredientes.
    return this.repo.update(id, dto);
  }

  async eliminar(id: number): Promise<void> {
     const existe = await this.repo.findById(id);
     if (!existe) throw new Error("Dieta no encontrada");
     await this.repo.delete(id);
  }
}