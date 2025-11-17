import { Alimento } from "domain/entities/Alimento";
import type { AlimentoResponseSchema, AlimentoWithDetallesResponseSchema, CreateAlimentoSchema } from "../dtos/alimento.dto";

export class AlimentoMapper {
    static fromDTO(dto: CreateAlimentoSchema): Alimento {
        return new Alimento(0, dto.nombre, dto.tipo, []);
    }
    static toResponseDTO(alimento: Alimento): AlimentoResponseSchema {
        return {
            id: alimento.getId(),
            nombre: alimento.getNombre(),
            tipo: String(alimento.getTipo()),
        };
    }
    static toResponseWithDetallesDTO(alimento: Alimento): AlimentoWithDetallesResponseSchema {
        return {
            id: alimento.getId(),
            nombre: alimento.getNombre(),
            tipo: String(alimento.getTipo()),
            detalles: alimento.getDetalleDieta().map(detalle => ({
                proporcionKg: detalle.getProporcionKg(),
                dietaId: detalle.getDietaId(),
            })),
        };
    }
}   