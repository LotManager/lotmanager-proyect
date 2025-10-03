import { Raza } from '../entities/Raza';

export interface IRazaRepository {
  findAll(): Promise<Raza[]>;
  findById(id: number): Promise<Raza | null>;
  save(r: Raza): Promise<Raza>;
  update(r: Raza): Promise<Raza>;
  remove(id: number): Promise<void>;
}