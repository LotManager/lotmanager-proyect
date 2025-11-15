import { IPesajeRepository } from "../../domain/interfaces/IPesajeRepository"
import { Pesaje } from "../../domain/entities/Pesaje"

export class PesajeService {
  constructor(private readonly repo: IPesajeRepository) {}

  async registrar(data: Omit<Pesaje, "id">): Promise<Pesaje> {
    return this.repo.create(data)
  }

  async historial(id_bovino: number): Promise<Pesaje[]> {
    return this.repo.findByBovino(id_bovino)
  }
}