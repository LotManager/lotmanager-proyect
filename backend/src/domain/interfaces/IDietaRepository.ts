import { Dieta } from "../entities/Dieta";

export interface IDietaRepository {
  create(data: Omit<Dieta, "id">): Promise<Dieta>;
  findAll(): Promise<Dieta[]>;
  findById(id: number): Promise<Dieta | null>;
  // El update puede ser complejo, por ahora actualizamos datos básicos
  update(id: number, data: Partial<Omit<Dieta, "id" | "detalles">>): Promise<Dieta>;
  delete(id: number): Promise<void>;
  
  // Método especial para gestionar ingredientes si queremos editar la receta después
  // updateDetalles(idDieta: number, nuevosDetalles: { alimentoId: number, proporcionKg: number }[]): Promise<void>;
}