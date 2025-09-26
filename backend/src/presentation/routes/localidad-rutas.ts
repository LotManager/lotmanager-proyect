import { Router } from "express";
import { LocalidadController } from "../controllers/localidad-controller";

const router = Router();
const localidadController = new LocalidadController();

router.get("/", (req, res) => localidadController.listar(req, res));
router.get("/:id", (req, res) => localidadController.obtenerPorId(req, res));
router.post("/", (req, res) => localidadController.registrar(req, res));
router.put("/:id", (req, res) => localidadController.actualizar(req, res));
router.delete("/:id", (req, res) => localidadController.eliminar(req, res));

export default router;