import { Personal } from "../../domain/entities/Personal";

export function toPersistence(personal: Personal): any {
  return {
    nombre: personal.getNombre(),
    apellido: personal.getApellido(),
    id_usuario: personal.hasUsuario() ? personal.getUsuario()!.getId() : null
  };
}
