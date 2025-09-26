import { Router } from "express";
import { FeedlotController } from "../../presentation/controllers/feedlot-controller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = Router();
const controller = new FeedlotController();

router.get("/", (req, res) => controller.listar(req, res));
router.get("/:id", (req, res) => controller.obtenerPorId(req, res));
router.post("/", authMiddleware, (req, res) => controller.registrar(req, res));
router.put("/:id", authMiddleware, (req, res) => controller.actualizar(req, res));
router.delete("/:id", authMiddleware, (req, res) => controller.eliminar(req, res));

export default router;