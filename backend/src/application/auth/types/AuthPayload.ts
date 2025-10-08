
export interface AuthPayload {
  id: number;
  usuario: string;
  rol: {
    id: number;
    nombre: "admin" | "encargado";
  }
}