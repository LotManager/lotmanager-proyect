// types/reportes.ts
export interface SanidadRow {
  corral: string;
  sanos: number;
  tratamiento: number;
  criticos: number;
}

export interface ResumenRow {
  concepto: string;
  valor: string | number;
}

export interface EficienciaBar {
  corral: string;
  kgDiarios: number;
}

export interface EvolucionMes {
  mes: string; // "2025-09"
  pesoPromedio: number;
}