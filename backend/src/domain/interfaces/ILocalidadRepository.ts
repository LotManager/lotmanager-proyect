import { Localidad } from "../entities/Localidad.js";

export interface ILocalidadRepository {
  findById(id: number): Promise<Localidad | null>;
  findAll(): Promise<Localidad[]>;
  create(localidad: Localidad): Promise<Localidad>;
  update(localidad: Localidad): Promise<void>;
  delete(id: number): Promise<void>;
  exists(id: number): Promise<boolean>;
}

