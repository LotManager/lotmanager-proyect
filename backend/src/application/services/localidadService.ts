import { Localidad } from "../../domain/entities/Localidad";
import { ILocalidadRepository } from "../../domain/interfaces/ILocalidadRepository";
import { IProvinciaRepository } from "../../domain/interfaces/IProvinciaRepository";

export class LocalidadService {
  constructor(
    private readonly localidadRepo: ILocalidadRepository,
    private readonly provinciaRepo: IProvinciaRepository
  ) {}

  public async registrarSrv(
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

 public async actualizarSrv(
  id: number,
  cambios: {
    nombre?: string;
    codigoPostal?: number;
    idProvincia?: number;
  }): Promise<void> {
  const localidadActual = await this.localidadRepo.findById(id);
  if (!localidadActual) throw new Error("Localidad no encontrada");

  // Usamos la provincia actual por defecto
  let provincia = localidadActual.getProvincia();

  // Si se solicita cambiar la provincia, la buscamos
  if (cambios.idProvincia !== undefined && cambios.idProvincia !== provincia.getId()) {
    const nuevaProvincia = await this.provinciaRepo.findById(cambios.idProvincia);
    if (!nuevaProvincia) throw new Error("Provincia no encontrada");
    provincia = nuevaProvincia;
  }

  const nuevaLocalidad = new Localidad(
    id,
    cambios.codigoPostal ?? localidadActual.getCodigoPostal(),
    cambios.nombre ?? localidadActual.getNombre(),
    provincia 
  );

  await this.localidadRepo.update(nuevaLocalidad);
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



