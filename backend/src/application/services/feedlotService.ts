import { Feedlot } from "../../domain/entities/Feedlot";
import { IFeedlotRepository } from "../../domain/interfaces/IFeedlotRepository";
import { ILocalidadRepository } from "../../domain/interfaces/ILocalidadRepository";

export class FeedlotService {
  constructor(
    private readonly feedlotRepo: IFeedlotRepository,
    private readonly localidadRepo: ILocalidadRepository
  ) {}

  public async registrar(
    nombre: string,
    idLocalidad: number
  ): Promise<Feedlot> {
    const localidad = await this.localidadRepo.findById(idLocalidad);
    if (!localidad) {
      throw new Error("Localidad no encontrada");
    }

    const feedlot = new Feedlot(0, nombre, localidad); // ✅ id omitido
    return await this.feedlotRepo.create(feedlot);
  }

  public async actualizar(
    id: number,
    nombre: string,
    idLocalidad: number
  ): Promise<void> {
    const localidad = await this.localidadRepo.findById(idLocalidad);
    if (!localidad) {
      throw new Error("Localidad no encontrada");
    }

    const feedlot = new Feedlot(id, nombre, localidad);
    await this.feedlotRepo.update(feedlot);
  }

  public async eliminar(id: number): Promise<void> {
    await this.feedlotRepo.delete(id);
  }

  public async obtenerPorId(id: number): Promise<Feedlot | null> {
    return await this.feedlotRepo.findById(id);
  }

  public async listar(): Promise<Feedlot[]> {
    return await this.feedlotRepo.findAll();
  }

  public async existe(id: number): Promise<boolean> {
    return await this.feedlotRepo.exists(id);
  }
}