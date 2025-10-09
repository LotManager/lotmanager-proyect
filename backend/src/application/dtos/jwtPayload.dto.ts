import { z } from "zod";
import { rolesEnumsSchema } from "../../domain/enums/Roles"


const jwtPayloadSchema = z.object({
  sub: z.number(),
  usuario: z.string(),
  rol: rolesEnumsSchema
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
export { jwtPayloadSchema };