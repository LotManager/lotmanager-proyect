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

export interface CorralEfficiencyItem {
  corralId: string | number;
  nombre: string;
  eficiencia: number;
  gmd: number;
}

export interface CorralEfficiencyCardProps {
  data: CorralEfficiencyItem[];
}

export interface HealthStatsData {
  sanosPercentage: number;
  enTratamientoPercentage: number;
  criticosPercentage: number;
  mortalidadPercentage: number;
}

export interface HealthStatsCardProps {
  data: HealthStatsData;
}

export interface MonthlySummaryData {
  pesoPromedioInicial: number;
  pesoPromedioActual: number;
  gananciaTotal: number;
  gmdPromedio: number;
}

export interface MonthlySummaryCardProps {
  data: MonthlySummaryData;
}

export interface WeightEvolutionDataPoint {
  month: string;
  [key: string]: string | number;
}

export interface WeightEvolutionSeries {
  dataKey: string;
  name: string;
  color: string;
}

export interface WeightEvolutionCardProps {
  data: WeightEvolutionDataPoint[];
  series: WeightEvolutionSeries[];
}