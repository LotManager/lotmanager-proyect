import { Request, Response } from "express";
import { MovimientoCorralService } from "../../application/services/movimientoCorralService";
import { PrismaMovimientoCorralRepository } from "../../infrastructure/repositorios/PrismaMovimientoCorralRepository";
import { PrismaBovinoRepository } from "../../infrastructure/repositorios/PrismaBovinoRepository";
import { CreateMovimientoCorralDto } from "../../application/dtos/movimientoCorral.dto";
import { PrismaCorralRepository } from "../../infrastructure/repositorios/PrismaCorralRepository";

// Instanciamos repositorios
const movimientoRepo = new PrismaMovimientoCorralRepository();
const bovinoRepo = new PrismaBovinoRepository(); // Necesitamos este también
const corralRepo = new PrismaCorralRepository(); // ✅ Nueva instancia

// Instanciamos servicio con ambas dependencias
const movimientoService = new MovimientoCorralService(movimientoRepo, bovinoRepo, corralRepo);

export class MovimientoCorralController {
  
  static async registrar(req: Request, res: Response) {
    const parsed = CreateMovimientoCorralDto.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues });
    }

    try {
      const nuevoMovimiento = await movimientoService.registrarMovimiento(parsed.data);
      res.status(201).json(nuevoMovimiento);
    } catch (error: any) {
      console.error(error);
      // Manejo simple de errores de negocio
      if (error.message.includes("no encontrado") || error.message.includes("El bovino no se encuentra")) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Error al registrar el movimiento" });
    }
  }

  static async obtenerHistorial(req: Request, res: Response) {
    try {
      const bovinoId = Number(req.params.bovinoId);
      const historial = await movimientoService.historialPorBovino(bovinoId);
      res.status(200).json(historial);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el historial" });
    }
  }
}