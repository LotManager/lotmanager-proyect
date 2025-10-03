import { Rol } from "../../../domain/value-objects/Rol";

export interface PersonalPersisted {
  id: number;
  nombre: string;
  apellido: string;
  id_usuario: number | null;
  usuario?: UsuarioPersisted;
}

export interface PersonalCreateInput {
  nombre: string;
  apellido: string;
  id_usuario?: number;
}

export interface UsuarioPersisted {
  id: number;
  nombre: string;
  rol: Rol;
}