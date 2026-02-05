import { Request, Response } from "express";
import { PesajeService } from "../../application/services/pesajeService";
import { PrismaPesajeRepository } from "../../infrastructure/repositorios/PrismaPesajeRepository";
import { CreatePesajeDto } from "../../application/dtos/pesaje.dto";

const service = new PesajeService(new PrismaPesajeRepository());

export class PesajeController {
  static async registrar(req: Request, res: Response) {
    const parsed = CreatePesajeDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });

    try {
      const nuevo = await service.registrar(parsed.data);
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ message: "Error al registrar pesaje" });
    }
  }

  static async historial(req: Request, res: Response) {
    const bovinoId = Number(req.params.bovinoId);
    try {
      const historial = await service.historial(bovinoId);
      res.json(historial);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener historial" });
    }
  }
}