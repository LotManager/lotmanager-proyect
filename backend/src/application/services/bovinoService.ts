import { IBovinoRepository } from "../../domain/interfaces/IBovinoRepository";
import { Bovino } from "../../domain/entities/Bovino";
import { CreateBovinoDtoType, UpdateBovinoDtoType } from "../dtos/bovino.dto";

export class BovinoService {
  constructor(private readonly repo: IBovinoRepository) {}

  /**
   * Orquesta la creación de un nuevo bovino.
   * Su principal responsabilidad aquí es convertir las fechas del DTO.
   */
  async crear(dto: CreateBovinoDtoType): Promise<Bovino> {
    // Convertimos las fechas de string (del DTO) a objetos Date (para la entidad/repo)
    const dataParaCrear: any = { ...dto };
    dataParaCrear.ingreso = new Date(dto.ingreso);
    if (dto.egreso) {
      dataParaCrear.egreso = new Date(dto.egreso);
    }
    return this.repo.create(dataParaCrear);
  }

  /**
   * Devuelve la lista completa de bovinos.
   */
  async listar(): Promise<Bovino[]> {
    return this.repo.findAll();
  }

  /**
   * Obtiene un único bovino por su ID.
   */
  async obtener(id: number): Promise<Bovino | null> {
    return this.repo.findById(id);
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