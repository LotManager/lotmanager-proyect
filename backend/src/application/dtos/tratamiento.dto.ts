import { z } from 'zod'


export const TratamientoCreateDtoSchema = z.object({
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  dosisAplicada: z.string().min(1, 'La dosis aplicada es obligatoria'),
  nombre: z.string().min(1, 'El nombre es obligatorio'),
})


export const TratamientoUpdateDtoSchema = TratamientoCreateDtoSchema.partial()


export const TratamientoDtoSchema = TratamientoCreateDtoSchema.extend({
  id: z.number().int().positive(),
})


export const EnfermedadDtoSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string(),
  descripcion: z.string(),
  tipo: z.string(),
})

export const TratamientoConEnfermedadesDtoSchema = TratamientoDtoSchema.extend({
  enfermedades: z.array(EnfermedadDtoSchema),
})


export type TratamientoConEnfermedadesDto = z.infer<typeof TratamientoConEnfermedadesDtoSchema>
export type TratamientoCreateDto = z.infer<typeof TratamientoCreateDtoSchema>
export type TratamientoUpdateDto = z.infer<typeof TratamientoUpdateDtoSchema>
export type TratamientoDto = z.infer<typeof TratamientoDtoSchema>