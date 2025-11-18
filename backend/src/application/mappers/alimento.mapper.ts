import { Alimento } from "../../domain/entities/Alimento";
import type { AlimentoResponseDto, CreateAlimentoDto } from "../dtos/alimento.dto";
import { $Enums } from "@prisma/client";

export class AlimentoMapper {
    static fromDTO(dto: CreateAlimentoDto): Alimento {
        return new Alimento(0, dto.nombre, dto.tipo as $Enums.TipoAlimento);
    }
    static toResponseDTO(alimento: Alimento): AlimentoResponseDto {
        return {
            id: alimento.getId(),
            nombre: alimento.getNombre(),
            tipo: String(alimento.getTipo() as $Enums.TipoAlimento),
        };
    }
}   