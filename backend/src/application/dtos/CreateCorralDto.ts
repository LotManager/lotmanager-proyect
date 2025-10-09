import { z } from "zod"
import { TipoCorral } from "../../domain/enums/TipoCorral"

export const CreateCorralDto = z.object({
  capacidadMaxima: z.number().int().positive(),
  numero: z.number().int().positive(),
  tipoCorral: z.enum(TipoCorral),
  idAlimentacion: z.number().int().positive().nullable(),
  idFeedlot: z.number().int().positive()
})

export type CreateCorralDtoType = z.infer<typeof CreateCorralDto>

export const UpdateCorralDto = CreateCorralDto.partial()
export type UpdateCorralDtoType = z.infer<typeof UpdateCorralDto>