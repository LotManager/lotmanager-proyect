import { Dieta } from "../../domain/entities/Dieta";
import type { CreateDietaDto, DietaResponseDto, DietaWithDetallesResponseDto, UpdateDietaDto } from "../dtos/dieta.dto";

export class DietaMapper {
    static fromDTO(dto: CreateDietaDto): Dieta {
        return new Dieta(0, dto.nombre, dto.descripcion, []);
    }

    static toResponseDTO(dieta: Dieta): DietaResponseDto {
        return {
            id: dieta.getId(),
            nombre: dieta.getNombre(),
            descripcion: dieta.getDescripcion(),
        };
    }
    static toResponseWithDetallesDTO(dieta: Dieta): DietaWithDetallesResponseDto {
        return {
            id: dieta.getId(),
            nombre: dieta.getNombre(),
            descripcion: dieta.getDescripcion(),
            detalles: dieta.getDetalles().map(detalle => ({
                proporcionKg: detalle.getProporcionKg(),
                alimentoId: detalle.getAlimentoId(),
            })),
        };
    }
}