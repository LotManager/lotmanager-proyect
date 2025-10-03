import { Router } from "express";
import { PersonalController } from "../controllers/personal-controller";
import { PersonalService } from "../../application/services/personalService";
import { PrismaPersonalRepository } from "../../infrastructure/repositorios/PrismaPersonalRepository";



const router = Router();
const personalService = new PersonalService(new PrismaPersonalRepository());
const controller = new PersonalController(personalService);
console.log("Personal rutas cargadas");

router.post("/", (req, res) => controller.crear(req, res));
router.get("/:id", (req, res) => controller.obtenerPorId(req, res));
router.put("/:id", (req, res) => controller.actualizar(req, res));
router.delete("/:id", (req, res) => controller.eliminar(req, res));
router.get("/", (req, res) => controller.obtenerTodos(req, res));


export default router;