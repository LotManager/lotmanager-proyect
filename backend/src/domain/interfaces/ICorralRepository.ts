import { Corral } from "../entities/Corral";

export interface ICorralRepository {
  create(data: Omit<Corral, "id">): Promise<Corral>;
  findById(id: number): Promise<Corral | null>;
  findAll(): Promise<Corral[]>;
  delete(id: number): Promise<void>;
  exists(id: number): Promise<boolean>; // Este lo tenías en tu repo de Corral, lo mantenemos
  update(id: number, data: Partial<Omit<Corral, "id">>): Promise<Corral>;
}