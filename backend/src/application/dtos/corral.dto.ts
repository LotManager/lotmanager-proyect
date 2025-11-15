import { z } from "zod";
import { TipoCorral } from "@prisma/client";

export const CreateCorralDto = z.object({
  numero: z.number().int().positive("El número debe ser un entero positivo."),
  capacidadMaxima: z.number().int().positive("La capacidad debe ser un entero positivo."),
  tipo: z.nativeEnum(TipoCorral), 
  feedlotId: z.number().int().positive(),
  
});

export const UpdateCorralDto = CreateCorralDto.partial();

export type CreateCorralDtoType = z.infer<typeof CreateCorralDto>;

export type UpdateCorralDtoType = z.infer<typeof UpdateCorralDto>;