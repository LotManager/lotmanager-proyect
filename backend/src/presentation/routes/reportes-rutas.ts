import { Router } from "express";
import { ReportesController } from "../controllers/reportes-controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();
const controller = new ReportesController();

router.use(authMiddleware);
router.use(checkRole(["ADMINISTRADOR"]));

router.get("/corral-efficiency", (req, res) => controller.getCorralEfficiency(req, res));
router.get("/health-stats", (req, res) => controller.getHealthStats(req, res));
router.get("/monthly-summary", (req, res) => controller.getMonthlySummary(req, res));
router.get("/weight-evolution", (req, res) => controller.getWeightEvolution(req, res));

export default router;
