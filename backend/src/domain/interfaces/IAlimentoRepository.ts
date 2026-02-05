import { Alimento } from "../entities/Alimento";

export interface IAlimentoRepository {
  create(data: Omit<Alimento, "id">): Promise<Alimento>;
  findAll(): Promise<Alimento[]>;
  findById(id: number): Promise<Alimento | null>;
  update(id: number, data: Partial<Omit<Alimento, "id">>): Promise<Alimento>;
  delete(id: number): Promise<void>;
}