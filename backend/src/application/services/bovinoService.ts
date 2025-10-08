import { Bovino } from '../../domain/entities/Bovino';
import { IBovinoRepository } from '../../domain/interfaces/IBovinoRepository';

export class BovinoService {
  constructor(private readonly repo: IBovinoRepository) {}

  async actualizar(bovino: Bovino): Promise<Bovino> {
    return this.repo.update(bovino);
  }

  async eliminar(id: number): Promise<void> {
    return this.repo.softDelete(id);
  }

  async obtenerPorId(id: number): Promise<Bovino | null> {
    return this.repo.findById(id);
  }
}