import { Router } from "express"
import { AlimentoController } from "../controllers/alimento-controller"
// import { roleGuard } from "../../presentation/middlewares/roleGuard"

const router = Router()

router.get("/", AlimentoController.getAll)
router.get("/tipos", AlimentoController.getTipos)
router.get("/:id", AlimentoController.getById)
router.post("/", AlimentoController.create)
router.put("/:id", AlimentoController.update)
router.delete("/:id", AlimentoController.delete)

export default router
