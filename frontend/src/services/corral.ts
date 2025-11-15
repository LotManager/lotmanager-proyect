export type Corral = {
  id: number
  numero: number
  capacidadMaxima: number
  tipoCorral: string
  idFeedlot: number
  idAlimentacion: number | null
  nombreAlimentacion?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getCorrales(): Promise<Corral[]> {
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

// src/services/corral.ts

export async function updateCorral(id: number, data: Partial<Corral>) {
  const res = await fetch(`${API_URL}/api/corrales/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Si el status es 204, la operación fue exitosa pero no hay contenido.
  // Devolvemos algo para indicar éxito (null, true, un objeto, lo que prefieras).
  if (res.status === 204) {
    return null; 
  }

  // Si no fue 204, pero tampoco fue "ok", ahí sí lanzamos el error.
  // Esto es más informativo porque podés ver qué status code falló.
  if (!res.ok) {
    throw new Error(`Error al actualizar corral. Status: ${res.status}`);
  }

  // Solo si la respuesta es ok Y tiene contenido, la parseamos.
  return res.json(); 
}

export async function deleteCorral(id: number) {
  const res = await fetch(`${API_URL}/api/corrales/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Error al eliminar corral")
  return true
}

export type alimentacion = {
  id: number
  nombre: string
}

export async function getDietas(): Promise<alimentacion[]> {
  const res = await fetch(`${API_URL}/alimentaciones`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al obtener dietas")
  return res.json()
}