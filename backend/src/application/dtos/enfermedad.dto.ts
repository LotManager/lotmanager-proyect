import { z } from "zod";
import { TipoEnfermedad } from "../../domain/enums/TipoEnfermedad";

export const EnfermedadDTO = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  tipo: z.nativeEnum(TipoEnfermedad)
});

export type EnfermedadDTOType = z.infer<typeof EnfermedadDTO>;

export const EnfermedadResponseDTO = EnfermedadDTO.extend({
  id: z.number().int().positive()
});

export type EnfermedadResponseDTO = z.infer<typeof EnfermedadResponseDTO>;

export const EnfermedadParcialDTO = EnfermedadDTO.partial();
export type EnfermedadParcialDTOType = z.infer<typeof EnfermedadParcialDTO>;