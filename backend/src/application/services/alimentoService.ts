import { IAlimentoRepository } from "../../domain/interfaces/IAlimentoRepository";
import { CreateAlimentoDtoType, UpdateAlimentoDtoType } from "../dtos/alimento.dto";
import { Alimento } from "../../domain/entities/Alimento";

export class AlimentoService {
  constructor(private readonly repo: IAlimentoRepository) {}

  async crear(dto: CreateAlimentoDtoType): Promise<Alimento> {
    return this.repo.create(dto);
  }

  async listar(): Promise<Alimento[]> {
    return this.repo.findAll();
  }

  async obtener(id: number): Promise<Alimento | null> {
    return this.repo.findById(id);
  }

  async actualizar(id: number, dto: UpdateAlimentoDtoType): Promise<Alimento> {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Alimento con ID ${id} no encontrado.`);
    return this.repo.update(id, dto);
  }

  async eliminar(id: number): Promise<void> {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Alimento con ID ${id} no encontrado.`);
    return this.repo.delete(id);
  }
}