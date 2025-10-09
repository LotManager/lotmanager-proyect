// routes/corral.routes.ts
import { Router } from "express"
import { CorralController } from "../controllers/corral-controller"
import { roleGuard } from "../../presentation/middlewares/roleGuard"

const router = Router()

router.get("/", roleGuard(["admin", "encargado"]), CorralController.listar)
router.get("/:id", roleGuard(["admin", "encargado"]), CorralController.obtenerPorId)
router.post("/", roleGuard(["admin"]), CorralController.registrar)
router.put("/:id", roleGuard(["admin"]), CorralController.actualizar)
router.delete("/:id", roleGuard(["admin"]), CorralController.eliminar)

export default router