import { z } from "zod";

// Validamos cada item del detalle
const DetalleDietaSchema = z.object({
  alimentoId: z.number().positive("ID de alimento requerido"),
  proporcionKg: z.number().positive("La proporción debe ser mayor a 0"),
});

export const CreateDietaDto = z.object({
  nombre: z.string().nonempty("El nombre es requerido"),
  descripcion: z.string().optional().nullable(),
  // Validamos el array de ingredientes
  detalles: z.array(DetalleDietaSchema).min(1, "La dieta debe tener al menos un ingrediente"),
});

export const UpdateDietaDto = CreateDietaDto.partial();

export type CreateDietaDtoType = z.infer<typeof CreateDietaDto>;
export type UpdateDietaDtoType = z.infer<typeof UpdateDietaDto>;