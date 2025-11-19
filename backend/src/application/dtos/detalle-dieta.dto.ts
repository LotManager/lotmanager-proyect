import z from "zod";

export const CreateDetalleDietaSchema = z.object({
  proporcionKg: z.number().positive("La proporción debe ser un número positivo"),
  alimentoId: z.number().positive("El ID del alimento debe ser un número positivo"),
  dietaId: z.number().positive("El ID de la dieta debe ser un número positivo"),
});

// Para update (todos opcionales)
export const UpdateDetalleDietaSchema = CreateDetalleDietaSchema.partial();

export const DetalleDietaResponseSchema = z.object({
  proporcionKg: z.number(),
  alimentoId: z.number(),
  dietaId: z.number(),
});

export type CreateDetalleDietaDto = z.infer<typeof CreateDetalleDietaSchema>;
export type UpdateDetalleDietaDto = z.infer<typeof UpdateDetalleDietaSchema>;
export type DetalleDietaResponseDto = z.infer<typeof DetalleDietaResponseSchema>;