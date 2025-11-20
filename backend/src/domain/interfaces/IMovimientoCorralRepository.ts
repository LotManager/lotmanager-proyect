import { MovimientoCorral } from "../entities/MovimientoCorral";

export interface IMovimientoCorralRepository {
  create(data: Omit<MovimientoCorral, "id">): Promise<MovimientoCorral>;
  findByBovino(bovinoId: number): Promise<MovimientoCorral[]>;
}