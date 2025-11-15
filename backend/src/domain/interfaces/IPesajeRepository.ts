import { Pesaje } from "../entities/Pesaje"

export interface IPesajeRepository {
  create(data: Omit<Pesaje, "id">): Promise<Pesaje>
  findByBovino(id_bovino: number): Promise<Pesaje[]>
}