const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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

export async function getDietas(): Promise<Dieta[]> {
  const res = await fetch(`${API_URL}/api/dietas`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener dietas");
  return res.json();
}

export async function createDieta(data: CreateDietaInput) {
  const res = await fetch(`${API_URL}/api/dietas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al crear la dieta");
  }
  return res.json();
}

export async function updateDieta(id: number, data: Partial<CreateDietaInput>) {
  const res = await fetch(`${API_URL}/api/dietas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar la dieta");
  return res.json();
}

export async function deleteDieta(id: number) {
  const res = await fetch(`${API_URL}/api/dietas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar la dieta");
  return true;
}