import { Request, Response } from "express"
import { DetalleAlimentoService } from "../../application/services/detalleAlimentoService"
import { PrismaDetalleAlimentoRepository } from "../../infrastructure/repositorios/PrismaDetalleAlimentoRepository"

const service = new DetalleAlimentoService(new PrismaDetalleAlimentoRepository())

export class DetalleAlimentoController {
  static async listar(_req: Request, res: Response) {
    const detalles = await service.listar()
    res.json(detalles)
  }

  static async obtenerPorId(req: Request, res: Response) {
    const id = Number(req.params.id)
    const detalle = await service.obtenerPorId(id)
    if (!detalle) return res.status(404).json({ message: "No encontrado" })
    res.json(detalle)
  }

  static async registrar(req: Request, res: Response) {
    const { id, nombre, tipo, idAlimento } = req.body
    const nuevo = await service.registrar(id, nombre, tipo, idAlimento)
    res.status(201).json(nuevo)
  }

  static async actualizar(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { nombre, tipo, idAlimento } = req.body
    await service.actualizar(id, nombre, tipo, idAlimento)
    res.status(204).send()
  }

  static async eliminar(req: Request, res: Response) {
    const id = Number(req.params.id)
    await service.eliminar(id)
    res.status(204).send()
  }
}