import { Router } from "express";
import { AlimentoController } from "../controllers/alimento.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", checkRole(["ADMINISTRADOR"]), AlimentoController.listar);
router.post("/", checkRole(["ADMINISTRADOR"]), AlimentoController.crear);
router.put("/:id", checkRole(["ADMINISTRADOR"]), AlimentoController.actualizar);
router.delete("/:id", checkRole(["ADMINISTRADOR"]), AlimentoController.eliminar);

export default router;