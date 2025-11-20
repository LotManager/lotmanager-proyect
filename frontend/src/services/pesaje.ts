const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type CreatePesajeInput = {
  bovinoId: number;
  pesoActual: number;
  fecha: string; 
};

export async function registrarPesaje(data: CreatePesajeInput) {
  const res = await fetch(`${API_URL}/api/pesajes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al registrar pesaje");
  }
  
  return res.json();
}