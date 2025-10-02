import { Bovino } from "../entities/Bovino";

export interface IBovinoRepository {
  findById(id: number): Promise<Bovino | null>;
  update(bovino: Bovino): Promise<Bovino>;
  softDelete(id: number): Promise<void>;
}