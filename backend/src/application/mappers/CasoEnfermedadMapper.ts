// src/application/mappers/CasoEnfermedadMapper.ts
import { CasoEnfermedad } from "../../domain/entities/CasoEnfermedad";
import type {
  CasoEnfermedadDTOType,
  CasoEnfermedadResponseDTOType,
} from "../dtos/casoEnfermedad.dto";

export class CasoEnfermedadMapper {
  static fromCreateDTO(dto: CasoEnfermedadDTOType): CasoEnfermedad {
    return new CasoEnfermedad(
      0,
      dto.bovinoId,
      dto.enfermedadId,
      dto.tratamientoId,
      dto.fechaDeteccion,
      dto.fechaAlta
    );
  }

  static fromPersisted(dto: CasoEnfermedadResponseDTOType): CasoEnfermedad {
    return new CasoEnfermedad(
      dto.id,
      dto.bovinoId,
      dto.enfermedadId,
      dto.tratamientoId,
      dto.fechaDeteccion,
      dto.fechaAlta
    );
  }

  static toResponseDTO(entidad: CasoEnfermedad): CasoEnfermedadResponseDTOType {
    return {
      id: entidad.getId(),
      bovinoId: entidad.getBovinoId(),
      enfermedadId: entidad.getEnfermedadId(),
      tratamientoId: entidad.getTratamientoId(),
      fechaDeteccion: entidad.getFechaDeteccion(),
      fechaAlta: entidad.getFechaAlta(),
    };
  }

  static toCreateDTO(entidad: CasoEnfermedad): CasoEnfermedadDTOType {
    return {
      bovinoId: entidad.getBovinoId(),
      enfermedadId: entidad.getEnfermedadId(),
      tratamientoId: entidad.getTratamientoId(),
      fechaDeteccion: entidad.getFechaDeteccion(),
      fechaAlta: entidad.getFechaAlta(),
    };
  }
}