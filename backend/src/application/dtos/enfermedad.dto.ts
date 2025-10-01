import { z } from "zod";
import { TipoEnfermedad } from "../../domain/enums/TipoEnfermedad";

export const EnfermedadDTO = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  tipo: z.nativeEnum(TipoEnfermedad)
});

export type EnfermedadDTOType = z.infer<typeof EnfermedadDTO>;


export const EnfermedadParcialDTO = EnfermedadDTO.partial();
export type EnfermedadParcialDTOType = z.infer<typeof EnfermedadParcialDTO>;