import { Personal } from "../../../domain/entities/Personal";



export function toDomain(db: any): Personal {
    if (!db) throw new Error("Invalid database object");
    if (!("id" in db) || !("nombre" in db) || !("apellido" in db)) {
        throw new Error("El objeto de la base de datos no tiene los campos necesarios");
    }
  return {
    id: db.id,
    nombre: db.nombre,
    apellido: db.apellido,
    ...(db.usuario && {
      usuario: {
        id: db.usuario.id,
        nombre: db.usuario.nombre,
        rol: db.usuario.rol,
      }
    }),
  };
}