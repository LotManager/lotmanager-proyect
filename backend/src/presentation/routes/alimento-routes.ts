import { Router } from "express"
import { AlimentoController } from "../controllers/alimento-controller"
import { roleGuard } from "../../presentation/middlewares/roleGuard"

const router = Router()

router.get("/", roleGuard(["admin", "encargado"]), AlimentoController.listar)
router.get("/:id", roleGuard(["admin", "encargado"]), AlimentoController.obtenerPorId)
router.post("/", AlimentoController.registrar)
router.put("/:id", AlimentoController.actualizar)
router.delete("/:id", AlimentoController.eliminar)

export default router
