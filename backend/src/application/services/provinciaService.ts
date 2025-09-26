import { Provincia } from "../../domain/entities/Provincia.js";
import { IProvinciaRepository } from "../../domain/interfaces/IProvinciaRepository.js";

export class ProvinciaService {
  constructor(private readonly repo: IProvinciaRepository) {}

  public async registrar(id: number, nombre: string): Promise<Provincia> {
    if (!Provincia.isNombreValido(nombre)) {
      throw new Error("Nombre de provincia inválido");
    }

    const provincia = new Provincia(id, nombre);
    return await this.repo.create(provincia);
  }

  public async actualizar(id: number, nombre: string): Promise<void> {
    if (!Provincia.isNombreValido(nombre)) {
      throw new Error("Nombre de provincia inválido");
    }

    const provincia = new Provincia(id, nombre);
    await this.repo.update(provincia);
  }

  public async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  public async obtenerPorId(id: number): Promise<Provincia | null> {
    return await this.repo.findById(id);
  }

  public async listar(): Promise<Provincia[]> {
    return await this.repo.findAll();
  }
  public async existe(id: number): Promise<boolean> {
    return await this.repo.exists(id);
  }
}


