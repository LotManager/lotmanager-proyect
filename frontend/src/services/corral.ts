// frontend/src/services/corral.ts

export type Corral = {
  id: number
  numero: number
  capacidadMaxima: number
  tipoCorral: "ENGORDE" | "ENFERMA"
  idFeedlot: number
  idAlimentacion: number | null
  nombreAlimentacion?: string
}

export type Dieta = {
  id: number
  nombre: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

// 🔹 Obtener todos los corrales
export async function getCorrales(): Promise<Corral[]> {
  const res = await fetch(`${API_URL}/corrales`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al obtener corrales")
  return res.json()
}

// 🔹 Crear un corral
export async function createCorral(data: Omit<Corral, "id">) {
  const res = await fetch(`${API_URL}/corrales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al crear corral")
  return res.json()
}

// 🔹 Actualizar un corral
export async function updateCorral(id: number, data: Partial<Corral>) {
  const res = await fetch(`${API_URL}/corrales/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al actualizar corral")
  return res.json()
}

// 🔹 Eliminar un corral
export async function deleteCorral(id: number) {
  const res = await fetch(`${API_URL}/corrales/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Error al eliminar corral")
  return true
}

// 🔹 Obtener un corral por ID
export async function getCorralById(id: number): Promise<Corral> {
  const res = await fetch(`${API_URL}/corrales/${id}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al obtener corral")
  return res.json()
}

// 🔹 Contar bovinos en un corral
export async function getBovinosCountByCorral(idCorral: number): Promise<number> {
  const res = await fetch(`${API_URL}/api/bovinos?corralId=${idCorral}`, { cache: "no-store" })
  if (!res.ok) return 0
  const data = await res.json()
  return Array.isArray(data) ? data.length : 0
}

// 🔹 Obtener dietas (alimentaciones)
export async function getDietas(): Promise<Dieta[]> {
  const res = await fetch(`${API_URL}/alimentaciones`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al obtener dietas")
  const data = await res.json()
  // Mapear descripcion → nombre
  return data.map((d: any) => ({
    id: d.id,
    nombre: d.descripcion,
  }))
}