import z from "zod";
import { CreateDetalleDietaSchema, UpdateDetalleDietaSchema } from "./detalle-dieta.dto";

// 👉 Crear dieta: detalles SIN dietaId (lo sabe el backend después)
export const CreateDietaSchema = z.object({
  nombre: z.string().min(1).max(100),
  descripcion: z.string().min(1).max(500),
  detalles: z.array(
    CreateDetalleDietaSchema.omit({ dietaId: true }) // 🔗 reutilizamos el schema
  ),
});

// 👉 Update dieta: todo opcional, incluyendo detalles
export const UpdateDietaSchema = z.object({
  nombre: z.string().min(1).max(100).optional(),
  descripcion: z.string().min(1).max(500).optional(),
  detalles: z
    .array(
      // usamos el schema de update de detalle,
      // pero sin dietaId (lo tenés en la ruta o en la entidad)
      UpdateDetalleDietaSchema.omit({ dietaId: true })
    )
    .optional(),
});

export const IdParamSchema = z.object({ id: z.string().min(1) });

export const DietaResponseSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
});

export const DietaWithDetallesResponseSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  detalles: z.array(
    z.object({
      proporcionKg: z.number(),
      alimentoId: z.number(),
    })
  ),
});

export type CreateDietaDto = z.infer<typeof CreateDietaSchema>;
export type UpdateDietaDto = z.infer<typeof UpdateDietaSchema>;
export type DietaResponseDto = z.infer<typeof DietaResponseSchema>;
export type DietaWithDetallesResponseDto = z.infer<
  typeof DietaWithDetallesResponseSchema
>;
export type IdParam = z.infer<typeof IdParamSchema>;