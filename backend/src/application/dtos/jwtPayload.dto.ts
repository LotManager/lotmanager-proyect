import { z } from "zod";
import { Rol } from "../../domain/value-objects/Rol";


const jwtPayloadSchema = z.object({
  sub: z.number(),
  usuario: z.string(),
  rol: z.string()
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
export { jwtPayloadSchema };