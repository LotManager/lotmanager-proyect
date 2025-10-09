// application/dtos/UpdateCorralDto.ts
import { z } from "zod"
import { CreateCorralDto } from "./CreateCorralDto"

// Hacemos todos los campos opcionales para permitir updates parciales
export const UpdateCorralDto = CreateCorralDto.partial()

// Inferimos el tipo con z.infer
export type UpdateCorralDtoType = z.infer<typeof UpdateCorralDto>