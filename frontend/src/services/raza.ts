// src/services/raza.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type Raza = {
  id: number;
  nombre: string;
};

export async function getRazas(): Promise<Raza[]> {
  const res = await fetch(`${API_URL}/api/razas`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener razas");
  return res.json();
}