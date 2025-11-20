import { Request, Response } from "express";
import { AlimentoService } from "../../application/services/alimentoService";
import { PrismaAlimentoRepository } from "../../infrastructure/repositorios/PrismaAlimentoRepository";
import { CreateAlimentoDto, UpdateAlimentoDto } from "../../application/dtos/alimento.dto";

const service = new AlimentoService(new PrismaAlimentoRepository());

export class AlimentoController {
  static async listar(req: Request, res: Response) {
    try {
      const alimentos = await service.listar();
      res.json(alimentos);
    } catch (error) {
      res.status(500).json({ message: "Error al listar alimentos" });
    }
  }

  static async crear(req: Request, res: Response) {
    const parsed = CreateAlimentoDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });

    try {
      const nuevo = await service.crear(parsed.data);
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ message: "Error al crear alimento" });
    }
  }

  static async actualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const parsed = UpdateAlimentoDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });

    try {
      const actualizado = await service.actualizar(id, parsed.data);
      res.json(actualizado);
    } catch (error: any) {
      if (error.message.includes("no encontrado")) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: "Error al actualizar alimento" });
    }
  }

  static async eliminar(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await service.eliminar(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes("no encontrado")) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: "Error al eliminar alimento" });
    }
  }
}