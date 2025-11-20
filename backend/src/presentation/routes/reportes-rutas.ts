import { Router } from "express";
import { ReportesController } from "../controllers/reportes-controller";

const router = Router();
const controller = new ReportesController();

router.get("/corral-efficiency", (req, res) => controller.getCorralEfficiency(req, res));
router.get("/health-stats", (req, res) => controller.getHealthStats(req, res));
router.get("/monthly-summary", (req, res) => controller.getMonthlySummary(req, res));
router.get("/weight-evolution", (req, res) => controller.getWeightEvolution(req, res));

export default router;
