// routes/corral.routes.ts
import { Router } from "express"
import { CorralController } from "../controllers/corral-controller"
import { roleGuard } from "../../presentation/middlewares/roleGuard"

const router = Router()

router.get("/",  CorralController.listar)
router.get("/:id",  CorralController.obtenerPorId)
router.post("/",  CorralController.registrar)
router.put("/:id",  CorralController.actualizar)
router.delete("/:id",  CorralController.eliminar)

export default router