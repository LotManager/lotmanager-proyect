import { api } from "./api"; // ✅ Usamos el cliente seguro que envía cookies

import { 
  CorralEfficiencyItem, 
  HealthStatsData, 
  MonthlySummaryData, 
  WeightEvolutionDataPoint, 
  WeightEvolutionSeries 
} from "@/src/types/reportes";

// Nota: Ya no necesitamos API_URL ni los try/catch repetitivos, 'api' lo maneja.

export async function getCorralEfficiency(): Promise<CorralEfficiencyItem[]> {
  return api("/api/reports/corral-efficiency");
}

export async function getHealthStats(): Promise<HealthStatsData> {
  return api("/api/reports/health-stats");
}

export async function getMonthlySummary(): Promise<MonthlySummaryData> {
  return api("/api/reports/monthly-summary");
}

export async function getWeightEvolution(): Promise<{ data: WeightEvolutionDataPoint[], series: WeightEvolutionSeries[] }> {
  return api("/api/reports/weight-evolution");
}