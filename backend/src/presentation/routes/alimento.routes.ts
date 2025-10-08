import { Router } from "express"
import { AlimentoController } from "../controllers/alimento.controller"

const router = Router()

router.get("/", AlimentoController.listar)
router.get("/:id", AlimentoController.obtenerPorId)
router.post("/", AlimentoController.registrar)
router.put("/:id", AlimentoController.actualizar)
router.delete("/:id", AlimentoController.eliminar)

export default router
