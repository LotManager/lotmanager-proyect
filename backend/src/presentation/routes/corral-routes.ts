import { Router } from "express"
import { CorralController } from "../controllers/corral-controller"

const router = Router()

router.get("/", CorralController.listar)
router.get("/:id", CorralController.obtenerPorId)
router.post("/", CorralController.registrar)
router.put("/:id", CorralController.actualizar)
router.delete("/:id", CorralController.eliminar)

export default router