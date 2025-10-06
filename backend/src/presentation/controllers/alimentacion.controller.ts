import { Request, Response } from "express"
import { AlimentacionService } from "../../application/services/alimentacionService"
import { PrismaAlimentacionRepository } from "../../infrastructure/repositorios/PrismaAlimentacionRepository"
import { PrismaCorralRepository } from "../../infrastructure/repositorios/PrismaCorralRepository"
import { PrismaSuministroRepository } from "../../infrastructure/repositorios/PrismaSuministroRepository"

const service = new AlimentacionService(
  new PrismaAlimentacionRepository(),
  new PrismaCorralRepository(),
  new PrismaSuministroRepository()
)

export class AlimentacionController {
  static async listar(_req: Request, res: Response) {
    const items = await service.listar()
    res.json(items)
  }

  static async obtenerPorId(req: Request, res: Response) {
    const id = Number(req.params.id)
    const item = await service.obtenerPorId(id)
    if (!item) return res.status(404).json({ message: "No encontrado" })
    res.json(item)
  }

  static async registrar(req: Request, res: Response) {
    const { id, descripcion, corral, suministros } = req.body
    // Si corral viene como objeto con id, pasar la misma estructura
    const creado = await service.registrar(id, descripcion, corral, suministros)
    res.status(201).json(creado)
  }

  static async actualizar(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { descripcion, corral, suministros } = req.body
    await service.actualizar(id, descripcion, corral, suministros)
    res.status(204).send()
  }

  static async eliminar(req: Request, res: Response) {
    const id = Number(req.params.id)
    await service.eliminar(id)
    res.status(204).send()
  }
}
