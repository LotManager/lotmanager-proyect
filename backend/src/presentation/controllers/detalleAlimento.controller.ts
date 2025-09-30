import { Request, Response } from "express"
import { createDetalleAlimento } from "../../use-cases/detalleAliemento/create"
import { DetalleAlimentoRepository } from "../../infrastructure/repositorios/detalleAlimento.repository"

export class DetalleAlimentoController {
  static async create(req: Request, res: Response) {
    try {
      const detalle = await createDetalleAlimento(req.body)
      res.status(201).json(detalle)
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const detalles = await DetalleAlimentoRepository.getAll()
      res.json(detalles)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}