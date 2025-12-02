import { IRazaRepository } from "../../domain/interfaces/IRazaRepository";
import { CreateRazaDtoType, UpdateRazaDtoType } from "../dtos/raza.dto";
import { Raza } from "../../domain/entities/Raza";

export class RazaService {
  constructor(private readonly repo: IRazaRepository) {}

  async crear(dto: CreateRazaDtoType): Promise<Raza> {
    return this.repo.create(dto);
  }

  async listar(): Promise<Raza[]> {
    return this.repo.findAll();
  }

  async obtener(id: number): Promise<Raza | null> {
    return this.repo.findById(id);
  }

  async actualizar(id: number, dto: UpdateRazaDtoType): Promise<Raza> {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Raza con ID ${id} no encontrada.`);
    return this.repo.update(id, dto);
  }

  async eliminar(id: number): Promise<void> {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Raza con ID ${id} no encontrada.`);
    return this.repo.delete(id);
  }
}