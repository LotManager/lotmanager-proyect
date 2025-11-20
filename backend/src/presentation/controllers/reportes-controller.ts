import { Request, Response } from "express";
import { ReportesService } from "../../application/services/reportesService";

export class ReportesController {
  private service: ReportesService;

  constructor() {
    this.service = new ReportesService();
  }

  async getCorralEfficiency(req: Request, res: Response) {
    try {
      const data = await this.service.getCorralEfficiency();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener eficiencia de corrales" });
    }
  }

  async getHealthStats(req: Request, res: Response) {
    try {
      const data = await this.service.getHealthStats();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener estadísticas de sanidad" });
    }
  }

  async getMonthlySummary(req: Request, res: Response) {
    try {
      const data = await this.service.getMonthlySummary();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener resumen mensual" });
    }
  }

  async getWeightEvolution(req: Request, res: Response) {
    try {
      const data = await this.service.getWeightEvolution();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener evolución de peso" });
    }
  }
}
