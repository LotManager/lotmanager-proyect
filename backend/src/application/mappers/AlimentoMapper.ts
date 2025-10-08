import { CreateAlimentoDTO, UpdateAlimentoDTO } from "../dtos/alimento.dto";
import { Alimento } from "../../domain/entities/Alimento";
import { DetalleAlimento } from "../../domain/entities/DetalleAlimento";
import { Suministro } from "../../domain/entities/Suministro";

export function toPersistence(dto: CreateAlimentoDTO | UpdateAlimentoDTO): any {
  const payload: any = {};
  if (dto.nroSerie !== undefined) payload.nro_serie = dto.nroSerie;
  if (dto.vencimiento !== undefined) payload.vencimiento = dto.vencimiento;

  if ((dto as any).idDetalleAlimento !== undefined) {
    payload.id_detalle_alimento = (dto as any).idDetalleAlimento;
  }


  if (Array.isArray((dto as any).suministros)) {
    const suministros = (dto as any).suministros.map((s: any) => ({
      cantidad: s.cantidad,
      
      id_alimentacion: s.id_alimentacion ?? s.idAlimentacion ?? s.idAlimentacion,
      id_alimento: s.id_alimento ?? s.idAlimento ?? s.idAlimento,
    }));
    payload.suministros = { create: suministros };
  }
  return payload;
}

export function toDomain(db: any): Alimento {
  if (!db) throw new Error("Invalid database object");

  const id = typeof db.id === "number" ? db.id : (typeof db.ID === "number" ? db.ID : undefined);
  if (id === undefined) throw new Error("Missing id in alimento DB object");
  const nroSerieRaw = db.nro_serie ?? db.nroSerie ?? db.nro ?? undefined;
  if (nroSerieRaw === undefined || nroSerieRaw === null) throw new Error("Missing nroSerie in alimento DB object");
  const nroSerieNum = Number(nroSerieRaw);
  if (!Number.isFinite(nroSerieNum) || !Number.isInteger(nroSerieNum)) throw new Error("Invalid nroSerie in alimento DB object: must be an integer number");
  const nroSerie = nroSerieNum;

  if (db.vencimiento == null) throw new Error("Missing vencimiento in alimento DB object");
  const vencimiento = new Date(db.vencimiento);

  // mapear detalleAlimento: Prisma define `detallealimento` como array. Aquí tomamos el primero si existe.
  let detalle: DetalleAlimento | undefined = undefined;
  if (Array.isArray(db.detallealimento) && db.detallealimento.length > 0) {
    const d = db.detallealimento[0];
    detalle = new DetalleAlimento(d.id, d.nombre, d.tipo, d.id_alimento);
  }


  let suministros: Suministro[] | undefined = undefined;
  const suministrosRaw = db.Suministro ?? db.suministros ?? db.suministro;
  if (Array.isArray(suministrosRaw) && suministrosRaw.length > 0) {
    suministros = suministrosRaw.map((s: any) => new Suministro(s.id, s.cantidad, s.id_alimentacion, s.id_alimento));
  }

  return new Alimento(id, nroSerie, vencimiento, detalle, suministros);
}

export function toResponse(alimento: Alimento): any {

  if (!alimento) return null;
  const base = {
    id: alimento.getId(),
    nroSerie: alimento.getNroSerie(),
    vencimiento: alimento.getVencimiento(),
  } as any;
  const detalle = alimento.getDetalleAlimento();
  if (detalle) {
    base.detalleAlimento = {
      id: detalle.id,
      nombre: (detalle as any).nombre,
      tipo: (detalle as any).tipo,
      idAlimento: (detalle as any).idAlimento,
    };
  }

  const s = alimento.getSuministro();
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
