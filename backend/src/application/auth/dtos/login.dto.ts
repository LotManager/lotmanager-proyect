// src/application/auth/dtos/login.dto.ts
import { z } from "zod"

export const LoginDTO = z.object({
  usuario: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos') ,
  contrasena: z.string().min(6).max(100)
});

export type LoginInput = z.infer<typeof LoginDTO>;


