import { z } from "zod";
import { CreateSuministroDto as CreateSuministroSchema } from "./createSuministro.dto";

export const CreateAlimentoSchema = z.object({
    nroSerie: z.string().min(1).max(100),
    vencimiento: z.date(),
    // referencia a un detalle existente (opcional). Si quieres permitir crear el detalle inline,
    // cambia esto a un objeto con el esquema de detalle correspondiente.
    idDetalleAlimento: z.number().int().positive().optional(),
    // suministros opcionales asociados al alimento (crear varios suministros al crear el alimento)
    suministros: z.array(CreateSuministroSchema).optional(),
});

export const UpdateAlimentoSchema = CreateAlimentoSchema.partial();

export const IdParamSchema = z.object({ id: z.string().min(1) });

export type CreateAlimentoDTO = z.infer<typeof CreateAlimentoSchema>;
export type UpdateAlimentoDTO = z.infer<typeof UpdateAlimentoSchema>;
export type IdParamDTO = z.infer<typeof IdParamSchema>;
