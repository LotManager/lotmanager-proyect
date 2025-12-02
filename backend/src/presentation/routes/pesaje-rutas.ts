import { Router } from "express";
import { PesajeController } from "../controllers/pesaje-controllers"

const pesajeRouter = Router();

// Registrar un nuevo pesaje
pesajeRouter.post("/", PesajeController.registrar);

// Ver historial de pesajes de un animal específico
pesajeRouter.get("/bovino/:bovinoId", PesajeController.historial);

export default pesajeRouter;