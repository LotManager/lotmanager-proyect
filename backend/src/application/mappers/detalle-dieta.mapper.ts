import { DetalleDieta } from "domain/entities/DetalleDieta";
import type { CreateDetalleDietaDto, DetalleDietaResponseDto } from "../dtos/detalle-dieta.dto";

export class DetalleDietaMapper {
    static fromDTO(dto: CreateDetalleDietaDto): DetalleDieta {
        return new DetalleDieta(dto.dietaId, dto.alimentoId, dto.proporcionKg);
    }
    static toDTO(entity: DetalleDieta): DetalleDietaResponseDto {
        return {
            proporcionKg: entity.getProporcionKg(),
            alimentoId:  entity.getAlimentoId(),
            dietaId: entity.getDietaId(),
        };
    }
}