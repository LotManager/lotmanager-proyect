import {Router} from "express";
import { EnfermedadController } from "../controllers/enfermedad-controller";
import { EnfermedadService } from "../../application/services/enfermedadService";
import { PrismaEnfermedadxTratamientoRepository } from "../../infrastructure/repositorios/PrismaEnfermedadxTratamiento";
import { PrismaEnfermedadRepository } from "../../infrastructure/repositorios/PrismaEnfermedadRepository";


const enfermedadRepo = new PrismaEnfermedadRepository();
const relacionRepo = new PrismaEnfermedadxTratamientoRepository();
const service = new EnfermedadService(enfermedadRepo, relacionRepo);
const controller = new EnfermedadController(service);
    
const router = Router();


router.post("/", (req, res) => controller.crear(req, res));
router.get("/:id", (req, res) => controller.obtenerPorId(req, res));
router.get("/", (req, res) => controller.obtenerTodas(req, res));
router.put("/:id", (req, res) => controller.actualizarParcial(req, res));
router.delete("/:id", (req, res) => controller.eliminarController(req, res));
router.post("/:id/vincular", (req, res) => controller.vincularTratamientoController(req, res));
router.delete("/:id/vincular/:idTratamiento", (req, res) => controller.desvincularTratamientoController(req, res));

export default router;