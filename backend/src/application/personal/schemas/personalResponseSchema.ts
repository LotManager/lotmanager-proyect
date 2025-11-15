import { z } from "zod";
import { rolSchema } from "../../dtos/user.dto";

export const usuarioSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string(),
  rol: rolSchema
});

export const personalResponseSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string(),
  apellido: z.string(),
  id_usuario: z.number().int().positive().nullable(),
  usuario: usuarioSchema.optional()
});

