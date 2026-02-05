import { Alimento } from "./Alimento";

export class DetalleDieta {
  constructor(
    public dietaId: number,
    public alimentoId: number,
    public proporcionKg: number,
    public alimento?: Alimento 
  ) {}
}