import z from "zod";

export const rolesEnum = ['admin', 'encargado'] as const;
export type RolNombre = typeof rolesEnum[number];
export const rolesEnumsSchema = z.enum(rolesEnum);