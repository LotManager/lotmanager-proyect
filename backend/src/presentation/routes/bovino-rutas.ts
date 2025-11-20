import { Router } from "express";
import { BovinoController } from "../controllers/bovino-controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";      

const bovinoRouter = Router();

bovinoRouter.use(authMiddleware);

bovinoRouter.post("/", checkRole(["ADMINISTRADOR", "ENCARGADO"]), BovinoController.crear);
bovinoRouter.get("/", checkRole(["ADMINISTRADOR", "ENCARGADO"]), BovinoController.listar);
bovinoRouter.get("/:id", checkRole(["ADMINISTRADOR", "ENCARGADO"]),BovinoController.obtenerPorId);
bovinoRouter.put("/:id", checkRole(["ADMINISTRADOR", "ENCARGADO"]), BovinoController.actualizar);
bovinoRouter.delete("/:id", checkRole(["ADMINISTRADOR,"]), BovinoController.eliminar);

export default bovinoRouter;