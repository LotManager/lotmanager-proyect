import { TipoCorral as PrismaTipoCorral } from "@prisma/client"
import { TipoCorral } from "../../domain/enums/TipoCorral"

/**
 * Convierte un enum de dominio a Prisma
 */
export function toPrismaTipoCorral(tipo: TipoCorral): PrismaTipoCorral {
  if (!Object.values(TipoCorral).includes(tipo)) {
    throw new Error(`TipoCorral inválido: ${tipo}`)
  }
  return tipo as PrismaTipoCorral
}

/**
 * Convierte un enum de Prisma a dominio
 */
export function fromPrismaTipoCorral(tipo: PrismaTipoCorral): TipoCorral {
  return tipo as TipoCorral
}