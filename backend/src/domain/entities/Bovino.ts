import { EstadoBovino, EstadoSalud, Sexo, TipoBovino } from "@prisma/client";

export class Bovino {
  constructor(
    public readonly id: number,
    // Usamos camelCase por convención en TypeScript
    public idRaza: number,
    public idCorral: number,
    public caravana: number,
    public estadoBovino: EstadoBovino,
    public estadoSalud: EstadoSalud,
    public ingreso: Date,
    public pesoIngreso: number,
    public sexo: Sexo,
    public tipoBovino: TipoBovino,
    public egreso: Date | null,
    public pesoEgreso: number | null
  ) {}
}