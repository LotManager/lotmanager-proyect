import { Rol } from "@/src/domain/value-objects/Rol";
import { z } from "zod";

export const personalResponseSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string(),
  apellido: z.string(),
  usuario: z
    .object({
      id: z.number().int().positive(),
      nombre: z.string(),
      rol: Rol, 
    })
    .optional(),
});

