import { z } from "zod";

export const CreateRazaDto = z.object({
  nombre: z.string().nonempty("El nombre de la raza es requerido."),
});

export const UpdateRazaDto = CreateRazaDto.partial();

export type CreateRazaDtoType = z.infer<typeof CreateRazaDto>;
export type UpdateRazaDtoType = z.infer<typeof UpdateRazaDto>;