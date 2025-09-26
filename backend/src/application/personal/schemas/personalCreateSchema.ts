import {z} from 'zod';

export const personalCreateSchema = z.object({
    nombre: z.string().min(1, {message: "El nombre es obligatorio"}),
    apellido: z.string().min(1, {message: "El apellido es obligatorio"}),
    idusuario: z.number().int().positive({message: "El ID del usuario debe ser un número positivo"}).optional()
});


