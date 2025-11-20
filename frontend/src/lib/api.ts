// src/lib/api.ts

import type { SanidadStats, Tratamiento } from '../types/sanidad';
import type { Empleado, EmpleadoStats } from '../types/empleado';
import type { SanidadRow, ResumenRow, EficienciaBar, EvolucionMes } from '../types/reportes';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function getSanidadStats(corralId?: number): Promise<SanidadRow[]> {
  const url = `${API}/reportes/sanidad${corralId ? `?corral=${corralId}` : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener sanidad (${url})`);
  return await res.json() as SanidadRow[];
}

export async function getSanidadResumen(): Promise<SanidadStats> {
  const res = await fetch(`${API}/sanidad/resumen`, { cache: 'no-store' });
  
  if (!res.ok) throw new Error('Error al obtener resumen de sanidad');
  
  return res.json(); // Esto devuelve el objeto SanidadStats, no un array
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

export async function getEmpleados(): Promise<Empleado[]> {
  const res = await fetch(`${API}/empleados`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener empleados');
  return res.json();
}

export async function getEmpleadoStats(): Promise<EmpleadoStats> {
  const res = await fetch(`${API}/empleados/stats`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al obtener estadísticas');
  return res.json();
}

export async function deleteEmpleado(id: number): Promise<void> {
  const res = await fetch(`${API}/empleados/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar');
}

export async function updateEmpleado(id: number, data: Partial<Empleado>): Promise<Empleado> {
  const res = await fetch(`${API}/empleados/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar');
  return res.json();
}

export async function getTratamientosActivos(): Promise<Tratamiento[]> {
  const url = `${API}/sanidad/tratamientos-activos`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Error ${res.status} al obtener tratamientos activos`);
  return await res.json() as Tratamiento[];
}

export async function getDashboardData() {
  const res = await fetch(`${API}/dashboard`);
  return res.json();

  return {
    kpis: {
      totalAnimales: 0,      // 0 para usuario nuevo
      pesoPromedio: 0,
      gmdPromedio: 0,
      alertasCount: 0
    },
    // ARRAY VACÍO = USUARIO NUEVO (Esto activará el estado "Sin datos" en el gráfico)
    pesoEvolution: [], 
    /* EJEMPLO CON DATOS:
      pesoEvolution: [{ name: 'Ene', peso: 100 }, { name: 'Feb', peso: 120 }] 
    */
    
    // ARRAY VACÍO = SIN ALERTAS (Esto activará "Todo bajo control")
    alertasRecientes: []
    /* EJEMPLO CON DATOS:
      alertasRecientes: [{ title: 'Fiebre', desc: 'Corral 5', date: 'Hoy' }]
    */
  };
}