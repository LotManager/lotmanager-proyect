import { Router } from "express";
import { DietaController } from "../controllers/dieta-controller";

const router = Router();

// Dietas
router.post("/", DietaController.create);
router.get("/", DietaController.getAll);
router.get("/:id", DietaController.getById);
router.put("/:id", DietaController.update);
router.delete("/:id", DietaController.delete);

// Detalles de dieta
router.post("/:id/detalles", DietaController.addDetalle);
router.put("/:id/detalles/:alimentoId", DietaController.updateDetalle);
router.delete("/:id/detalles/:alimentoId", DietaController.removeDetalle);

export default router;
