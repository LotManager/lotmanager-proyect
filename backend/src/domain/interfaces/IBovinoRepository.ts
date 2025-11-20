import { Bovino } from "../entities/Bovino";

export interface IBovinoRepository {
  create(data: Omit<Bovino, 'id'>): Promise<Bovino>;
  findAll(): Promise<Bovino[]>;
  findById(id: number): Promise<Bovino | null>;
  update(bovino: Bovino): Promise<Bovino>; // 👈 recibe la entidad completa
  delete(id: number): Promise<void>;
  exists(id: number): Promise<boolean>
  findByCorral(idCorral: number): Promise<Bovino[]>;
}