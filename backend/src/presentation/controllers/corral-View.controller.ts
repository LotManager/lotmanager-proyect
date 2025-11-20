import { Request, Response } from "express";
import { CorralViewService } from "../../application/services/corralView.service";
import { PrismaCorralRepository } from "../../infrastructure/repositorios/PrismaCorralRepository";
import { PrismaBovinoRepository } from "../../infrastructure/repositorios/PrismaBovinoRepository";

const corralRepo = new PrismaCorralRepository();
const bovinoRepo = new PrismaBovinoRepository();
const service = new CorralViewService(corralRepo, bovinoRepo);

export class CorralViewController {
  static async getDetalle(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const detalle = await service.getCorralDetalle(id);
      res.status(200).json(detalle);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error interno" });
    }
  }
}