import { Corral } from "../entities/Corral";

export interface ICorralRepository {
  create(data: Omit<Corral, "id">): Promise<Corral>;
  findById(id: number): Promise<Corral | null>;
  findAll(): Promise<Corral[]>;
  delete(id: number): Promise<void>;
  exists(id: number): Promise<boolean>; 
  update(id: number, data: Partial<Omit<Corral, "id">>): Promise<Corral>;
  findAllConUltimoSuministro(): Promise<any[]>;
  getConsumoReciente(idCorral: number, dias: number): Promise<number>;
  findByIdConUltimoSuministro(id: number): Promise<any>;
  findUltimosSuministros(idCorral: number, limite: number): Promise<any[]>;
}