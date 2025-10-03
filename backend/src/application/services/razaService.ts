import { Raza } from '../../domain/entities/Raza';
import { IRazaRepository } from '../../domain/interfaces/IRazaRepository';

export class RazaService {
  constructor(private readonly repo: IRazaRepository) {}

  async listar(): Promise<Raza[]> {
    return this.repo.findAll();
  }

  async obtenerPorId(id: number): Promise<Raza | null> {
    return this.repo.findById(id);
  }

  async crear(nombre: string): Promise<Raza> {
    const raza = new Raza(null, nombre);
    return this.repo.save(raza);
  }

  async actualizar(id: number, nombre: string): Promise<void> {
    const raza = new Raza(id, nombre);
    await this.repo.update(raza);
  }

  async eliminar(id: number): Promise<void> {
    await this.repo.remove(id);
  }
}