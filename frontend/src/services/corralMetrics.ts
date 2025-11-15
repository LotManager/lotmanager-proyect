const API_URL = process.env.NEXT_PUBLIC_API_URL

export type GmdResponse = {
  idCorral: number
  gmd: number
}

export type EficienciaResponse = {
  idCorral: number
  eficiencia: number
  pesoTotal: number
  consumoDiario: number
}

export async function getCorralGmd(id: number): Promise<GmdResponse> {
  const res = await fetch(`${API_URL}/api/corral-metrics/${id}/gmd`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al obtener GMD del corral")
  return res.json()
}

export async function getCorralEficiencia(id: number): Promise<EficienciaResponse> {
  const res = await fetch(`${API_URL}/api/corral-metrics/${id}/eficiencia`, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al obtener eficiencia del corral")
  return res.json()
}