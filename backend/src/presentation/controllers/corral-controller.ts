import { Request, Response } from "express"
import { CorralService } from "../../application/services/corralService"
import { PrismaCorralRepository } from "../../infrastructure/repositorios/PrismaCorralRepository"
import { CreateCorralDto, UpdateCorralDto  } from "../../application/dtos/CreateCorralDto"

const service = new CorralService(new PrismaCorralRepository())

export class CorralController {
  static async listar(_req: Request, res: Response) {
    try {
      const corrales = await service.listar()
      res.status(200).json(corrales)
    } catch (error) {
      console.error("Error al listar corrales:", error)
      res.status(500).json({ message: "Error al obtener corrales" })
    }
  }

  static async obtenerPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const corral = await service.obtenerPorId(id)
      if (!corral) {
        return res.status(404).json({ message: "Corral no encontrado" })
      }
      res.status(200).json(corral)
    } catch (error) {
      console.error("Error al obtener corral:", error)
      res.status(500).json({ message: "Error al obtener corral" })
    }
  }

  static async registrar(req: Request, res: Response) {
    try {
      const parsed = CreateCorralDto.safeParse(req.body)
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error })
      }
      const nuevo = await service.registrar(parsed.data)
      res.status(201).json(nuevo)
    } catch (error) {
      console.error("Error al registrar corral:", error)
      res.status(500).json({ message: "Error al registrar corral" })
    }
  }

static async actualizar(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const parsed = UpdateCorralDto.safeParse(req.body); 
    
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }

    const corralActualizado = await service.actualizar(id, parsed.data);

    res.status(200).json(corralActualizado);

  } catch (error) {
    if (error instanceof Error && error.message === "Corral no encontrado") {
      return res.status(404).json({ message: error.message });
    }
    console.error("Error al actualizar corral:", error);
    res.status(500).json({ message: "Error al actualizar corral" });
  }
}

  static async eliminar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      await service.eliminar(id)
      res.status(204).send()
    } catch (error) {
      console.error("Error al eliminar corral:", error)
      res.status(500).json({ message: "Error al eliminar corral" })
    }
  }
}