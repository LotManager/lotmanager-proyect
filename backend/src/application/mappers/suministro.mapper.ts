import { Suministro } from "domain/entities/Suministro";
import type { CreateSuministroSchema, SuministroResponseSchema} from "../dtos/suministro.dto";

export class SuministroMapper {
    static fromDTO(dto: CreateSuministroSchema): Suministro {
        return new Suministro(0, new Date(dto.fecha), dto.cantidadKg, dto.dietaId, dto.corralId);
    }
    static toDTO(entity: Suministro): SuministroResponseSchema {
        return {
            id: entity.getId(),
            fecha: entity.getFecha().toISOString(),
            cantidadKg: entity.getCantidadKg(),
            dietaId: entity.getDietaId(),
            corralId: entity.getCorralId()
        };
    }
}
