import { Router } from "express"
import { DetalleAlimentoController } from "../controllers/detalleAlimento-controller"

const router = Router()

router.get("/", DetalleAlimentoController.listar)
router.get("/:id", DetalleAlimentoController.obtenerPorId)
router.post("/", DetalleAlimentoController.registrar)
router.put("/:id", DetalleAlimentoController.actualizar)
router.delete("/:id", DetalleAlimentoController.eliminar)

export default router