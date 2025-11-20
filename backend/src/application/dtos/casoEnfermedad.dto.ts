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

export const CasoEnfermedadResponseDTO = z.object({
  id: z.number().int().positive(),
  fechaDeteccion: z.coerce.date(),
  fechaAlta: z.coerce.date().optional(),
  bovino: z.object({
    id: z.number().int().positive(),
    caravana: z.string(),
  }),
  enfermedad: z.object({
    id: z.number().int().positive(),
    nombre: z.string(),
  }),
  tratamiento: z.object({
    id: z.number().int().positive(),
    nombre: z.string(),
  }),
});

export type CasoEnfermedadResponseDTOType = z.infer<typeof CasoEnfermedadResponseDTO>;

export const CasoEnfermedadUpdateDTO = z.object({
  fechaDeteccion: z.coerce.date().optional(),
  tratamientoId: z.number().int().positive().optional(),
});

export type CasoEnfermedadUpdateDTOType = z.infer<typeof CasoEnfermedadUpdateDTO>;