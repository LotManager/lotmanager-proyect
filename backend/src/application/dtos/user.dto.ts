import { z } from "zod";

const roles = z.enum(['admin', 'user']) ;

export interface UserDTO {
    id: number;
    usuario: string;
    rol: z.infer<typeof roles>;
}

export const userDTOSchema = z.object({
    id: z.number().min(1),
    usuario: z.string().min(2).max(100),
    rol: roles
});
export type UserInput = z.infer<typeof userDTOSchema>;




export interface UserCreateDTO {
    usuario: string;
    contrasena: string;
    rol: z.infer<typeof roles>;
}

export const userCreateDTOSchema = z.object({
    usuario: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos'),
    contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(100),
    rol: roles
});

export type UserCreateInput = z.infer<typeof userCreateDTOSchema>;




export interface UserUpdateDTO {
    id: number;
    usuario?: string;
    contrasena?: string;
    rol?: z.infer<typeof roles>;
}


export const userUpdateDTOSchema = z.object({
    id: z.number().min(1),
    usuario: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos').optional(),
    contrasena: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(100).optional(),
    rol: roles.optional()
});
export type UserUpdateInput = z.infer<typeof userUpdateDTOSchema>;  