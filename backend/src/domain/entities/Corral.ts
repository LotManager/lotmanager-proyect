import { z } from 'zod';

export const CorralSchema = z.object({
  capacidad_maxima: z.number().int().positive(),
  numero: z.number().int().positive(),
  tipo_corral: z.enum(['ENGORDE', 'ENFERMA']),
  id_feedlot: z.number().int().positive(),
  id_alimentacion: z.number().int().nullable().optional()
});

export type CorralInput = z.infer<typeof CorralSchema>;