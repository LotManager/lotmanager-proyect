import { z } from "zod";



// Validación base
// DTO para lectura
export interface UserDTO {
  id: number;
  username: string;
  rol: {
    id: number;
    nombre: string;
  };
  personaId: number | null;
}
export const userDTOSchema = z.object({
  id: z.number().min(1),
  username: z.string().min(2).max(100),
  id_rol: z.number().min(1),
});

export type UserInput = z.infer<typeof userDTOSchema>;

// DTO para creación
export interface UserCreateDTO {
  username: string;
  contrasena: string;
  id_rol: number;
  personaId?: number;
}

export const userCreateDTOSchema = z.object({
  username: z.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos')
    .transform((val) => val.toLowerCase()),
  contrasena: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100),
  id_rol: z.number(),
  personaId: z.number().nullable().optional()
});

export type UserCreateInput = z.infer<typeof userCreateDTOSchema>;

// DTO para actualización parcial
export const userUpdateDTOSchema = z.object({
  username: z.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional(),
  contrasena: z.string()
    .min(6)
    .max(100)
    .optional(),
  id_rol: z.number().optional(),
});

export type UserUpdateInput = z.infer<typeof userUpdateDTOSchema>;