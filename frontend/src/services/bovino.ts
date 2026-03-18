const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ------------------------------------------------------------------
// 1. TIPOS DE DATOS
// ------------------------------------------------------------------

// ✅ Tipo para la TABLA (Lectura)
// Coincide con lo que devuelve BovinoViewService.getBovinosForTable()
export type Bovino = {
  id: number;
  caravana: number;
  pesoActual: number;
  corralId: number;
  nombreCorral: string;
  gmd: number;
  estadoSalud: "SANO" | "ENFERMO" | "FALLECIDO"; 
};

// ✅ Tipo para CREAR (Escritura)
// Coincide con CreateBovinoDto del backend
export type CreateBovinoInput = {
  razaId: number;
  corralId: number;
  caravana: number;
  ingreso: string; // ISO Date string
  pesoIngreso: number;
  sexo: "MACHO" | "HEMBRA";
  tipoBovino: "TERNERO" | "NOVILLO" | "VAQUILLONA" | "DESCARTE";
  // Opcionales con valores por defecto en backend
  situacionBovino?: "ENCORRAL" | "EGRESADA";
  estadoSalud?: "SANO" | "ENFERMO" | "FALLECIDO";
  egreso?: string | null;
  pesoEgreso?: number | null;
};

// ✅ Tipo para EDITAR
export type UpdateBovinoInput = Partial<CreateBovinoInput>;

// ------------------------------------------------------------------
// 2. FUNCIONES (API CALLS)
// ------------------------------------------------------------------

export async function getBovinos(): Promise<Bovino[]> {
  const res = await fetch(`${API_URL}/api/bovinos`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener los datos de los bovinos");
  return res.json();
}

export async function createBovino(data: CreateBovinoInput) {
  const res = await fetch(`${API_URL}/api/bovinos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    // Intentamos leer el mensaje de error del backend
    const errorData = await res.json().catch(() => ({}));
    // Si es un array de errores de Zod, los unimos, sino usamos el mensaje genérico
    const message = Array.isArray(errorData.error) 
      ? errorData.error.map((e: {message?: string}) => e.message).join(", ")
      : errorData.message || "Error al crear bovino";
      
    throw new Error(message);
  }
  return res.json();
}

export async function updateBovino(id: number, data: UpdateBovinoInput) {
  const res = await fetch(`${API_URL}/api/bovinos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar bovino");
  return res.json();
}

export async function deleteBovino(id: number) {
  const res = await fetch(`${API_URL}/api/bovinos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar bovino");
  return true;
}