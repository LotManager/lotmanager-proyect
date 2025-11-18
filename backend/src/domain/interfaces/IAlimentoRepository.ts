import { Alimento } from "domain/entities/Alimento";
import { $Enums } from "@prisma/client";

export type AlimentoFilter = {
    tipo?: $Enums.TipoAlimento;
    nombre?: string;
}

export interface IAlimentoRepository {
    findById(id: number): Promise<Alimento | null>;
    findAll(): Promise<Alimento[]>;
    findFiltered(filter: AlimentoFilter): Promise<Alimento[]>;
    create(alimento: Alimento): Promise<Alimento>;
    update(alimento: Alimento): Promise<void>;
    delete(id: number): Promise<void>;
    exists(id: number): Promise<boolean>;
}