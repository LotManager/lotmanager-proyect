import { z } from "zod"

export const CreateDetalleAlimentoDto = z.object({
  nombre: z.string().min(1),
  tipo: z.string().min(1),
  id_alimento: z.number().int().positive()
})

export type CreateDetalleAlimentoDtoType = z.infer<typeof CreateDetalleAlimentoDto>