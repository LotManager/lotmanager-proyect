import z from "zod";

export const rolesEnum = ['admin', 'tambero'] as const;
export type RolNombre = typeof rolesEnum[number];
export const rolesEnumsSchema = z.enum(rolesEnum);