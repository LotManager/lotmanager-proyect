import { z } from 'zod'
import { TipoUnidad } from '@prisma/client';


export const TratamientoCreateDtoSchema = z.object({
  descripcion: z.string().trim().min(1, 'La descripción es obligatoria'),
  unidad: z.enum(Object.values(TipoUnidad)),
  nombre: z.string().trim().min(1, 'El nombre es obligatorio'),
})


export const TratamientoUpdateDtoSchema = TratamientoCreateDtoSchema.partial()


export const TratamientoDtoSchema = TratamientoCreateDtoSchema.extend({
  id: z.number().int().positive(),
})



export type TratamientoCreateDto = z.infer<typeof TratamientoCreateDtoSchema>
export type TratamientoUpdateDto = z.infer<typeof TratamientoUpdateDtoSchema>
export type TratamientoDto = z.infer<typeof TratamientoDtoSchema>