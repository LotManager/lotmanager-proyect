import { Enfermedad  } from "../entities/Enfermedad";

export interface IEnfermedadRepository {
  findById(id: number): Promise<Enfermedad | null>;
  findAll(): Promise<Enfermedad[]>;
  create(enfermedad: Enfermedad): Promise<Enfermedad>;
  update(enfermedad: Enfermedad): Promise<void>;
  delete(id: number): Promise<void>;
  exists(id: number): Promise<boolean>;
}