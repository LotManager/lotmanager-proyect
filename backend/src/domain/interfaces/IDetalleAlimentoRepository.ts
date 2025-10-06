import { DetalleAlimento } from "../entities/DetalleAlimento"

export interface IDetalleAlimentoRepository {
  findById(id: number): Promise<DetalleAlimento | null>
  findAll(): Promise<DetalleAlimento[]>
  create(detalle: DetalleAlimento): Promise<DetalleAlimento>
  update(detalle: DetalleAlimento): Promise<void>
  delete(id: number): Promise<void>
  exists(id: number): Promise<boolean>
}