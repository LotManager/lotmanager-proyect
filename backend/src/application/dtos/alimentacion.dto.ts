import { z } from "zod";
import { CreateSuministroDto } from "./createSuministro.dto";

export const CreateAlimentacionSchema = z.object({
	descripcion: z.string().min(1).max(255),
	// referencia a corral existente (opcional). Si querés crear el corral inline,
	// cambia esto por un objeto usando CreateCorralDto.
	idCorral: z.number().int().positive().optional(),
	suministros: z.array(CreateSuministroDto).optional(),
});

export const UpdateAlimentacionSchema = CreateAlimentacionSchema.partial();

export const IdParamSchema = z.object({ id: z.string().min(1) });

export type CreateAlimentacionDTO = z.infer<typeof CreateAlimentacionSchema>;
export type UpdateAlimentacionDTO = z.infer<typeof UpdateAlimentacionSchema>;
export type IdParamDTO = z.infer<typeof IdParamSchema>;

