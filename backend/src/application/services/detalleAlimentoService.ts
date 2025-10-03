import { DetalleAlimento } from "../../domain/entities/DetalleAlimento"
import { IDetalleAlimentoRepository } from "../../domain/interfaces/IDetalleAlimentoRepository"

export class DetalleAlimentoService {
  constructor(private readonly repo: IDetalleAlimentoRepository) {}

  public async registrar(
    id: number,
    nombre: string,
    tipo: string,
    idAlimento: number
  ): Promise<DetalleAlimento> {
    const detalle = new DetalleAlimento(id, nombre, tipo, idAlimento)
    return await this.repo.create(detalle)
  }

  public async actualizar(
    id: number,
    nombre: string,
    tipo: string,
    idAlimento: number
  ): Promise<void> {
    const detalle = new DetalleAlimento(id, nombre, tipo, idAlimento)
    await this.repo.update(detalle)
  }

  public async eliminar(id: number): Promise<void> {
    await this.repo.delete(id)
  }

  public async obtenerPorId(id: number): Promise<DetalleAlimento | null> {
    return await this.repo.findById(id)
  }

  public async listar(): Promise<DetalleAlimento[]> {
    return await this.repo.findAll()
  }

  public async existe(id: number): Promise<boolean> {
    return await this.repo.exists(id)
  }
}