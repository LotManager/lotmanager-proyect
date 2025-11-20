import { Router } from "express";
import { DietaController } from "../controllers/dieta.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", checkRole(["ADMINISTRADOR", "ENCARGADO"]), DietaController.listar);
router.get("/:id", checkRole(["ADMINISTRADOR", "ENCARGADO"]), DietaController.obtener);
router.post("/", checkRole(["ADMINISTRADOR"]), DietaController.crear);
router.put("/:id", checkRole(["ADMINISTRADOR"]), DietaController.actualizar);
router.delete("/:id", checkRole(["ADMINISTRADOR"]), DietaController.eliminar);

export default router;