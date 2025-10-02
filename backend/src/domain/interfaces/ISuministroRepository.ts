import { Suministro } from "../entities/Suministro"

export interface ISuministroRepository {
  findById(id: number): Promise<Suministro | null>
  findAll(): Promise<Suministro[]>
  create(suministro: Suministro): Promise<Suministro>
  update(suministro: Suministro): Promise<void>
  delete(id: number): Promise<void>
  exists(id: number): Promise<boolean>
}