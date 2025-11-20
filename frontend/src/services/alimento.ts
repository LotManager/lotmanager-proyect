import { api } from "./api";

// --- TIPOS ---

export type Alimento = {
  id: number;
  nombre: string;
  tipo: "GRANO" | "FORRAJE" | "SUPLEMENTO"; 
};

export type CreateAlimentoInput = Omit<Alimento, "id">;
export type UpdateAlimentoInput = Partial<CreateAlimentoInput>;

// --- FUNCIONES ---

export async function getAlimentos(): Promise<Alimento[]> {
  return api("/api/alimentos");
}

export async function createAlimento(data: CreateAlimentoInput) {
  return api("/api/alimentos", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAlimento(id: number, data: UpdateAlimentoInput) {
  return api(`/api/alimentos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAlimento(id: number) {
  return api(`/api/alimentos/${id}`, {
    method: "DELETE",
  });
}