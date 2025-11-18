import {z} from 'zod';


export const personalCreateSchema = z.object({
    nombre: z.string().min(1, {message: "El nombre es obligatorio"}),
    apellido: z.string().min(1, {message: "El apellido es obligatorio"}),
    email: z.string().email({message: "El mail debe ser un correo válido"}),
    id_usuario: z.number().int().positive({message: "El ID del usuario debe ser un número positivo"}).optional()
});


export const personalResponseSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string(),
  apellido: z.string(),
  email: z.string().email(),
});

export const personalUpdateSchema = personalCreateSchema.partial();



export type PersonalCreateDto = z.infer<typeof personalCreateSchema>;

export type PersonalResponseDto = z.infer<typeof personalResponseSchema>;

export type PersonalUpdateDto = z.infer<typeof personalUpdateSchema>;