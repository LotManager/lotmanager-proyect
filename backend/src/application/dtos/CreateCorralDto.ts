import { z } from "zod";
import { TipoCorral } from "../../domain/enums/TipoCorral";

// DTO para CREAR (todos los campos son requeridos)
export const CreateCorralDto = z.object({
  capacidadMaxima: z.number().int().positive(),
  numero: z.number().int().positive(),
  tipoCorral: z.nativeEnum(TipoCorral),
  idAlimentacion: z.number().int().positive().nullable(),
  idFeedlot: z.number().int().positive()
});

// ✅ DTO para ACTUALIZAR (todos los campos son opcionales)
export const UpdateCorralDto = CreateCorralDto.partial();


// --- Exportación de Tipos ---

// Tipo para la creación
export type CreateCorralDtoType = z.infer<typeof CreateCorralDto>;

// ✅ Tipo para la actualización
export type UpdateCorralDtoType = z.infer<typeof UpdateCorralDto>;