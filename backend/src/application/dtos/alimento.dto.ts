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

export const AlimentoWithDetallesResponseSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  tipo: z.enum([TipoAlimento.GRANO, TipoAlimento.FORRAJE, TipoAlimento.SUPLEMENTO]),
  detalles: z.array(z.object({
    proporcionKg: z.number(),
    dietaId: z.number(),
  })),
});

export type CreateAlimentoSchema = z.infer<typeof CreateAlimentoSchema>;
export type UpdateAlimentoSchema = z.infer<typeof UpdateAlimentoSchema>;
export type AlimentoResponseSchema = z.infer<typeof AlimentoResponseSchema>;
export type AlimentoWithDetallesResponseSchema = z.infer<typeof AlimentoWithDetallesResponseSchema>;
export type IdParam = z.infer<typeof IdParamSchema>;





