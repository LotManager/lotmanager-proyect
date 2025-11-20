import { Router } from "express";
import { RazaController } from "../controllers/raza-controller";

const razaRouter = Router();

razaRouter.get("/", RazaController.listar);
razaRouter.post("/", RazaController.crear);
razaRouter.put("/:id", RazaController.actualizar);
razaRouter.delete("/:id", RazaController.eliminar);

export default razaRouter;