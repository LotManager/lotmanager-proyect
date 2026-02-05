import { Request, Response } from "express";
import { RazaService } from "../../application/services/razaService";
import { PrismaRazaRepository } from "../../infrastructure/repositorios/PrismaRazaRepository";
import { CreateRazaDto, UpdateRazaDto } from "../../application/dtos/raza.dto";

const service = new RazaService(new PrismaRazaRepository());

export class RazaController {
  static async listar(req: Request, res: Response) {
    try {
      const razas = await service.listar();
      res.json(razas);
    } catch (error) {
      res.status(500).json({ message: "Error al listar razas" });
    }
  }

  static async crear(req: Request, res: Response) {
    const parsed = CreateRazaDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });
    
    try {
      const nueva = await service.crear(parsed.data);
      res.status(201).json(nueva);
    } catch (error) {
      res.status(500).json({ message: "Error al crear raza" });
    }
  }

  static async actualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const parsed = UpdateRazaDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });

    try {
      const actualizada = await service.actualizar(id, parsed.data);
      res.json(actualizada);
    } catch (error: any) {
      if (error.message.includes("no encontrada")) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: "Error al actualizar raza" });
    }
  }

  static async eliminar(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await service.eliminar(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes("no encontrada")) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: "Error al eliminar raza" });
    }
  }
}