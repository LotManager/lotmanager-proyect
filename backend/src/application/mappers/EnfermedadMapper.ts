
import { Enfermedad } from "../../domain/entities/Enfermedad";
import type { EnfermedadResponseDTO, EnfermedadDTOType, EnfermedadResponseDTOExtendido } from "../dtos/enfermedad.dto";

export class EnfermedadMapper {
  static fromResponseDTO(dto: EnfermedadDTOType): Enfermedad {
    return new Enfermedad(0, dto.nombre, dto.descripcion, dto.tipo);
  }

  static fromPersisted(dto: EnfermedadResponseDTO): Enfermedad {
   return new Enfermedad(dto.id, dto.nombre, dto.descripcion, dto.tipo);
  }
  
  static toResponseDTO(entidad: Enfermedad): EnfermedadResponseDTO {
    return {
        id: entidad.getId(),
        nombre: entidad.getNombre(),
        descripcion: entidad.getDescripcion(),
        tipo: entidad.getTipo()
        };
    }
  
   
  static toCreateDTO(entidad: Enfermedad): EnfermedadDTOType {
    return {
      nombre: entidad.getNombre(),
      descripcion: entidad.getDescripcion(),
      tipo: entidad.getTipo(),
    };
  }

  static toExtendedResponseDTO(entidad: Enfermedad): EnfermedadResponseDTOExtendido {
  return {
    id: entidad.getId(),
    nombre: entidad.getNombre(),
    descripcion: entidad.getDescripcion(),
    tipo: entidad.getTipo(),
    tratamientos: entidad.getTratamientos().map(t => ({
      nombre: t.nombre
    }))
  };
}
}  