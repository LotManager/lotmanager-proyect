import {z} from 'zod';
import { id } from 'zod/v4/locales';

export const CreateAlimentoSchema = z.object({
    nroSerie: z.string().min(1).max(100),
    vencimiento: z.date(),
    //idDetalleAlimento: z.number().int().positive()
    //suministros: z.array(z.object({
    //    id: z.number().int().positive(),
    //    cantidad: z.number().positive(),
});

export const UpdateAlimentoSchema = CreateAlimentoSchema.partial();

export const IdParamSchema = z.object({
    id: z.string().min(1)
})
export type CreateAlimentoDTO = z.infer<typeof CreateAlimentoSchema>;
export type UpdateAlimentoDTO = z.infer<typeof UpdateAlimentoSchema>;
export type IdParamDTO = z.infer<typeof IdParamSchema>;
