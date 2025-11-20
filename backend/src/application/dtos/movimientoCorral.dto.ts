import { z } from "zod";
import { TipoMotivo } from "@prisma/client";

export const CreateMovimientoCorralDto = z.object({
  bovinoId: z.number().positive("ID de bovino requerido"),
  corralOrigenId: z.number().positive("ID de corral origen requerido"),
  corralDestinoId: z.number().positive("ID de corral destino requerido"),
  motivo: z.nativeEnum(TipoMotivo),
  // La fecha es opcional, si no viene usamos la actual
  fecha: z.string().datetime().optional(),
});

export type CreateMovimientoCorralDtoType = z.infer<typeof CreateMovimientoCorralDto>;