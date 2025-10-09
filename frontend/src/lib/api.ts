// lib/api.ts
import type { SanidadRow, ResumenRow, EficienciaBar, EvolucionMes } from '@/types/reportes';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function getSanidadStats(corralId?: number): Promise<SanidadRow[]> {
  const url = `${API}/reportes/sanidad${corralId ? `?corral=${corralId}` : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener sanidad (${url})`);
  return await res.json() as SanidadRow[];
}

export async function getResumenMensual(): Promise<ResumenRow[]> {
  const url = `${API}/reportes/resumen-mensual`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener resumen mensual (${url})`);
  return await res.json() as ResumenRow[];
}

export async function getEficienciaCorral(): Promise<EficienciaBar[]> {
  const url = `${API}/reportes/eficiencia-corral`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener eficiencia por corral (${url})`);
  return await res.json() as EficienciaBar[];
}

export async function getEvolucionPesoLote(): Promise<EvolucionMes[]> {
  const url = `${API}/reportes/evolucion-peso-mes`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener evolución de peso (${url})`);
  return await res.json() as EvolucionMes[];
}