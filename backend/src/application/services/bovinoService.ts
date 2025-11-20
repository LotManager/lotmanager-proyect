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

  /**
   * Orquesta la actualización de un bovino.
   */
  async actualizar(id: number, dto: UpdateBovinoDtoType): Promise<Bovino> {
    // Lógica de negocio: nos aseguramos de que el bovino exista antes de actualizarlo.
    const bovinoExistente = await this.repo.findById(id);
    if (!bovinoExistente) {
      throw new Error(`Bovino con ID ${id} no encontrado.`);
    }

    // Convertimos las fechas si vienen en el DTO
    const dataForRepo: any = { ...dto };
    if (dto.ingreso) { dataForRepo.ingreso = new Date(dto.ingreso); }
    if (dto.egreso) { dataForRepo.egreso = new Date(dto.egreso); }

    return this.repo.update(id, dataForRepo);
  }

  /**
   * Orquesta la eliminación de un bovino.
   */
  async eliminar(id: number): Promise<void> {
    // Lógica de negocio: nos aseguramos de que el bovino exista antes de borrarlo.
    const bovinoExistente = await this.repo.findById(id);
    if (!bovinoExistente) {
      throw new Error(`Bovino con ID ${id} no encontrado.`);
    }
    await this.repo.delete(id);
  }
}