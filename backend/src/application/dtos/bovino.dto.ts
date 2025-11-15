// src/domain/dtos/bovino.dto.ts
import { z } from "zod";
// ✅ 1. Importamos los nombres de Enum NUEVOS y CORRECTOS
import { SituacionBovino, EstadoSalud, SexoBovino, TipoBovino } from "@prisma/client";

// DTO para CREAR un bovino.
export const CreateBovinoDto = z.object({
  idRaza: z.number(),
  idCorral: z.number(),
  caravana: z.number(),
  // ✅ 2. Usamos el Enum y el nombre de campo NUEVOS
  situacionBovino: z.nativeEnum(SituacionBovino).optional().default("ENCORRAL"),
  estadoSalud: z.nativeEnum(EstadoSalud).optional().default("SANO"),
  ingreso: z.string().datetime(),
  pesoIngreso: z.number().positive(),
  // ✅ 3. Usamos el Enum NUEVO
  sexo: z.nativeEnum(SexoBovino),
  tipoBovino: z.nativeEnum(TipoBovino),
  egreso: z.string().datetime().nullable().optional(),
  pesoEgreso: z.number().positive().nullable().optional(),
});

// DTO para ACTUALIZAR. Todos los campos son opcionales.
export const UpdateBovinoDto = CreateBovinoDto.partial();

// Exportamos los tipos para usarlos en el servicio y controlador.
export type CreateBovinoDtoType = z.infer<typeof CreateBovinoDto>;
export type UpdateBovinoDtoType = z.infer<typeof UpdateBovinoDto>;