const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type CreateSuministroInput = {
  corralId: number;
  dietaId: number;
  cantidadKg: number;
};

export async function createSuministro(data: CreateSuministroInput) {
  const res = await fetch(`${API_URL}/api/suministros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al registrar suministro");
  }
  
  return res.json();
}