import { Router } from "express";
import { SanidadController } from "../controllers/sanidad.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();
router.use(authMiddleware);

// Operaciones Clínicas (Encargado y Admin)
router.post("/casos", checkRole(["ADMINISTRADOR", "ENCARGADO"]), SanidadController.registrarCaso);
router.put("/casos/:id/alta", checkRole(["ADMINISTRADOR", "ENCARGADO"]), SanidadController.darAlta);
router.get("/auxiliares", checkRole(["ADMINISTRADOR", "ENCARGADO"]), SanidadController.getAuxiliares);
router.get("/activos", checkRole(["ADMINISTRADOR", "ENCARGADO"]), SanidadController.getCasosActivos);

// Enfermedades
router.post("/enfermedades", checkRole(["ADMINISTRADOR"]), SanidadController.crearEnfermedad);
router.delete("/enfermedades/:id", checkRole(["ADMINISTRADOR"]), SanidadController.eliminarEnfermedad);

// Tratamientos
router.post("/tratamientos", checkRole(["ADMINISTRADOR"]), SanidadController.crearTratamiento);
router.delete("/tratamientos/:id", checkRole(["ADMINISTRADOR"]), SanidadController.eliminarTratamiento);

export default router;