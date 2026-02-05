import { Router } from "express";
import { MovimientoCorralController } from "../controllers/moviminetoCorral-controller";

const router = Router();

// POST /api/movimientos -> Registrar movimiento
router.post("/", MovimientoCorralController.registrar);

// GET /api/movimientos/bovino/:bovinoId -> Ver historial de un animal
router.get("/bovino/:bovinoId", MovimientoCorralController.obtenerHistorial);

export default router;