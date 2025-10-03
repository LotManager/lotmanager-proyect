import { Pesaje } from '../entities/Pesaje';

export interface IPesajeRepository {
  // Alta
  save(p: Pesaje): Promise<Pesaje>;
  // Historial de un bovino
  findByBovinoId(id_bovino: number): Promise<Pesaje[]>;
}