const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type Alimento = {
  id: number;
  nombre: string;
  tipo: "GRANO" | "FORRAJE" | "SUPLEMENTO"; 
};

export type CreateAlimentoInput = Omit<Alimento, "id">;

export async function getAlimentos(): Promise<Alimento[]> {
  const res = await fetch(`${API_URL}/api/alimentos`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener alimentos");
  return res.json();
}

export async function createAlimento(data: CreateAlimentoInput) {
  const res = await fetch(`${API_URL}/api/alimentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear alimento");
  return res.json();
}

export async function updateAlimento(id: number, data: Partial<CreateAlimentoInput>) {
  const res = await fetch(`${API_URL}/api/alimentos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar alimento");
  return res.json();
}

export async function deleteAlimento(id: number) {
  const res = await fetch(`${API_URL}/api/alimentos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar alimento");
  return true;
}