import { Corral } from "domain/entities/Corral";

export interface ICorralRepository {
  findById(id: number): Promise<Corral | null>;
  findAll(): Promise<Corral[]>;
  create(corral: Corral): Promise<Corral>;
  update(corral: Corral): Promise<void>;
  delete(id: number): Promise<void>;
  exists(id: number): Promise<boolean>;
}

//FALTA IMPLEMENTAR LOS METODOS QUE HAGAN FALTA SEGUN SE VAYAN NECESITANDO