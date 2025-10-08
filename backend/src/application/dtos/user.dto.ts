import { z } from "zod";
import { rolesEnum } from "../../domain/enums/Roles";
import { Rol } from "../../domain/value-objects/Rol";

// Validación base
export const rolSchema = z.enum(rolesEnum);

// DTO para lectura
export interface UserDTO {
  id: number;
  usuario: string;
  rol: {
    id: number;
    nombre: string;
  };
}

export const userDTOSchema = z.object({
  id: z.number().min(1),
  usuario: z.string().min(2).max(100),
  rol: rolSchema.transform((nombre) => Rol.fromNombre(nombre))
});

export type UserInput = z.infer<typeof userDTOSchema>;

// DTO para creación
export interface UserCreateDTO {
  usuario: string;
  contrasena: string;
  rol: "admin" | "encargado";
}

export const userCreateDTOSchema = z.object({
  usuario: z.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos')
    .transform((val) => val.toLowerCase()),
  contrasena: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100),
  rol: rolSchema.transform((nombre) => Rol.fromNombre(nombre))
});

export type UserCreateInput = z.infer<typeof userCreateDTOSchema>;

// DTO para actualización parcial
export const userUpdateDTOSchema = z.object({
  usuario: z.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/)
    .optional(),
  contrasena: z.string()
    .min(6)
    .max(100)
    .optional(),
  rol: rolSchema.transform((nombre) => Rol.fromNombre(nombre)).optional()
});

export type UserUpdateInput = z.infer<typeof userUpdateDTOSchema>;