import { api } from "./api";

export type Enfermedad = { id: number; nombre: string; tipo: string };
export type Tratamiento = { id: number; nombre: string; descripcion: string; unidad: string };

export type CasoEnfermedad = {
  id: number;
  fechaDeteccion: string;
  bovino: { id: number; caravana: number }; // Datos mínimos
  enfermedad: Enfermedad;
  tratamiento: Tratamiento;
};

export type CreateCasoInput = {
  bovinoId: number;
  enfermedadId: number;
  tratamientoId: number;
  fechaDeteccion?: string;
};

export async function getSanidadAuxiliares() {
  return api<{ enfermedades: Enfermedad[], tratamientos: Tratamiento[] }>("/api/sanidad/auxiliares");
}

export async function getCasosActivos(): Promise<CasoEnfermedad[]> {
    return api("/api/sanidad/activos");
}

export async function registrarCaso(data: CreateCasoInput) {
  return api("/api/sanidad/casos", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function darAltaCaso(idCaso: number) {
  return api(`/api/sanidad/casos/${idCaso}/alta`, {
    method: "PUT",
  });
}

export type CreateEnfermedadInput = {
  nombre: string;
  tipo: string; // "RESPIRATORIA", "DIGESTIVA", etc.
  descripcion?: string;
};

export async function createEnfermedad(data: CreateEnfermedadInput) {
  return api("/api/sanidad/enfermedades", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteEnfermedad(id: number) {
  return api(`/api/sanidad/enfermedades/${id}`, { method: "DELETE" });
}

// --- ABM TRATAMIENTOS ---
export type CreateTratamientoInput = {
  nombre: string;
  unidad: string; // "ML", "MG", etc.
  descripcion?: string;
};

export async function createTratamiento(data: CreateTratamientoInput) {
  return api("/api/sanidad/tratamientos", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteTratamiento(id: number) {
  return api(`/api/sanidad/tratamientos/${id}`, { method: "DELETE" });
}