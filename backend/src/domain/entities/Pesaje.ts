export class Pesaje {
  constructor(
    public readonly id: number | null,
    public readonly id_bovino: number,
    public readonly fecha: Date,
    public readonly peso_dado: number
  ) {}
}