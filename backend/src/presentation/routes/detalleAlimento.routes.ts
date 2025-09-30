import { Router } from "express"
import { DetalleAlimentoController } from "../controllers/detalleAlimento.controller"

const router = Router()

router.post("/", DetalleAlimentoController.create)
router.get("/", DetalleAlimentoController.getAll)

export default router