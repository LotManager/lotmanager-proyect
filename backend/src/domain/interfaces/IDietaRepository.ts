import { Dieta } from "domain/entities/Dieta";
import { DetalleDieta } from "domain/entities/DetalleDieta";

export interface IDietaRepository {
    findById(id: number): Promise<Dieta | null>
    findAll(): Promise<Dieta[]>
    create(dieta: Dieta): Promise<Dieta>
    update(dieta: Dieta): Promise<void>
    delete(id: number): Promise<void>
    exists(id: number): Promise<boolean>
    addDetalle(dietaId: number, detalle: DetalleDieta): Promise<void>
    updateDetalle(dietaId: number, detalle: DetalleDieta): Promise<void>
    removeDetalle(dietaId: number, alimentoId: number): Promise<void>
}