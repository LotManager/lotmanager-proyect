// src/services/corral.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL

// ✅ Actualizamos el tipo para que coincida con el nuevo Backend
export type Corral = {
  id: number
  numero: number
  capacidadMaxima: number // Antes: capacidad_maxima
  tipo: "ENGORDE" | "ENFERMA" // Antes: tipoCorral
  feedlotId: number // Antes: idFeedlot
  nombreDieta?: string;
  
  // Eliminamos idAlimentacion y nombreAlimentacion ya que ahora se manejan por 'Suministro'
}

export async function getCorrales(): Promise<Corral[]> {
  // Asegurate de que tu backend esté corriendo y la URL sea correcta
  const res = await fetch(`${API_URL}/api/corrales`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al obtener corrales")
  return res.json()
}

export async function createCorral(data: Omit<Corral, "id">) {
  const res = await fetch(`${API_URL}/api/corrales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al crear corral")
  return res.json()
}

export async function updateCorral(id: number, data: Partial<Corral>) {
  const res = await fetch(`${API_URL}/api/corrales/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error al actualizar corral. Status: ${res.status}`);
  }

  // Nuestro nuevo backend devuelve el objeto actualizado (JSON), así que esto es seguro
  return res.json(); 
}

export async function deleteCorral(id: number) {
  const res = await fetch(`${API_URL}/api/corrales/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Error al eliminar corral")
  return true
}

export async function getCorralById(id: number): Promise<Corral> {
  const res = await fetch(`${API_URL}/api/corrales/${id}`);
  
  if (!res.ok) {
    throw new Error("Error al obtener los datos del corral");
  }
  
  return res.json();
}

// --- Tipos auxiliares ---

export type Alimentacion = {
  id: number
  nombre: string
}

export async function getDietas(): Promise<Alimentacion[]> {
  const res = await fetch(`${API_URL}/api/alimentaciones`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al obtener dietas")
  return res.json()
}

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

export async function getCorralDetalle(id: number): Promise<CorralDetalle> {
  // Llamamos a la nueva ruta de detalle
  const res = await fetch(`${API_URL}/api/corrales/${id}/detalle`, { cache: "no-store" });
  
  if (!res.ok) {
    // Intentamos leer el error del backend
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al obtener el detalle del corral");
  }
  
  return res.json();
}