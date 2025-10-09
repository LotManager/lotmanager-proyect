import { Router } from "express"
import { AlimentacionController } from "../controllers/alimentacion-controller"

const router = Router()

router.get("/", AlimentacionController.listar)
router.get("/:id", AlimentacionController.obtenerPorId)
router.post("/", AlimentacionController.registrar)
router.put("/:id", AlimentacionController.actualizar)
router.delete("/:id", AlimentacionController.eliminar)

export default router
