import { Request, Response } from "express";
import { DietaService } from "../../application/services/dieta.service";
import { PrismaDietaRepository } from "../../infrastructure/repositorios/PrismaDietaRepository";
import { CreateDietaDto, UpdateDietaDto } from "../../application/dtos/dieta.dto"

// Instanciamos el servicio con su repositorio
const service = new DietaService(new PrismaDietaRepository());

export class DietaController {
  
  static async listar(req: Request, res: Response) {
    try {
      const dietas = await service.listar();
      res.json(dietas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al listar dietas" });
    }
  }

  static async obtener(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const dieta = await service.obtener(id);
      if (!dieta) return res.status(404).json({ message: "Dieta no encontrada" });
      res.json(dieta);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la dieta" });
    }
  }

  static async crear(req: Request, res: Response) {
    // Validamos la estructura compleja (Dieta + Detalles) con Zod
    const parsed = CreateDietaDto.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues });
    }

    try {
      const nueva = await service.crear(parsed.data);
      res.status(201).json(nueva);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear la dieta" });
    }
  }

  static async actualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const parsed = UpdateDietaDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });

    try {
      const actualizada = await service.actualizar(id, parsed.data);
      res.json(actualizada);
    } catch (error: any) {
      if (error.message.includes("no encontrado")) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: "Error al actualizar dieta" });
    }
  }

  static async eliminar(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await service.eliminar(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes("no encontrado")) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: "Error al eliminar dieta" });
    }
  }
}