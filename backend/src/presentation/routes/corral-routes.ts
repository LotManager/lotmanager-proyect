// routes/corral.routes.ts
import { Router } from "express"
import { CorralController } from "../controllers/corral-controller"
import { CorralViewController } from "../controllers/corral-View.controller";

const router = Router()

router.get("/", CorralController.listar)
router.get("/:id", CorralController.obtenerPorId)
router.post("/", CorralController.registrar)
router.put("/:id", CorralController.actualizar)
router.delete("/:id", CorralController.eliminar)
router.get("/:id/detalle", CorralViewController.getDetalle);

export default router