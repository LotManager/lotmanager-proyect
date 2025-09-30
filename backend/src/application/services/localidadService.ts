import { Localidad } from "../../domain/entities/Localidad";
import { ILocalidadRepository } from "../../domain/interfaces/ILocalidadRepository";
import { IProvinciaRepository } from "../../domain/interfaces/IProvinciaRepository";

export class LocalidadService {
  constructor(
    private readonly localidadRepo: ILocalidadRepository,
    private readonly provinciaRepo: IProvinciaRepository
  ) {}

  public async registrar(
    id: number,
    codigoPostal: number,
    nombre: string,
    idProvincia: number
  ): Promise<Localidad> {
    const provincia = await this.provinciaRepo.findById(idProvincia);
    if (!provincia) {
      throw new Error("Provincia no encontrada");
    }

    const localidad = new Localidad(id, codigoPostal, nombre, provincia);
    return await this.localidadRepo.create(localidad);
  }

  public async actualizar(
    id: number,
    codigoPostal: number,
    nombre: string,
    idProvincia: number
  ): Promise<void> {
    const provincia = await this.provinciaRepo.findById(idProvincia);
    if (!provincia) {
      throw new Error("Provincia no encontrada");
    }

    const localidad = new Localidad(id, codigoPostal, nombre, provincia);
    await this.localidadRepo.update(localidad);
  }

  public async eliminar(id: number): Promise<void> {
    await this.localidadRepo.delete(id);
  }

  public async obtenerPorId(id: number): Promise<Localidad | null> {
    return await this.localidadRepo.findById(id);
  }

  public async listar(): Promise<Localidad[]> {
    return await this.localidadRepo.findAll();
  }

  public async existe(id: number): Promise<boolean> {
    return await this.localidadRepo.exists(id);
  }
}



