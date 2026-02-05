import { TipoAlimento } from "@prisma/client";

export class Alimento {
  constructor(
    public readonly id: number,
    public nombre: string,
    public tipo: TipoAlimento
  ) {}
}