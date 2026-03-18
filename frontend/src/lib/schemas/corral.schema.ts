import { z } from "zod"

export const corralSchema = z.object({
    numero: z
        .coerce.number()
        .int("El número debe ser entero")
        .positive("El número debe ser mayor a 0"),

    capacidadMaxima: z
        .coerce.number()
        .int("La capacidad debe ser un número entero")
        .positive("La capacidad debe ser mayor a 0")
        .max(10000, "La capacidad no puede superar 10.000 animales"),

    tipo: z.enum(["ENGORDE", "ENFERMA"] as const).describe("Seleccioná el tipo de corral"),

    feedlotId: z.coerce.number().int().positive().default(1),
})

export type CorralFormValues = z.infer<typeof corralSchema>
