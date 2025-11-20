import { Suministro } from "../entities/Suministro"

export interface ISuministroRepository {
  findById(id: number): Promise<Suministro | null>
  findAll(): Promise<Suministro[]>
  create(suministro: Suministro): Promise<Suministro>
  update(suministro: Suministro): Promise<Suministro>
  delete(id: number): Promise<void>
  exists(id: number): Promise<boolean>
}