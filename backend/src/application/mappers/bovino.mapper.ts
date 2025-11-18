// src/application/mappers/bovino.mapper.ts

import { Bovino } from "../../domain/entities/Bovino";
import { Bovino as PrismaBovinoModel } from "@prisma/client";

export class BovinoMapper {
  /**
   * Convierte un objeto de Prisma a una instancia de la entidad de dominio Bovino.
   */
  static toDomain(prismaBovino: PrismaBovinoModel): Bovino {
    return new Bovino(
      prismaBovino.id,
      prismaBovino.id_raza,
      prismaBovino.id_corral,
      prismaBovino.caravana,
      prismaBovino.estado_bovino,
      prismaBovino.estado_salud,
      prismaBovino.ingreso,
      prismaBovino.peso_ingreso,
      prismaBovino.sexo,
      prismaBovino.tipo_bovino,
      prismaBovino.egreso,
      prismaBovino.peso_egreso
    );
  }

  /**
   * Convierte un objeto parcial de la entidad de dominio al formato que Prisma espera para una actualización.
   */
  static fromDomainToUpdate(data: Partial<Omit<Bovino, "id">>) {
    const mappedData: any = {};
    if (data.idRaza !== undefined) mappedData.id_raza = data.idRaza;
    if (data.idCorral !== undefined) mappedData.id_corral = data.idCorral;
    if (data.caravana !== undefined) mappedData.caravana = data.caravana;
    if (data.estadoBovino !== undefined) mappedData.estado_bovino = data.estadoBovino;
    if (data.estadoSalud !== undefined) mappedData.estado_salud = data.estadoSalud;
    if (data.ingreso !== undefined) mappedData.ingreso = data.ingreso;
    if (data.pesoIngreso !== undefined) mappedData.peso_ingreso = data.pesoIngreso;
    if (data.sexo !== undefined) mappedData.sexo = data.sexo;
    if (data.tipoBovino !== undefined) mappedData.tipo_bovino = data.tipoBovino;
    if (data.egreso !== undefined) mappedData.egreso = data.egreso;
    if (data.pesoEgreso !== undefined) mappedData.peso_egreso = data.pesoEgreso;
    return mappedData;
  }
}