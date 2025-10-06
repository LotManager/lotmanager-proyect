import { Alimentacion } from "domain/entities/Alimentacion";

export interface IAlimentacionRepository {
    findById(id: number): Promise<Alimentacion | null>;
    findAll(): Promise<Alimentacion[]>;
    create(alimentacion: Alimentacion): Promise<Alimentacion>;
    update(alimentacion: Alimentacion): Promise<void>;
    delete(id: number): Promise<void>;
    exists(id: number): Promise<boolean>;
}