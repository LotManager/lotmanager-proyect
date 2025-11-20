import { Alimento } from "./Alimento";

// Clase pequeña para el detalle
export class DetalleDieta {
  constructor(
    public dietaId: number,
    public alimentoId: number,
    public proporcionKg: number,
    public alimento?: Alimento // Opcional, para cuando leemos la dieta
  ) {}
}

// Clase principal
export class Dieta {
  constructor(
    public readonly id: number,
    public nombre: string,
    public descripcion: string | null,
    // Una dieta tiene una lista de detalles
    public detallesDieta: DetalleDieta[] = [] 
  ) {}
}