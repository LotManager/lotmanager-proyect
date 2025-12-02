import  prisma  from "../../config/db"; // Usamos prisma directo para este caso simple o podrías hacer repo
import { z } from "zod";

// DTO Simple aquí mismo para no crear mil archivos
export const CreateSuministroDto = z.object({
  corralId: z.number().positive(),
  dietaId: z.number().positive(),
  cantidadKg: z.number().positive()
});

export type CreateSuministroType = z.infer<typeof CreateSuministroDto>;

export class SuministroService {
  
  async registrar(dto: CreateSuministroType) {
    // 1. Validamos que existan corral y dieta
    const corral = await prisma.corral.findUnique({ where: { id: dto.corralId } });
    if (!corral) throw new Error("Corral no encontrado");
    
    const dieta = await prisma.dieta.findUnique({ where: { id: dto.dietaId } });
    if (!dieta) throw new Error("Dieta no encontrada");

    // 2. Creamos el suministro
    // La fecha se pone automática en now() por defecto en el schema
    const nuevoSuministro = await prisma.suministro.create({
      data: {
        corralId: dto.corralId,
        dietaId: dto.dietaId,
        cantidadKg: dto.cantidadKg
      },
      include: { dieta: true } // Devolvemos con datos de la dieta
    });

    return nuevoSuministro;
  }

  // Opcional: Listar suministros de un corral
  async getHistorialPorCorral(corralId: number) {
    return prisma.suministro.findMany({
      where: { corralId },
      include: { dieta: true },
      orderBy: { fecha: 'desc' }
    });
  }
}