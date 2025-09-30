import { Request, Response } from "express"
import { createSuministro } from "../../use-cases/suministro/create"
import { SuministroRepository } from "../../infrastructure/repositorios/suministro.repository"

export class SuministroController {
  static async create(req: Request, res: Response) {
    try {
      const suministro = await createSuministro(req.body)
      res.status(201).json(suministro)
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }

  static async getAll(_req: Request, res: Response) {
    try {
      const suministros = await SuministroRepository.getAll()
      res.json(suministros)
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}