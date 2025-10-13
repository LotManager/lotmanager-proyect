// src/presentation/controllers/bovino.controller.ts

import { Request, Response } from "express";
import { BovinoService } from "../../application/services/bovinoService";
import { PrismaBovinoRepository } from "../../infrastructure/repositorios/PrismaBovinoRepository";
import { CreateBovinoDto, UpdateBovinoDto } from "../../application/dtos/bovino.dto";

// 1. Instanciamos nuestras capas (el "setup")
const bovinoRepo = new PrismaBovinoRepository();
const bovinoService = new BovinoService(bovinoRepo);

export class BovinoController {
  
  /**
   * ✅ OBTENER TODOS: Llama al servicio para obtener la lista completa.
   */
  static async listar(req: Request, res: Response) {
    try {
      const bovinos = await bovinoService.listar();
      res.status(200).json(bovinos);
    } catch (error) {
      console.error("Error en el controlador al listar bovinos:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }

  /**
   * ✅ OBTENER UNO: Busca un bovino por su ID.
   */
  static async obtenerPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const bovino = await bovinoService.obtener(id);

      if (!bovino) {
        return res.status(404).json({ error: "Bovino no encontrado." });
      }
      res.status(200).json(bovino);
    } catch (error) {
      console.error("Error en el controlador al obtener bovino:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }

  /**
   * ✅ CREAR: Valida los datos con el DTO antes de llamar al servicio.
   */
  static async crear(req: Request, res: Response) {
    // 2. Usamos Zod para validar el cuerpo de la petición.
    const parsed = CreateBovinoDto.safeParse(req.body);
    if (!parsed.success) {
      // Si la validación falla, devolvemos un error 400 claro.
      return res.status(400).json({ error: parsed.error.issues });
    }
    try {
      // 3. Pasamos los datos ya validados al servicio.
      const nuevoBovino = await bovinoService.crear(parsed.data);
      res.status(201).json(nuevoBovino);
    } catch (error) {
      console.error("Error en el controlador al crear bovino:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }

  /**
   * ✅ ACTUALIZAR: Valida datos parciales y maneja el error 404.
   */
  static async actualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      
      // 2. Usamos el DTO de actualización que permite campos opcionales.
      const parsed = UpdateBovinoDto.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues });
      }
      
      // 3. Llamamos al método 'actualizar' del servicio.
      const actualizado = await bovinoService.actualizar(id, parsed.data);
      res.status(200).json(actualizado);

    } catch (error: any) {
      // 4. Atrapamos el error "no encontrado" que lanza el servicio.
      if (error.message.includes("no encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      console.error("Error en el controlador al actualizar bovino:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }

  /**
   * ✅ ELIMINAR: Maneja el error 404 y responde con 204.
   */
  static async eliminar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await bovinoService.eliminar(id);
      
      // 3. El estándar para un DELETE exitoso es devolver 204 (Sin Contenido).
      res.status(204).send();

    } catch (error: any) {
      // 4. Atrapamos el error "no encontrado" que lanza el servicio.
      if (error.message.includes("no encontrado")) {
        return res.status(404).json({ message: error.message });
      }
      console.error("Error en el controlador al eliminar bovino:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  }
}