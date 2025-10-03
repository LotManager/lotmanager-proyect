import { z } from 'zod'
import { EnfermedadResponseDTO } from './enfermedad.dto';


export const TratamientoCreateDtoSchema = z.object({
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  dosisAplicada: z.string().min(1, 'La dosis aplicada es obligatoria'),
  nombre: z.string().min(1, 'El nombre es obligatorio'),
})


export const TratamientoUpdateDtoSchema = TratamientoCreateDtoSchema.partial()


export const TratamientoDtoSchema = TratamientoCreateDtoSchema.extend({
  id: z.number().int().positive(),
})


export const TratamientoConEnfermedadesDtoSchema = TratamientoDtoSchema.extend({
  enfermedades: z.array(EnfermedadResponseDTO),
})


export type TratamientoConEnfermedadesDto = z.infer<typeof TratamientoConEnfermedadesDtoSchema>
export type TratamientoCreateDto = z.infer<typeof TratamientoCreateDtoSchema>
export type TratamientoUpdateDto = z.infer<typeof TratamientoUpdateDtoSchema>
export type TratamientoDto = z.infer<typeof TratamientoDtoSchema>