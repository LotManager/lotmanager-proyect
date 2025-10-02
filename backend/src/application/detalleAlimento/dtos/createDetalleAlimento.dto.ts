import { z } from "zod"

export const CreateSuministroDto = z.object({
  cantidad: z.number().positive(),
  idAlimentacion: z.number().int().positive(),
  idAlimento: z.number().int().positive()
})

export type CreateSuministroDtoType = z.infer<typeof CreateSuministroDto>