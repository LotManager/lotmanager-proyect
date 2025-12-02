import { api } from "./api";

// ------------------------------------------------------------------
// 1. TIPOS DE DATOS 
// ------------------------------------------------------------------

export type Bovino = {
  id: number;
  caravana: number;
  pesoActual: number;
  corralId: number;
  nombreCorral: string;
  gmd: number;
  estadoSalud: "SANO" | "ENFERMO" | "FALLECIDO"; 
};

export type CreateBovinoInput = {
  razaId: number;
  corralId: number;
  caravana: number;
  ingreso: string; 
  pesoIngreso: number;
  sexo: "MACHO" | "HEMBRA";
  tipoBovino: "TERNERO" | "NOVILLO" | "VAQUILLONA" | "DESCARTE";
  situacionBovino?: "ENCORRAL" | "EGRESADA";
  estadoSalud?: "SANO" | "ENFERMO" | "FALLECIDO";
  egreso?: string | null;
  pesoEgreso?: number | null;
};

export type UpdateBovinoInput = Partial<CreateBovinoInput>;

// ------------------------------------------------------------------
// 2. FUNCIONES 
// ------------------------------------------------------------------

export async function getBovinos(): Promise<Bovino[]> {
  return api("/api/bovinos");
}

export async function createBovino(data: CreateBovinoInput) {
  return api("/api/bovinos", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBovino(id: number, data: UpdateBovinoInput) {
  return api(`/api/bovinos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBovino(id: number) {
  return api(`/api/bovinos/${id}`, {
    method: "DELETE",
  });
}