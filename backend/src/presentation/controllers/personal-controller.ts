import { Request, Response } from "express";
import { personalCreateSchema } from "../../application/personal/schemas/personalCreateSchema.js";
import { toPersistence } from "../../application/personal/mappers/toPersistence.js";
import { PersonalService } from "../../application/services/personalService.js";

export const personalController = (service: PersonalService) => {
  return async (req: Request, res: Response) => {
    try {
      if (req.method === "POST") {
        const dto = personalCreateSchema.parse(req.body);
        const persistible = toPersistence(dto);
        const creado = await service.registrar(persistible);
        return res.status(201).json(creado);
      }

      if (req.method === "GET") {
        const id = Number(req.params.id!);
        if (isNaN(id)) {
          return res.status(400).json({ mensaje: "ID inválido" });
        }

        const encontrado = await service.obtenerPorId(id);
        if (!encontrado) {
          return res.status(404).json({ mensaje: "Personal no encontrado" });
        }

        return res.json(encontrado);
      }
      if (req.method === "DELETE") {
            const id = Number(req.params.id!);
        if (isNaN(id)) {
            return res.status(400).json({ mensaje: "ID inválido" });
      }
        await service.eliminar(id);
        return res.status(204).send();
    }
      return res.status(405).json({ mensaje: "Método no permitido" });
    } catch (error) {
      return res.status(400).json({
        mensaje: "Error en la operación",
        detalles: error instanceof Error ? error.message : error,
      });
    }
  };
};