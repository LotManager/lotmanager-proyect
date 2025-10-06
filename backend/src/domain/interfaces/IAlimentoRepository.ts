import { Alimento } from "domain/entities/Alimento";

export interface IAlimentoRepository {
    findById(id: number): Promise<Alimento | null>;
    findAll(): Promise<Alimento[]>;
    create(alimento: Alimento): Promise<Alimento>;
    update(alimento: Alimento): Promise<void>;
    delete(id: number): Promise<void>;
    exists(id: number): Promise<boolean>;
}