import { TipoBovino as PrismaTipoBovino } from "@prisma/client";
import { TipoBovino as DomainTipoBovino } from "../../domain/entities/Bovino";

export function fromPrismaTipoBovino(e: PrismaTipoBovino): DomainTipoBovino {
  switch (e) {
    case "TERNERO":
      return DomainTipoBovino.TERNERO;
    case "NOVILLO":
      return DomainTipoBovino.NOVILLO;
    case "VAQUILLONA":
      return DomainTipoBovino.VAQUILLONA;
    case "DESCARTE":
      return DomainTipoBovino.TORO; // tu dominio no tiene DESCARTE
    default:
      throw new Error(`TipoBovino Prisma desconocido: ${e}`);
  }
}

export function toPrismaTipoBovino(e: DomainTipoBovino): PrismaTipoBovino {
  switch (e) {
    case DomainTipoBovino.TERNERO:
      return "TERNERO";
    case DomainTipoBovino.NOVILLO:
      return "NOVILLO";
    case DomainTipoBovino.VAQUILLONA:
      return "VAQUILLONA";
    case DomainTipoBovino.TORO:
      return "DESCARTE"; // mapeo aproximado
  }
}