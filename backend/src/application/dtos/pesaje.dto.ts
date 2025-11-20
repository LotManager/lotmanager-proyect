import { z } from "zod";

export const CreatePesajeDto = z.object({
  bovinoId: z.number().positive(),
  pesoActual: z.number().positive(),
  fecha: z.string().datetime().optional(),
});

export type CreatePesajeDtoType = z.infer<typeof CreatePesajeDto>;