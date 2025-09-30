import { Router } from "express"
import { SuministroController } from "../controllers/suministro.controller"

const router = Router()

router.post("/", SuministroController.create)
router.get("/", SuministroController.getAll)

export default router