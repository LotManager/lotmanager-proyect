import { Bovino } from "../entities/Bovino";

export interface IBovinoRepository {
  create(data: Omit<Bovino, "id">): Promise<Bovino>;
  findAll(): Promise<Bovino[]>;
  findById(id: number): Promise<Bovino | null>;
  update(id: number, data: Partial<Omit<Bovino, "id">>): Promise<Bovino>;
  delete(id: number): Promise<void>;
  findByCorral(idCorral: number): Promise<Bovino[]>;
}