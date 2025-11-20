// src/lib/api.ts

import type { SanidadRow, ResumenRow, EficienciaBar, EvolucionMes } from '@/src/types/reportes';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API = `${BASE_URL}/api`;

export async function getSanidadStats(corralId?: number): Promise<SanidadRow[]> {
  const url = `${API}/reports/health-stats${corralId ? `?corral=${corralId}` : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener sanidad (${url})`);
  return await res.json() as SanidadRow[];
}

export async function getResumenMensual(): Promise<ResumenRow[]> {
  const url = `${API}/reports/monthly-summary`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener resumen mensual (${url})`);
  return await res.json() as ResumenRow[];
}

export async function getEficienciaCorral(): Promise<EficienciaBar[]> {
  const url = `${API}/reports/corral-efficiency`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener eficiencia por corral (${url})`);
  return await res.json() as EficienciaBar[];
}

export async function getEvolucionPesoLote(): Promise<EvolucionMes[]> {
  const url = `${API}/reports/weight-evolution`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener evolución de peso (${url})`);
  return await res.json() as EvolucionMes[];
}

// export async function getEmpleados(): Promise<Empleado[]> {
//   const res = await fetch(`${API}/empleados`, { cache: 'no-store' });
//   if (!res.ok) throw new Error('Error al obtener empleados');
//   return res.json();
// }

// export async function getEmpleadoStats(): Promise<EmpleadoStats> {
//   const res = await fetch(`${API}/empleados/stats`, { cache: 'no-store' });
//   if (!res.ok) throw new Error('Error al obtener estadísticas');
//   return res.json();
// }

export async function deleteEmpleado(id: number): Promise<void> {
  const res = await fetch(`${API}/empleados/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar');
}

// export async function updateEmpleado(id: number, data: Partial<Empleado>): Promise<Empleado> {
//   const res = await fetch(`${API}/empleados/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error('Error al actualizar');
//   return res.json();
// }