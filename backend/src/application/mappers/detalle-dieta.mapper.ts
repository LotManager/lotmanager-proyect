import { DetalleDieta } from "domain/entities/DetalleDieta";
import type { CreateDetalleDietaDto, DetalleDietaResponseDto } from "../dtos/detalle-dieta.dto";

export class DetalleDietaMapper {
    static fromDTO(dto: CreateDetalleDietaDto, dietaId: number): DetalleDieta {
        return new DetalleDieta(dietaId, dto.alimentoId, dto.proporcionKg);
    }
    static toDTO(entity: DetalleDieta): DetalleDietaResponseDto {
        return {
            proporcionKg: entity.getProporcionKg(),
            alimentoId:  entity.getAlimentoId(),
            dietaId: entity.getDietaId(),
        };
    }
}