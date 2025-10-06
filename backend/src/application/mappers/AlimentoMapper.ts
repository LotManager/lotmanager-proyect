import { CreateAlimentoDTO, UpdateAlimentoDTO } from "../dtos/alimento.dto";
import { Alimento } from "../../domain/entities/Alimento";

/**
 * Convierte un DTO de entrada a la forma esperada por la capa de persistencia.
 * Sigue la convención usada en otros mappers: nombres de columnas en snake_case
 * cuando se dirige a la base de datos (por ejemplo: id_localidad en Feedlot).
 */
export function toPersistence(dto: CreateAlimentoDTO | UpdateAlimentoDTO): any {
  const payload: any = {};
  if ("nroSerie" in dto && dto.nroSerie !== undefined) payload.nro_serie = dto.nroSerie;
  if ("vencimiento" in dto && dto.vencimiento !== undefined) payload.vencimiento = dto.vencimiento;
  // Si en el futuro se añaden relaciones (detalleAlimento, suministros) mapear aquí.
  return payload;
}

/**
 * Convierte el objeto devuelto por la base de datos a la representación de dominio.
 * Alineado con implementaciones similares en el repo (Feedlot, Personal).
 */
export function toDomain(db: any): Alimento {
  if (!db) throw new Error("Invalid database object");
  // Esperamos que la base devuelva campos: id, nro_serie o nroSerie, vencimiento
  const id = db.id ?? db.ID ?? (() => { throw new Error("Missing id in alimento DB object"); })();
  const nroSerie = db.nro_serie ?? db.nroSerie ?? (() => { throw new Error("Missing nroSerie in alimento DB object"); })();
  if (db.vencimiento == null) {
    throw new Error("Missing vencimiento in alimento DB object");
  }
  const vencimiento = new Date(db.vencimiento);

  return new Alimento(id, nroSerie, vencimiento);
}

export default { toPersistence, toDomain };
