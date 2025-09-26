import { Rol } from "../../../domain/value-objects/Rol.js";
import z from "zod";

export interface AuthPayload {
  id: number;
  usuario: string;
  rol: z.infer<typeof Rol>;
}