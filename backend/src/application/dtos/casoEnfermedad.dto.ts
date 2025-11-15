// src/application/dtos/casoEnfermedad.dto.ts
import { z } from "zod";

export const CasoEnfermedadDTO = z.object({
  bovinoId: z.number().int().positive(),
  enfermedadId: z.number().int().positive(),
  tratamientoId: z.number().int().positive(),
  fechaDeteccion: z.coerce.date(),
  fechaAlta: z.coerce.date().optional(),
});

export type CasoEnfermedadDTOType = z.infer<typeof CasoEnfermedadDTO>;

export const CasoEnfermedadResponseDTO = CasoEnfermedadDTO.extend({
  id: z.number().int().positive(),
});

export type CasoEnfermedadResponseDTOType = z.infer<typeof CasoEnfermedadResponseDTO>;