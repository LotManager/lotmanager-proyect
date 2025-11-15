import { Request, Response } from "express"
import { CorralMetricsService } from "../../application/services/CorralMetricsService"
import { PrismaBovinoRepository } from "../../infrastructure/repositorios/PrismaBovinoRepository"
import { PrismaPesajeRepository } from "../../infrastructure/repositorios/PrismaPesajeRepository"

const service = new CorralMetricsService(
  new PrismaBovinoRepository(),
  new PrismaPesajeRepository()
)

export const gmdPorCorral = async (req: Request, res: Response) => {
  try {
    const idCorral = Number(req.params.id)
    const gmd = await service.gmdPorCorral(idCorral)
    res.json({ idCorral, gmd })
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export const eficienciaPorCorral = async (req: Request, res: Response) => {
  try {
    const idCorral = Number(req.params.id)
    const result = await service.eficienciaPorCorral(idCorral)
    res.json({ idCorral, ...result })
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}