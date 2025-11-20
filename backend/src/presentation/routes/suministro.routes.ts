import { Router } from "express";
import { SuministroController } from "../controllers/suministro.controller";

const router = Router();

router.post("/", SuministroController.registrar);
router.get("/corral/:corralId", SuministroController.historial);

export default router;