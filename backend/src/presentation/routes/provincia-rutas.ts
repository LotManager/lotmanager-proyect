import { Router } from "express";
import { ProvinciaController } from "../../presentation/controllers/provincia-controller";

const router = Router();
const controller = new ProvinciaController();

router.get("/provincias", (req, res) => controller.listar(req, res));
router.get("/provincias/:id", (req, res) => controller.obtenerPorId(req, res));
router.post("/provincias", (req, res) => controller.registrar(req, res));
router.put("/provincias/:id", (req, res) => controller.actualizar(req, res));
router.delete("/provincias/:id", (req, res) => controller.eliminar(req, res));

export default router;