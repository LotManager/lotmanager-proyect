import {z} from 'zod';
import { id } from 'zod/v4/locales';

export const AlimentoDTO = z.object({
    id: z.number().int().positive(),
    nroSerie: z.string().min(1).max(100),
    vencimiento: z.date(),
    //idDetalleAlimento: z.number().int().positive()
    //suministros: z.array(z.object({
    //    id: z.number().int().positive(),
    //    cantidad: z.number().positive(),
});

export type AlimentoDTOType = z.infer<typeof AlimentoDTO>;


export const AlimentoParcialDTO = AlimentoDTO.partial();
export type AlimentoParcialDTOType = z.infer<typeof AlimentoParcialDTO>;



