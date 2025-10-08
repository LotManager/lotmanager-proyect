import { Router } from "express";
import { PersonalController } from "../controllers/personal-controller";
import { PersonalService } from "../../application/services/personalService";
import { PrismaPersonalRepository } from "../../infrastructure/repositorios/PrismaPersonalRepository";
import {authMiddleware} from "../middlewares/authmiddleware";



const router = Router();
const personalService = new PersonalService(new PrismaPersonalRepository());
const controller = new PersonalController(personalService);
console.log("Personal rutas cargadas");

router.post("/", (req, res) => controller.crear(req, res));
router.get("/:id", authMiddleware, (req, res) => controller.obtenerPorId(req, res));
router.put("/:id", authMiddleware, (req, res) => controller.actualizar(req, res));
router.delete("/:id", authMiddleware, (req, res) => controller.eliminar(req, res));
router.get("/", authMiddleware, (req, res) => controller.obtenerTodos(req, res));


export default router;