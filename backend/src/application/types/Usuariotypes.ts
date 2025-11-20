export type UsuarioPersisted = {
  id: number;
  username: string;
  contrasena: string;
  personaId: number | null;
  id_rol: number; 
};