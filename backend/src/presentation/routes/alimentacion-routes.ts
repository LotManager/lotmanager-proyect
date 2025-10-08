import { Router } from "express"
import { AlimentacionController } from "../controllers/alimentacion-controller"
import { roleGuard } from "../../presentation/middlewares/roleGuard"

const router = Router()

router.get("/", roleGuard(["admin", "encargado"]), AlimentacionController.listar)
router.get("/:id", roleGuard(["admin", "encargado"]), AlimentacionController.obtenerPorId)
router.post("/", AlimentacionController.registrar)
router.put("/:id", AlimentacionController.actualizar)
router.delete("/:id", AlimentacionController.eliminar)

export default router
