import { Request, Response } from "express"
import { SuministroService } from "../../application/services/suministroService"
import { PrismaSuministroRepository } from "../../infrastructure/repositorios/PrismaSuministroRepository"

const service = new SuministroService(new PrismaSuministroRepository())

export class SuministroController {
  static async listar(_req: Request, res: Response) {
    const suministros = await service.listar()
    res.json(suministros)
  }

  static async obtenerPorId(req: Request, res: Response) {
    const id = Number(req.params.id)
    const suministro = await service.obtenerPorId(id)
    if (!suministro) return res.status(404).json({ message: "No encontrado" })
    res.json(suministro)
  }

  static async registrar(req: Request, res: Response) {
    const { id, cantidad, idAlimentacion, idAlimento } = req.body
    const nuevo = await service.registrar(id, cantidad, idAlimentacion, idAlimento)
    res.status(201).json(nuevo)
  }

  static async actualizar(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { cantidad, idAlimentacion, idAlimento } = req.body
    await service.actualizar(id, cantidad, idAlimentacion, idAlimento)
    res.status(204).send()
  }

  static async eliminar(req: Request, res: Response) {
    const id = Number(req.params.id)
    await service.eliminar(id)
    res.status(204).send()
  }
}