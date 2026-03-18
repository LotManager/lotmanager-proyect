import { z } from "zod"

export const bovinoSchema = z.object({
    caravana: z
        .coerce.number()
        .int("La caravana debe ser un número entero")
        .positive("La caravana debe ser mayor a 0"),

    razaId: z
        .coerce.number()
        .int()
        .positive("Seleccioná una raza"),

    corralId: z
        .coerce.number()
        .int()
        .positive("Seleccioná un corral"),

    pesoIngreso: z
        .coerce.number()
        .positive("El peso debe ser mayor a 0")
        .max(2000, "El peso no puede superar 2000 kg"),

    ingreso: z
        .string()
        .min(1, "La fecha de ingreso es requerida"),

    sexo: z.enum(["MACHO", "HEMBRA"] as const).describe("Seleccioná el sexo"),

    tipoBovino: z.enum(["TERNERO", "NOVILLO", "VAQUILLONA", "DESCARTE"] as const).describe("Seleccioná una categoría"),

    situacionBovino: z.enum(["ENCORRAL", "EGRESADA"]).optional(),
    estadoSalud: z.enum(["SANO", "ENFERMO", "FALLECIDO"]).optional(),
    egreso: z.string().nullable().optional(),
    pesoEgreso: z.number().nullable().optional(),
    })

export type BovinoFormValues = z.infer<typeof bovinoSchema>
