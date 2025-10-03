
import { Enfermedad } from "../../domain/entities/Enfermedad";
import type { EnfermedadResponseDTO, EnfermedadDTOType } from "../dtos/enfermedad.dto";

export class EnfermedadMapper {
  static fromDTO(dto: EnfermedadDTOType): Enfermedad {
    return new Enfermedad(0, dto.nombre, dto.descripcion, dto.tipo);
  }

    static toResponseDTO(entidad: Enfermedad): EnfermedadResponseDTO {
    return {
        id: entidad.getId(),
        nombre: entidad.getNombre(),
        descripcion: entidad.getDescripcion(),
        tipo: entidad.getTipo()
        };
    }
}  