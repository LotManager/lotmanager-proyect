import { api } from "./api"; 

// ------------------------------------------------------------------
// 1. TIPOS DE DATOS
// ------------------------------------------------------------------

export type Corral = {
  id: number;
  numero: number;
  capacidadMaxima: number; 
  tipo: "ENGORDE" | "ENFERMA"; 
  feedlotId: number; 
  nombreDieta?: string;
};

// Tipos para formularios (Alias para que sea más legible)
export type CreateCorralInput = Omit<Corral, "id" | "nombreDieta">;
export type UpdateCorralInput = Partial<CreateCorralInput>;

// Tipos auxiliares para Suministros y Dietas
export type Alimentacion = {
  id: number;
  nombre: string;
};

export type SuministroHistorico = {
  id: number;
  fecha: string;
  nombreDieta: string;
  cantidadKg: number;
};

export type CorralDetalle = {
  id: number;
  numero: number;
  capacidadMaxima: number;
  tipo: "ENGORDE" | "ENFERMA";
  nombreAlimentacion: string;
  bovinosCount: number;
  gmdKgDia: number;
  relacionPesoConsumo: number; 
  pesoTotal: number;
  consumoDiario: number;
  historialSuministros: SuministroHistorico[];
};

// ------------------------------------------------------------------
// 2. FUNCIONES 
// ------------------------------------------------------------------

export async function getCorrales(): Promise<Corral[]> {
  return api("/api/corrales");
}

export async function createCorral(data: CreateCorralInput) {
  return api("/api/corrales", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCorral(id: number, data: UpdateCorralInput) {
  return api(`/api/corrales/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCorral(id: number) {
  return api(`/api/corrales/${id}`, {
    method: "DELETE",
  });
}

export async function getCorralById(id: number): Promise<Corral> {
  return api(`/api/corrales/${id}`);
}

export async function getCorralDetalle(id: number): Promise<CorralDetalle> {
  return api(`/api/corrales/${id}/detalle`);
}

// --- Funciones auxiliares ---

export async function getDietas(): Promise<Alimentacion[]> {
  return api("/api/dietas"); 
}

export async function getBovinosCountByCorral(id: number): Promise<number> {
   const data = await api(`/api/corral-metrics/${id}/bovinos-count`);
   return data.count ?? 0;
}