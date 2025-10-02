import { ICorralRepository } from "../../domain/interfaces/ICorralRepository"
import { Corral } from "../../domain/entities/Corral"
import { CreateCorralDtoType } from "../corral/dto/CreateCorralDto"

export class CorralService {
  constructor(private readonly repo: ICorralRepository) {}

  async listar(): Promise<Corral[]> {
    return this.repo.findAll()
  }

  async obtenerPorId(id: number): Promise<Corral | null> {
    return this.repo.findById(id)
  }

  async registrar(dto: CreateCorralDtoType): Promise<Corral> {
    const nuevo = new Corral(
      0,
      dto.capacidadMaxima,
      dto.numero,
      dto.tipoCorral,
      dto.idAlimentacion,
      dto.idFeedlot
    )
    return this.repo.create(nuevo)
  }

  async actualizar(id: number, dto: CreateCorralDtoType): Promise<void> {
    const actualizado = new Corral(
      id,
      dto.capacidadMaxima,
      dto.numero,
      dto.tipoCorral,
      dto.idAlimentacion,
      dto.idFeedlot
    )
    await this.repo.update(actualizado)
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id)
  }
}