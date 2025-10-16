import { Router } from "express"
import { gmdPorCorral, eficienciaPorCorral } from "../controllers/corral-metrics-controller"

const corralMetricsRouter = Router()

// GET /api/corrales/:id/gmd
corralMetricsRouter.get("/:id/gmd", gmdPorCorral)

// GET /api/corrales/:id/eficiencia
corralMetricsRouter.get("/:id/eficiencia", eficienciaPorCorral)

export default corralMetricsRouter