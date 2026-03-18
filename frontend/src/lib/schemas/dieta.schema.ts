import { z } from "zod"

const detalleSchema = z.object({
    alimentoId: z.coerce.number().int().positive("Debe ser un número válido"),
    proporcionKg: z.coerce.number().positive("Debe ser mayor a 0").max(10000, "No puede superar 10.000"),
})

export const dietaSchema = z.object({
    nombre: z
        .string()
        .min(1, "El nombre es requerido")
        .max(100, "El nombre no puede superar 100 caracteres"),

    descripcion: z
        .string()
        .max(500, "La descripción no puede superar 500 caracteres")
        .optional(),

    detalles: z
        .array(detalleSchema)
        .min(1, "La dieta debe tener al menos un ingrediente")
        .refine(
            (detalles) => {
                const ids = detalles.map((d) => d.alimentoId)
                return new Set(ids).size === ids.length
            },
            { message: "No podés agregar el mismo ingrediente dos veces" }
        ),
})

export type DietaFormValues = z.infer<typeof dietaSchema>
