// src/services/bovino.ts

// NOTA: Este tipo debe coincidir con lo que devuelve tu API.
// Lo ideal es que la API ya devuelva campos calculados como 'pesoActual' y 'edad'.
export type Bovino = {
  id: number;
  caravana: number; // Este es el ID visible para el usuario
  pesoActual: number;
  edad: number; // en meses
  nombreCorral: string;
  gmd: number; // Ganancia Media Diaria
  estado_salud: "SANO" | "ENFERMO" | "FALLECIDO";
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBovinos(): Promise<Bovino[]> {
  try {
    const res = await fetch(`${API_URL}/api/bovinos`); // Asegúrate de que la ruta sea correcta
    if (!res.ok) {
      throw new Error("Error al obtener los datos de los bovinos");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return []; // Devuelve un array vacío en caso de error para no romper la UI
  }
}

// Aquí agregaremos luego las funciones para crear, editar y eliminar bovinos.