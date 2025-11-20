import { Router } from "express";
import { AlimentoController } from "../controllers/alimento.controller";

const router = Router();

router.get("/", AlimentoController.listar);
router.post("/", AlimentoController.crear);
router.put("/:id", AlimentoController.actualizar);
router.delete("/:id", AlimentoController.eliminar);

export default router;