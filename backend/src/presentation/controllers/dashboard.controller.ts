import { Request, Response } from "express";
import { DashboardService } from "../../application/services/dashboard.service";

const service = new DashboardService();

export class DashboardController {
  static async getSummary(req: Request, res: Response) {
    try {
      const data = await service.getSummary();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error en dashboard:", error);
      res.status(500).json({ message: "Error al obtener métricas" });
    }
  }
}