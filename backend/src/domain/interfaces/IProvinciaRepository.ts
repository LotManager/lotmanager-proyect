import { Provincia } from "../entities/Provincia.js";

export interface IProvinciaRepository {
    findById(id: number): Promise<Provincia | null>;
    findAll(): Promise<Provincia[]>;
    create(provincia: Provincia): Promise<Provincia>;
    update(provincia: Provincia): Promise<void>;
    delete(id: number): Promise<void>;
    exists(id: number): Promise<boolean>;
}

