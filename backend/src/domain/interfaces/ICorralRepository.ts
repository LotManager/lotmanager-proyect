import { Corral } from "../entities/Corral"

export interface ICorralRepository {
  create(data: Omit<Corral, 'id'>): Promise<Corral>;
  findById(id: number): Promise<Corral | null>
  findAll(): Promise<Corral[]>
  update(corral: Corral): Promise<Corral>
  delete(id: number): Promise<void>
  exists(id: number): Promise<boolean>
}