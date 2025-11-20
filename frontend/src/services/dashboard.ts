import { api } from "./api"; // Tu cliente seguro

export type DashboardData = {
  kpis: {
    totalAnimales: number;
    pesoPromedio: number;
    gmdPromedio: number;
    alertasCount: number;
  };
  pesoEvolution: { month: string; peso: number }[];
  alertasRecientes: { title: string; desc: string; date: string }[];
};

export async function getDashboardData(): Promise<DashboardData> {
  return api("/api/dashboard/summary");
}