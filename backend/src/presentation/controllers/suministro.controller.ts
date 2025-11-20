import { Request, Response } from "express";
import { SuministroService, CreateSuministroDto } from "../../application/services/suministro.service";

const service = new SuministroService();

export class SuministroController {
  static async registrar(req: Request, res: Response) {
    const parsed = CreateSuministroDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });

    try {
      const nuevo = await service.registrar(parsed.data);
      res.status(201).json(nuevo);
    } catch (error: any) {
      if (error.message.includes("no encontrado")) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: "Error al registrar suministro" });
    }
  }

  static async historial(req: Request, res: Response) {
    const corralId = Number(req.params.corralId);
    try {
      const lista = await service.getHistorialPorCorral(corralId);
      res.json(lista);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener historial" });
    }
  }
}