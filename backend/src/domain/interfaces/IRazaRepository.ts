import { Raza } from "../entities/Raza";

export interface IRazaRepository {
  create(data: Omit<Raza, "id">): Promise<Raza>;
  findAll(): Promise<Raza[]>;
  findById(id: number): Promise<Raza | null>;
  update(id: number, data: Partial<Omit<Raza, "id">>): Promise<Raza>;
  delete(id: number): Promise<void>;
}