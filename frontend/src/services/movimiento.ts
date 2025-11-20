const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type CreateMovimientoInput = {
  bovinoId: number;
  corralOrigenId: number;
  corralDestinoId: number;
  motivo: "ENFERMEDAD" | "CAMBIO"; // Coincide con tu Enum de Prisma
  fecha?: string; // ISO string
};

export async function crearMovimiento(data: CreateMovimientoInput) {
  const res = await fetch(`${API_URL}/api/movimientos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al registrar el movimiento");
  }
  
  return res.json();
}