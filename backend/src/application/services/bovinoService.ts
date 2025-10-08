import { IBovinoRepository } from "../../domain/interfaces/IBovinoRepository"
import { Bovino } from "../../domain/entities/Bovino"

export class BovinoService {
  constructor(private readonly repo: IBovinoRepository) {}

  async crear(data: Omit<Bovino, "id">): Promise<Bovino> {
    return this.repo.create(data)
  }

  async listar(): Promise<Bovino[]> {
    return this.repo.findAll()
  }

  async obtener(id: number): Promise<Bovino | null> {
    return this.repo.findById(id)
  }

  async actualizar(bovino: Bovino): Promise<Bovino> {
    return this.repo.update(bovino)
  }

  async eliminar(id: number): Promise<void> {
    return this.repo.delete(id)
  }
}