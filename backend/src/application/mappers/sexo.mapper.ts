import { Sexo as PrismaSexo } from "@prisma/client";
import { Sexo as DomainSexo } from "../../domain/entities/Bovino";

export function fromPrismaSexo(e: PrismaSexo): DomainSexo {
  return e === "MACHO" ? DomainSexo.MACHO : DomainSexo.HEMBRA;
}

export function toPrismaSexo(e: DomainSexo): PrismaSexo {
  return e === DomainSexo.MACHO ? "MACHO" : "HEMBRA";
}