import { SituacionBovino, EstadoSalud, SexoBovino, TipoBovino } from "@prisma/client";

export class Bovino {
  constructor(
    public readonly id: number,
    public razaId: number,
    public corralId: number,
    public caravana: number,
    public situacionBovino: SituacionBovino, 
    public estadoSalud: EstadoSalud,
    public ingreso: Date,
    public pesoIngreso: number,
    public sexo: SexoBovino, 
    public tipoBovino: TipoBovino,
    public egreso: Date | null,
    public pesoEgreso: number | null
  ) {}
}