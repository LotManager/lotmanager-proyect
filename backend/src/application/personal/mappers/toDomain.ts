import { Personal } from "../../../domain/entities/Personal";
import { UserMapper } from "./userMapper";

export function toDomain(db: any): Personal {
  if (!db || !("id" in db) || !("nombre" in db) || !("apellido" in db)) {
    throw new Error("El objeto de la base de datos no tiene los campos necesarios");
  }

  const usuarioDb = db.usuario ? UserMapper.fromPrisma(db.usuario) : undefined;

  return new Personal(db.id, db.nombre, db.apellido, usuarioDb);
}