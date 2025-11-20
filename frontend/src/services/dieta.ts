import { api } from "./api";

// ------------------------------------------------------------------
// 1. TIPOS DE DATOS
// ------------------------------------------------------------------

export type DetalleDieta = {
  alimentoId: number;
  proporcionKg: number;
  alimento?: {
    id: number;
    nombre: string;
    tipo: string;
  };
};

export type Dieta = {
  id: number;
  nombre: string;
  descripcion: string | null;
  detallesDieta: DetalleDieta[];
};

// Input para Crear/Editar
export type CreateDietaInput = {
  nombre: string;
  descripcion?: string;
  detalles: {
    alimentoId: number;
    proporcionKg: number;
  }[];
};

export type UpdateDietaInput = Partial<CreateDietaInput>;

// ------------------------------------------------------------------
// 2. FUNCIONES 
// ------------------------------------------------------------------

export async function getDietas(): Promise<Dieta[]> {
  return api("/api/dietas");
}

export async function createDieta(data: CreateDietaInput) {
  return api("/api/dietas", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateDieta(id: number, data: UpdateDietaInput) {
  return api(`/api/dietas/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteDieta(id: number) {
  return api(`/api/dietas/${id}`, {
    method: "DELETE",
  });
}

export async function getDietaById(id: number): Promise<Dieta> {
  return api(`/api/dietas/${id}`);
}