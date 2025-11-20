// routes/corral.routes.ts
import { Router } from "express"
import { CorralController } from "../controllers/corral-controller"
import { CorralViewController } from "../controllers/corral-View.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = Router()

router.use(authMiddleware);

router.get("/", checkRole(["ADMINISTRADOR", "ENCARGADO"]),CorralController.listar)
router.get("/:id", checkRole(["ADMINISTRADOR", "ENCARGADO"]),CorralController.obtenerPorId)
router.post("/", checkRole(["ADMINISTRADOR"]),CorralController.registrar)
router.put("/:id", checkRole(["ADMINISTRADOR"]),CorralController.actualizar)
router.delete("/:id", checkRole(["ADMINISTRADOR"]),CorralController.eliminar)
router.get("/:id/detalle", checkRole(["ADMINISTRADOR", "ENCARGADO"]),CorralViewController.getDetalle);

export default router