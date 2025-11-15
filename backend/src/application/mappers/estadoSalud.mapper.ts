import { EstadoSalud as PrismaEstadoSalud } from "@prisma/client";
import { EstadoSalud as DomainEstadoSalud } from "../../domain/entities/Bovino";

export function fromPrismaEstadoSalud(e: PrismaEstadoSalud): DomainEstadoSalud {
  switch (e) {
    case "SANO":
      return DomainEstadoSalud.SANO;
    case "ENFERMO":
      return DomainEstadoSalud.ENFERMO;
    case "FALLECIDO":
      return DomainEstadoSalud.RECUPERADO; // mapeo aproximado
    default:
      throw new Error(`EstadoSalud Prisma desconocido: ${e}`);
  }
}

export function toPrismaEstadoSalud(e: DomainEstadoSalud): PrismaEstadoSalud {
  switch (e) {
    case DomainEstadoSalud.SANO:
      return "SANO";
    case DomainEstadoSalud.ENFERMO:
      return "ENFERMO";
    case DomainEstadoSalud.RECUPERADO:
      return "FALLECIDO"; // ojo: tu dominio no tiene "FALLECIDO"
  }
}