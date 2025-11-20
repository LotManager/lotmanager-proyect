import { Router } from "express";
import { DietaController } from "../controllers/dieta.controller";

const router = Router();

router.get("/", DietaController.listar);
router.get("/:id", DietaController.obtener);
router.post("/", DietaController.crear);
router.put("/:id", DietaController.actualizar);
router.delete("/:id", DietaController.eliminar);

export default router;