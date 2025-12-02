import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";
// Si querés protegerlo (recomendado):
// import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// router.use(authMiddleware); // Descomentar para proteger
router.get("/summary", DashboardController.getSummary);

export default router;