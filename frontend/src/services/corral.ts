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
  const res = await fetch(`${API_URL}/corrales`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al obtener corrales")
  return res.json()
}

export async function createCorral(data: Omit<Corral, "id">) {
  const res = await fetch(`${API_URL}/corrales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al crear corral")
  return res.json()
}

export async function updateCorral(id: number, data: Partial<Corral>) {
  const res = await fetch(`${API_URL}/corrales/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al actualizar corral")
  return res.json()
}

export async function deleteCorral(id: number) {
  const res = await fetch(`${API_URL}/corrales/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Error al eliminar corral")
  return true
}

export type Dieta = {
  id: number
  nombre: string
}

export async function getDietas(): Promise<Dieta[]> {
  const res = await fetch(`${API_URL}/dietas`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al obtener dietas")
  return res.json()
}