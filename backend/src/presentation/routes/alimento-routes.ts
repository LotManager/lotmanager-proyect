import { Router } from "express"
import { AlimentoController } from "../controllers/alimento-controller"
import { roleGuard } from "../../presentation/middlewares/roleGuard"

const router = Router()

router.get("/", roleGuard(["admin", "encargado"]), AlimentoController.getAll)
router.get("/tipos", roleGuard(["admin", "encargado"]), AlimentoController.getTipos)
router.get("/:id", roleGuard(["admin", "encargado"]), AlimentoController.getById)
router.post("/", AlimentoController.create)
router.put("/:id", AlimentoController.update)
router.delete("/:id", AlimentoController.delete)

export default router
