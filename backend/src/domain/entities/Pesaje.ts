export class Pesaje {
  constructor(
    public readonly id: number,
    public bovinoId: number,
    public fecha: Date,
    public pesoActual: number
  ) {}
}