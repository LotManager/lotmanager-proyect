import z from "zod";

export const CreateDietaSchema = z.object({
    nombre: z.string().min(1).max(100),
    descripcion: z.string().min(1).max(500),
    detalles: z.array(z.object({
        proporcionKg: z.number().positive("La proporción debe ser un número positivo"),
        alimentoId: z.number().positive("El ID del alimento debe ser un número positivo"),
    })),
});

export const UpdateDietaSchema = CreateDietaSchema.partial();
export const IdParamSchema = z.object({ id: z.string().min(1) });

export const DietaResponseSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    descripcion: z.string(),
});
export const DietaWithDetallesResponseSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    descripcion: z.string(),
    detalles: z.array(z.object({
        proporcionKg: z.number(),
        alimentoId: z.number(),
    }))
});

export type CreateDietaDto = z.infer<typeof CreateDietaSchema>;
export type UpdateDietaDto = z.infer<typeof UpdateDietaSchema>;
export type DietaResponseDto = z.infer<typeof DietaResponseSchema>;
export type DietaWithDetallesResponseDto = z.infer<typeof DietaWithDetallesResponseSchema>;
export type IdParam = z.infer<typeof IdParamSchema>;