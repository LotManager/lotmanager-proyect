import { Rol } from "../../../domain/value-objects/Rol";
import z from "zod";

export interface AuthPayload {
  id: number;
  usuario: string;
  rol: z.infer<typeof Rol>;
}