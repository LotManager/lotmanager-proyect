// src/domain/entities/Bovino.ts
export enum EstadoBovino {
  ENGORDE = 'ENGORDE',
  ENGORDE_FINAL = 'ENGORDE_FINAL',
  EGRESADO = 'EGRESADO',
}

export enum EstadoSalud {
  SANO = 'SANO',
  ENFERMO = 'ENFERMO',
  RECUPERADO = 'RECUPERADO',
}

export enum Sexo {
  MACHO = 'MACHO',
  HEMBRA = 'HEMBRA',
}

export enum TipoBovino {
  TERNERO = 'TERNERO',
  VAQUILLONA = 'VAQUILLONA',
  NOVILLO = 'NOVILLO',
  TORO = 'TORO',
}

export class Bovino {
  constructor(
    public readonly id: number | null,
    public readonly id_raza: number,
    public readonly id_corral: number,
    public readonly caravana: number,
    public readonly estado_bovino: EstadoBovino,
    public readonly estado_salud: EstadoSalud,
    public readonly ingreso: Date,
    public readonly egreso: Date | null,
    public readonly peso_ingreso: number,
    public readonly peso_egreso: number | null,
    public readonly sexo: Sexo,
    public readonly tipo_bovino: TipoBovino
  ) {}

  get estaEgresado(): boolean {
    return this.estado_bovino === EstadoBovino.EGRESADO || this.egreso !== null;
  }

  gananciaPeso(pesoActual: number): number {
    return pesoActual - this.peso_ingreso;
  }
}