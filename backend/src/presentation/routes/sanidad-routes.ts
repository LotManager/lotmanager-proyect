import { PrismaClient } from "@prisma/client";
import { CasoEnfermedadService } from "../../application/services/sanidadService";
import { CasoEnfermedadPrismaRepository } from "../../infrastructure/repositorios/PrismaSanidadRepository";
import { CasoEnfermedadController } from "../../presentation/controllers/sanidad-controller";
import { Router } from "express";

const prisma = new PrismaClient();
const casoRepo = new CasoEnfermedadPrismaRepository(prisma);
const casoEnfermedadService = new CasoEnfermedadService(casoRepo); 

const controller = new CasoEnfermedadController(casoEnfermedadService);
const router = Router();

// Rutas RESTful
router.post("/", controller.registrar);         // Crear nuevo caso
router.put("/:id", controller.actualizar);      // Modificar parcialmente
router.delete("/:id", controller.eliminar);     // Eliminar por ID
router.get("/:id", controller.obtenerPorId);    // Obtener por ID
router.get("/", controller.listar);             // Listar todos

export default router; 