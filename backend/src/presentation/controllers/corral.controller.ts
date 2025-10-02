import { Request, Response } from "express"
import { CorralService } from "../../application/services/corralService"
import { PrismaCorralRepository } from "../../infrastructure/repositorios/PrismaCorralRepository"
import { CreateCorralDto } from "../../application/corral/dto/CreateCorralDto"

const service = new CorralService(new PrismaCorralRepository())

export class CorralController {
  static async listar(_req: Request, res: Response) {
    const corrales = await service.listar()
    res.json(corrales)
  }

  static async obtenerPorId(req: Request, res: Response) {
    const id = Number(req.params.id)
    const corral = await service.obtenerPorId(id)
    if (!corral) return res.status(404).json({ message: "No encontrado" })
    res.json(corral)
  }

  static async registrar(req: Request, res: Response) {
    const parsed = CreateCorralDto.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: parsed.error })
    const nuevo = await service.registrar(parsed.data)
    res.status(201).json(nuevo)
  }

  static async actualizar(req: Request, res: Response) {
    const id = Number(req.params.id)
    const parsed = CreateCorralDto.safeParse(req.body)
    if (!parsed.success) return res.status(400).json({ error: parsed.error })
    await service.actualizar(id, parsed.data)
    res.status(204).send()
  }

  static async eliminar(req: Request, res: Response) {
    const id = Number(req.params.id)
    await service.eliminar(id)
    res.status(204).send()
  }
}