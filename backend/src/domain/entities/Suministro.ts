export class Suministro {
  constructor(
    public readonly id: number,
    public readonly cantidad: number,
    public readonly idAlimentacion: number,
    public readonly idAlimento: number
  ) {}
}