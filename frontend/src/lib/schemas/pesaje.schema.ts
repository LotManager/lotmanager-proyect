import { z } from "zod";

export const pesajeSchema = z.object({
    pesoActual: z.coerce.number({
        message: "Debe ser un número válido", // <-- ¡Este es el cambio clave!
    }).min(1, "El peso debe ser mayor a 0"),
    
    fecha: z.string().min(1, "La fecha es obligatoria"),
});

export type PesajeFormValues = z.infer<typeof pesajeSchema>;