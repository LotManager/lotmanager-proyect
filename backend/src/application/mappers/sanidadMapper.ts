import { CasoEnfermedad } from "../../domain/entities/Sanidad";
import {
  CasoEnfermedadDTOType,
  CasoEnfermedadResponseDTOType,
} from "../../application/dtos/sanidad.dto";
import { Prisma } from "@prisma/client";

export class CasoEnfermedadMapper {
  // DTO → Entidad
  static fromCreateDTO(dto: CasoEnfermedadDTOType): CasoEnfermedad {
    return new CasoEnfermedad(
      0,
      dto.fechaDeteccion,
      dto.fechaAlta,
      dto.enfermedadId,
      dto.tratamientoId,
      dto.bovinoId
    );
  }

  // Prisma → Entidad
  static toDomain(prisma: Prisma.CasoEnfermedadGetPayload<{}>): CasoEnfermedad {
    return new CasoEnfermedad(
      prisma.id,
      prisma.fechaDeteccion,
      prisma.fechaAlta ?? undefined,
      prisma.enfermedadId,
      prisma.tratamientoId,
      prisma.bovinoId
    );
  }

  // Entidad → Prisma
  static toPrisma(entity: CasoEnfermedad): Prisma.CasoEnfermedadCreateInput {
    return {
      fechaDeteccion: entity.getFechaDeteccion(),
      fechaAlta: entity.getFechaAlta() ?? null,
      enfermedad: { connect: { id: entity.getEnfermedadId()! } },
      tratamiento: { connect: { id: entity.getTratamientoId()! } },
      bovino: { connect: { id: entity.getBovinoId()! } },
    };
  }

  // Prisma → ResponseDTO
  static toResponseDTO(prisma: Prisma.CasoEnfermedadGetPayload<{
    include: { enfermedad: true; tratamiento: true; bovino: true };
  }>): CasoEnfermedadResponseDTOType {
    return {
      id: prisma.id,
      fechaDeteccion: prisma.fechaDeteccion,
      fechaAlta: prisma.fechaAlta ?? undefined,
      bovino: {
        id: prisma.bovino.id,
        caravana: prisma.bovino.caravana.toString(),
      },
      enfermedad: {
        id: prisma.enfermedad.id,
        nombre: prisma.enfermedad.nombre,
      },
      tratamiento: {
        id: prisma.tratamiento.id,
        nombre: prisma.tratamiento.nombre,
      },
    };
  }
}