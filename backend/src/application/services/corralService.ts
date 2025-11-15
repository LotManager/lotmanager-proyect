import { ICorralRepository } from "../../domain/interfaces/ICorralRepository";
import { Corral } from "../../domain/entities/Corral";
import { CreateCorralDtoType, UpdateCorralDtoType } from "../../application/dtos/corral.dto";

export class CorralService {
  constructor(private readonly repo: ICorralRepository) {}

  async listar(): Promise<Corral[]> {
    return this.repo.findAll();
  }

  async obtenerPorId(id: number): Promise<Corral | null> {
    return this.repo.findById(id);
  }

  async registrar(dto: CreateCorralDtoType): Promise<Corral> {
    return this.repo.create(dto);
  }

  async actualizar(id: number, dto: UpdateCorralDtoType): Promise<Corral> {
    const corralExistente = await this.repo.findById(id);
    if (!corralExistente) {
      throw new Error(`Corral con ID ${id} no encontrado.`);
    }

    return this.repo.update(id, dto);
  }

  async eliminar(id: number): Promise<void> {
    // 1. Lógica de negocio: Verificamos que el corral exista.
    const corralExistente = await this.repo.findById(id);
    if (!corralExistente) {
      throw new Error(`Corral con ID ${id} no encontrado.`);
    }
    // 2. Si existe, lo eliminamos.
    await this.repo.delete(id);
  }
}