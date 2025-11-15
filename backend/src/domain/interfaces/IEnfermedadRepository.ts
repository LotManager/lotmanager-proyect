import { EnfermedadDTOType, EnfermedadParcialDTOType } from "application/dtos/enfermedad.dto";
import { Enfermedad  } from "../entities/Enfermedad";

export interface IEnfermedadRepository {
  findById(id: number): Promise<Enfermedad | null>;
  findAll(): Promise<Enfermedad[]>;
  create(enfermedad: EnfermedadDTOType): Promise<Enfermedad>;
  update(id: number, enfermedad: EnfermedadParcialDTOType): Promise<void>;
  delete(id: number): Promise<void>;
  exists(id: number): Promise<boolean>;
}