import { Router } from "express"
import { SuministroController } from "../controllers/suministro-controller"
// import { roleGuard } from "../../presentation/middlewares/roleGuard"

const router = Router()

router.get("/", SuministroController.getAll)
router.get("/:id", SuministroController.getById)
router.post("/", SuministroController.create)
router.put("/:id", SuministroController.update)
router.delete("/:id", SuministroController.delete)
export default router