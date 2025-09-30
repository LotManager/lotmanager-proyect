import { z } from "zod";

const jwtPayloadSchema = z.object({
  id: z.number(),
  usuario: z.string(),
  rol: z.string()
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;
export { jwtPayloadSchema };