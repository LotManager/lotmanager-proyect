import { Router } from "express";
import { ProvinciaController } from "../../presentation/controllers/provincia-controller";

const router = Router();
const controller = new ProvinciaController();

router.get("/", (req, res) => controller.listar(req, res));
router.get("/:id", (req, res) => controller.obtenerPorId(req, res));
router.post("/", (req, res) => controller.registrar(req, res));
router.put("/:id", (req, res) => controller.actualizar(req, res));
router.delete("/:id", (req, res) => controller.eliminar(req, res));

export default router;