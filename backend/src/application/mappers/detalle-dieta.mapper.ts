import { DetalleDieta } from "domain/entities/DetalleDieta";
import type { CreateDetalleDietaSchema, DetalleDietaResponseSchema } from "../dtos/detalle-dieta.dto";

export class DetalleDietaMapper {
    static fromDTO(dto: CreateDetalleDietaSchema): DetalleDieta {
        return new DetalleDieta(dto.dietaId, dto.alimentoId, dto.proporcionKg);
    }
    static toDTO(entity: DetalleDieta): DetalleDietaResponseSchema {
        return {
            proporcionKg: entity.getProporcionKg(),
            alimentoId:  entity.getAlimentoId(),
            dietaId: entity.getDietaId(),
        };
    }
}