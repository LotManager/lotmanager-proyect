export const TOKEN_TYPES = ["recuperacion", "login", "verificacion", "refresh"] as const;
export type TokenTipo = typeof TOKEN_TYPES[number];