import { Rol } from "@prisma/client";

export function mapRolFromPrisma(data: { id: number; nombre: string }): Rol {
  return {
    id: data.id,
    nombre: data.nombre
  };
}