import {Router} from "express";
import { EnfermedadController } from "../controllers/enfermedad-controller";
import { EnfermedadService } from "../../application/services/enfermedadService";
import { PrismaEnfermedadRepository } from "../../infrastructure/repositorios/PrismaEnfermedadRepository";


const enfermedadRepo = new PrismaEnfermedadRepository();
const service = new EnfermedadService(enfermedadRepo);
const controller = new EnfermedadController(service);
    
const router = Router();


router.post("/", (req, res) => controller.crear(req, res));
router.get("/:id", (req, res) => controller.obtenerPorId(req, res));
router.get("/", (_req, res) => controller.obtenerTodas(_req, res));
router.put("/:id", (req, res) => controller.actualizarParcial(req, res));
router.delete("/:id", (req, res) => controller.eliminar(req, res));


export default router;
