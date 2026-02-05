import { 
  CorralEfficiencyItem, 
  HealthStatsData, 
  MonthlySummaryData, 
  WeightEvolutionDataPoint, 
  WeightEvolutionSeries 
} from "@/src/types/reportes";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getCorralEfficiency(): Promise<CorralEfficiencyItem[]> {
  const res = await fetch(`${API_URL}/api/reports/corral-efficiency`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener eficiencia de corrales");
  return res.json();
}

export async function getHealthStats(): Promise<HealthStatsData> {
  const res = await fetch(`${API_URL}/api/reports/health-stats`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener estadísticas de sanidad");
  return res.json();
}

export async function getMonthlySummary(): Promise<MonthlySummaryData> {
  const res = await fetch(`${API_URL}/api/reports/monthly-summary`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener resumen mensual");
  return res.json();
}

export async function getWeightEvolution(): Promise<{ data: WeightEvolutionDataPoint[], series: WeightEvolutionSeries[] }> {
  const res = await fetch(`${API_URL}/api/reports/weight-evolution`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener evolución de peso");
  return res.json();
}
