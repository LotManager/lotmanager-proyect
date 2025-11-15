import { EstadoBovino as PrismaEstadoBovino } from "@prisma/client";
import { EstadoBovino as DomainEstadoBovino } from "../../domain/entities/Bovino";

export function fromPrismaEstadoBovino(e: PrismaEstadoBovino): DomainEstadoBovino {
  switch (e) {
    case "ENCORRAL": // Prisma
      return DomainEstadoBovino.ENGORDE; // Dominio
    case "ENFERMA":
      return DomainEstadoBovino.ENGORDE_FINAL;
    case "EGRESADA":
      return DomainEstadoBovino.EGRESADO;
    default:
      throw new Error(`EstadoBovino Prisma desconocido: ${e}`);
  }
}

export function toPrismaEstadoBovino(e: DomainEstadoBovino): PrismaEstadoBovino {
  switch (e) {
    case DomainEstadoBovino.ENGORDE:
      return "ENCORRAL";
    case DomainEstadoBovino.ENGORDE_FINAL:
      return "ENFERMA";
    case DomainEstadoBovino.EGRESADO:
      return "EGRESADA";
  }
}