import { TipoMotivo } from "@prisma/client";

export class MovimientoCorral {
  constructor(
    public readonly id: number,
    public bovinoId: number,
    public corralOrigenId: number,
    public corralDestinoId: number,
    public fecha: Date,
    public motivo: TipoMotivo
  ) {}
}