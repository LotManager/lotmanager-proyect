// src/domain/entities/Bovino.ts

// Enum que **copiamos tal cual** del schema Prisma (para no mezclar strings sueltas)
export enum EstadoBovino {
  ENGORDE = 'ENGORDE',
  ENGORDE_FINAL = 'ENGORDE_FINAL',
  EGRESADO = 'EGRESADO',
  // agregá más valores que uses
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

/* ----------------------------------------------------------
   Entidad PURA (sin Prisma, sin base de datos)
---------------------------------------------------------- */
export class Bovino {
  // Propiedades readonly → inmutables después de creada
  constructor(
    public readonly id: number | null, // null cuando todavía no se guardó
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

  /* --------------------------------------------------------
     Lógica de dominio (ejemplos)
  -------------------------------------------------------- */
  // ¿El bovino ya egresó?
  get estaEgresado(): boolean {
    return this.estado_bovino === EstadoBovino.EGRESADO || this.egreso !== null;
  }

  // Calcular ganancia de peso (kg)
  gananciaPeso(pesoActual: number): number {
    return pesoActual - this.peso_ingreso;
  }

  // Factory: crea una instancia sin ID (nuevo bovino)
    static crearNuevo(props: Omit<Bovino, 'id'>): Bovino {
    return new Bovino(
      null,
      props.id_raza,
        props.id_corral,
        props.caravana,
        props.estado_bovino,
        props.estado_salud,
        props.ingreso,
        props.egreso,
        props.peso_ingreso,
        props.peso_egreso,
        props.sexo,
        props.tipo_bovino
    );
  }
}