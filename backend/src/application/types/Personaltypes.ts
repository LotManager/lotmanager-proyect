
import { UsuarioPersisted } from "../types/Usuariotypes"; // o donde tengas definido UsuarioPersisted

export interface PersonalPersisted {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  id_usuario: number | null;
  usuario: UsuarioPersisted | null;
}