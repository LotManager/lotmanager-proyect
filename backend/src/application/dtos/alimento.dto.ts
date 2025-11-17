import z from "zod";
import { TipoAlimento } from "domain/enums/TipoAlimento";

export const CreateAlimentoSchema = z.object({
    nombre: z.string().min(1, "El nombre no puede estar vacío"),
    tipo: z.enum([TipoAlimento.GRANO, TipoAlimento.FORRAJE, TipoAlimento.SUPLEMENTO])
    })

export const UpdateAlimentoSchema = CreateAlimentoSchema.partial();
export const IdParamSchema = z.object({ id: z.string().min(1) });

export const AlimentoResponseSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  tipo: z.enum([TipoAlimento.GRANO, TipoAlimento.FORRAJE, TipoAlimento.SUPLEMENTO]),
});

export type CreateAlimentoDto = z.infer<typeof CreateAlimentoSchema>;
export type UpdateAlimentoDto = z.infer<typeof UpdateAlimentoSchema>;
export type AlimentoResponseDto = z.infer<typeof AlimentoResponseSchema>;
export type IdParam = z.infer<typeof IdParamSchema>;





