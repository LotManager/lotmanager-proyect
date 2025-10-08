import { Pesaje } from '../entities/Pesaje';

export interface IPesajeRepository {
  save(p: Pesaje): Promise<Pesaje>;
  findByBovinoId(id_bovino: number): Promise<Pesaje[]>;
}

