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

  public async actualizarParcial(
    idFeedlot: number,
    nombre?: string,
    idLocalidad?: number
  ): Promise<void> {
    // 1. Obtener el feedlot actual
    const actual = await this.feedlotRepo.findById(idFeedlot);
    if (!actual) {
      throw new Error("Feedlot no encontrado");
    }

    // 2. Determinar la localidad (si se actualiza)
    let localidad = actual.getLocalidad();
    if (idLocalidad !== undefined) {
      const nuevaLocalidad = await this.localidadRepo.findById(idLocalidad);
      if (!nuevaLocalidad) {
        throw new Error("Localidad no encontrada");
      }
      localidad = nuevaLocalidad;
    }

    // 3. Determinar el nombre (si se actualiza)
    const nuevoNombre = nombre ?? actual.getNombre();

    // 4. Construir el nuevo feedlot con los datos actualizados
    const actualizado = new Feedlot(idFeedlot, nuevoNombre, localidad);

    // 5. Validar y persistir
    if (!actualizado.isValid()) {
      throw new Error("Datos inválidos para actualización");
    }

  await this.feedlotRepo.update(actualizado);
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