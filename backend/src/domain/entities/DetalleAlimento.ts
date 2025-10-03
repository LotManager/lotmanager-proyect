export class DetalleAlimento {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly tipo: string,
    public readonly idAlimento: number
  ) {}
}