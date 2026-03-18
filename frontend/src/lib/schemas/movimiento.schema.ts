import { z } from "zod";

export const movimientoSchema = z.object({
    corralDestinoId: z.coerce.number({ 
        message: "Debe ser un número válido" 
    }).min(1, "Debes seleccionar un corral"),
    
    motivo: z.enum(["CAMBIO", "ENFERMEDAD"], {
        message: "Selecciona un motivo válido" // <-- ¡Adiós al errorMap!
    }),
});

export type MovimientoFormValues = z.infer<typeof movimientoSchema>;