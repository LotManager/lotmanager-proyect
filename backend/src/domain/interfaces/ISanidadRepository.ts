// src/domain/interfaces/ICasoEnfermedadRepository.ts
import { CasoEnfermedad } from "../entities/Sanidad";

export interface ICasoEnfermedadRepository {
  create(caso: CasoEnfermedad): Promise<CasoEnfermedad>;
  findById(id: number): Promise<CasoEnfermedad | null>;
  findAll(): Promise<CasoEnfermedad[]>;
  update(caso: CasoEnfermedad): Promise<void>;
  delete(id: number): Promise<void>;
  exists(id: number): Promise<boolean>;
}