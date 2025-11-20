import { z } from "zod";
import { TipoAlimento } from "@prisma/client";

export const CreateAlimentoDto = z.object({
  nombre: z.string().nonempty("El nombre es requerido"),
  tipo: z.nativeEnum(TipoAlimento),
});

export const UpdateAlimentoDto = CreateAlimentoDto.partial();

export type CreateAlimentoDtoType = z.infer<typeof CreateAlimentoDto>;
export type UpdateAlimentoDtoType = z.infer<typeof UpdateAlimentoDto>;