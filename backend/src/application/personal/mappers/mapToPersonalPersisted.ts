import { PersonalPersisted } from "../types/Personaltypes";
import { Rol } from "../../../domain/value-objects/Rol";


export function mapToPersonalPersisted(db: any): PersonalPersisted {
  const usuario = db.usuario
    ? {
        id: db.usuario.id,
        nombre: db.usuario.usuario,
        rol: new Rol(db.usuario.rol.id, db.usuario.rol.nombre)
      }
    : undefined;

  return {
    id: db.id,
    nombre: db.nombre,
    apellido: db.apellido,
    id_usuario: db.id_usuario,
    usuario
  } as PersonalPersisted;
}
