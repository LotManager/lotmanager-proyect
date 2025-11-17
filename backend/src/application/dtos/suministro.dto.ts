import z from "zod";

export const CreateSuministroSchema = z.object({
    id: z.number(),
    fecha: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "La fecha debe tener un formato válido",
    }),
    cantidadKg: z.number().positive("La cantidad en kg debe ser un número positivo"),
    dietaId: z.number().positive("El ID de la dieta debe ser un número positivo"),
    corralId: z.number().positive("El ID del corral debe ser un número positivo"),
});

export const UpdateSuministroSchema = CreateSuministroSchema.partial();
export const IdParamSchema = z.object({ id: z.string().min(1) });

export const SuministroResponseSchema = z.object({
    id: z.number(),
    fecha: z.string(),
    cantidadKg: z.number(),
    dietaId: z.number(),
    corralId: z.number(),
});

export type CreateSuministroSchema = z.infer<typeof CreateSuministroSchema>;
export type UpdateSuministroSchema = z.infer<typeof UpdateSuministroSchema>;
export type SuministroResponseSchema = z.infer<typeof SuministroResponseSchema>;
export type IdParam = z.infer<typeof IdParamSchema>;