import { Router } from "express"
import { SuministroController } from "presentation/controllers/suministro-controller"
import { roleGuard } from "../../presentation/middlewares/roleGuard"

const router = Router()

router.get("/", roleGuard(["admin", "encargado"]), SuministroController.getAll)
router.get("/:id", roleGuard(["admin", "encargado"]), SuministroController.getById)
router.post("/", SuministroController.create)
router.put("/:id", SuministroController.update)
router.delete("/:id", SuministroController.delete)
export default router