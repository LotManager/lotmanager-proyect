import { CreateAlimentacionDTO, UpdateAlimentacionDTO } from "../dtos/alimentacion.dto";
import { Alimentacion } from "../../domain/entities/Alimentacion";
import { Corral } from "../../domain/entities/Corral";
import { Suministro } from "../../domain/entities/Suministro";

export function toPersistence(dto: CreateAlimentacionDTO | UpdateAlimentacionDTO): any {
  const payload: any = {};
  if ((dto as any).descripcion !== undefined) payload.descripcion = (dto as any).descripcion;
  if ((dto as any).nombre !== undefined) payload.nombre = (dto as any).nombre;

  // Mapear suministros para nested create en Prisma
  if ((dto as any).suministros !== undefined && Array.isArray((dto as any).suministros)) {
    const suministros = (dto as any).suministros.map((s: any) => ({
      cantidad: s.cantidad,
      // aceptar ambos estilos de clave si vienen camelCase/snake_case
      id_alimento: s.id_alimento ?? s.idAlimento ?? s.idAlimento,
    }));
    payload.suministros = { create: suministros };
  }

  // Nota: la relación con Corral es inversa (Corral tiene id_alimentacion).
  // Para asociar un corral existente, normalmente habría que actualizar el corral
  // en lugar de incluirlo aquí. Por eso no mapeamos idCorral aquí.

  return payload;
}

export function toDomain(db: any): Alimentacion {
  if (!db) throw new Error("Invalid database object");

  const id = db.id ?? db.ID;
  if (typeof id !== "number") throw new Error("Missing id in alimentacion DB object");

  // Extraer descripcion y nombre por separado (varios alias posibles)
  const descripcion = db.descripcion ?? db.description ?? db.name ?? (() => { throw new Error("Missing descripcion in alimentacion DB object"); })();
  const nombre = db.nombre ?? db.name ?? db.nombre ?? db.nombre ?? (() => { throw new Error("Missing nombre in alimentacion DB object"); })();

  // mapear corral: Prisma puede devolver un array `corral` (Corral[]). Tomamos el primero si existe.
  let corral: Corral | undefined = undefined;
  if (Array.isArray(db.corral) && db.corral.length > 0) {
    const c = db.corral[0];
    corral = new Corral(c.id, c.capacidad_maxima ?? c.capacidadMaxima, c.numero, c.tipo_corral ?? c.tipoCorral, c.id_alimentacion ?? c.idAlimentacion ?? null, c.id_feedlot ?? c.idFeedlot);
  }

  // mapear suministros (buscar por varios posibles nombres)
  const suministrosRaw = db.Suministro ?? db.suministros ?? db.suministro;
  let suministros: Suministro[] | undefined = undefined;
  if (Array.isArray(suministrosRaw) && suministrosRaw.length > 0) {
    suministros = suministrosRaw.map((s: any) => new Suministro(s.id, s.cantidad, s.id_alimentacion ?? s.idAlimentacion, s.id_alimento ?? s.idAlimento));
  }

  return new Alimentacion(id, descripcion, nombre, corral, suministros);
}

export function toResponse(alimentacion: Alimentacion): any {
  if (!alimentacion) return null;
  const base: any = {
    id: alimentacion.getId(),
    descripcion: alimentacion.getDescripcion(),
    nombre: alimentacion.getNombre(),
  };

  const c = alimentacion.getCorral();
  if (c) {
    base.corral = {
      id: c.id,
      capacidadMaxima: c.capacidadMaxima,
      numero: c.numero,
      tipoCorral: c.tipoCorral,
      idAlimentacion: c.idAlimentacion,
      idFeedlot: c.idFeedlot,
    };
  }

  const s = alimentacion.getSuministro();
  if (s) {
    base.suministros = s.map((su: Suministro) => ({
      id: su.id,
      cantidad: su.cantidad,
      idAlimentacion: su.idAlimentacion,
      idAlimento: su.idAlimento,
    }));
  }

  return base;
}

export default { toPersistence, toDomain, toResponse };
