import { Router } from "express"
import { SuministroController } from "../controllers/suministro-controller"
import { roleGuard } from "../../presentation/middlewares/roleGuard"

const router = Router()

router.get("/", roleGuard(["admin", "encargado"]), SuministroController.listar)
router.get("/:id", roleGuard(["admin", "encargado"]), SuministroController.obtenerPorId)
router.post("/", SuministroController.registrar)
router.put("/:id", SuministroController.actualizar)
router.delete("/:id", SuministroController.eliminar)

export default router