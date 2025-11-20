import { Router } from "express";
import { BovinoController } from "../controllers/bovino-controller";

const bovinoRouter = Router();

bovinoRouter.post("/", BovinoController.crear);
bovinoRouter.get("/", BovinoController.listar);
bovinoRouter.get("/:id", BovinoController.obtenerPorId);
bovinoRouter.put("/:id", BovinoController.actualizar);
bovinoRouter.delete("/:id", BovinoController.eliminar);

export default bovinoRouter;