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
