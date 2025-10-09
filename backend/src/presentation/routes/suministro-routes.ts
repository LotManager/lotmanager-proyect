import { Router } from "express"
import { SuministroController } from "../controllers/suministro-controller"

const router = Router()
router.get("/", SuministroController.listar)
router.get("/:id", SuministroController.obtenerPorId)
router.post("/", SuministroController.registrar)
router.put("/:id", SuministroController.actualizar)
router.delete("/:id", SuministroController.eliminar)

export default router