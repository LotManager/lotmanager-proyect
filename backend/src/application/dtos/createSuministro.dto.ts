import { z } from "zod"

export const CreateSuministroDto = z.object({
  cantidad: z.number().positive(),
  id_alimentacion: z.number().int().positive(),
  id_alimento: z.number().int().positive()
})

export type CreateSuministroDtoType = z.infer<typeof CreateSuministroDto>