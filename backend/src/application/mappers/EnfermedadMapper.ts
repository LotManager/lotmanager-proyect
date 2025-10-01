
import { EnfermedadPersisted } from "application/schemas/EnfermedadPersisted";
import { Enfermedad } from "../../domain/entities/Enfermedad";
import { EnfermedadDTOType } from "../dtos/enfermedad.dto";

export class EnfermedadMapper {
  static fromDTO(dto: EnfermedadDTOType): Enfermedad {
    return new Enfermedad(dto.id, dto.nombre, dto.descripcion, dto.tipo);
  }
  
  static fromPersisted(data: EnfermedadPersisted): Enfermedad {
    return new Enfermedad(data.id, data.nombre, data.descripcion, data.tipo);
  }
  static toPersisted(entidad: Enfermedad): EnfermedadPersisted {
    return {
      id: entidad.getId(),
      nombre: entidad.getNombre(),
      descripcion: entidad.getDescripcion(),
      tipo: entidad.getTipo()
    };
  }

    static toDTO(entidad: Enfermedad): EnfermedadDTOType {
    return {
        id: entidad.getId(),
        nombre: entidad.getNombre(),
        descripcion: entidad.getDescripcion(),
        tipo: entidad.getTipo()
        };
    }
}  