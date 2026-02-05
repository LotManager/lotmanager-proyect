import { UsuarioPersisted } from "./Usuariotypes";

export type PersonalPersisted = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  usuario: UsuarioPersisted | null;
};