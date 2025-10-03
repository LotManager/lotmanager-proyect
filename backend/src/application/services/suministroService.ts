import { Suministro } from "../../domain/entities/Suministro"
import { ISuministroRepository } from "../../domain/interfaces/ISuministroRepository"

export class SuministroService {
  constructor(private readonly repo: ISuministroRepository) {}

  public async registrar(
    id: number,
    cantidad: number,
    idAlimentacion: number,
    idAlimento: number
  ): Promise<Suministro> {
    const suministro = new Suministro(id, cantidad, idAlimentacion, idAlimento)
    return await this.repo.create(suministro)
  }

  public async actualizar(
    id: number,
    cantidad: number,
    idAlimentacion: number,
    idAlimento: number
  ): Promise<void> {
    const suministro = new Suministro(id, cantidad, idAlimentacion, idAlimento)
    await this.repo.update(suministro)
  }

  public async eliminar(id: number): Promise<void> {
    await this.repo.delete(id)
  }

  public async obtenerPorId(id: number): Promise<Suministro | null> {
    return await this.repo.findById(id)
  }

  public async listar(): Promise<Suministro[]> {
    return await this.repo.findAll()
  }

  public async existe(id: number): Promise<boolean> {
    return await this.repo.exists(id)
  }
}