
import { TipoRol } from "@prisma/client";

export interface UsuarioPersisted {
  id: number;
  username: string;
  contrasena: string;
  personaId: number;
  rol: TipoRol;
}