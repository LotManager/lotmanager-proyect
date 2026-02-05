import { z } from "zod";


export interface RolDTO {
    id: number;
    nombre: string;
}

export const rolDTOSchema = z.object({
    id: z.number().min(1),
    nombre: z.string().min(2).max(100),
});

export const rolCreateDTOSchema = z.object({
    nombre: z.string()
        .min(3)
});


export type RolCreateInput = z.infer<typeof rolCreateDTOSchema>;
