import { Request, Response } from "express"
import { AlimentoService } from "../../application/services/alimentoService"
import { PrismaAlimentoRepository } from "../../infrastructure/repositorios/PrismaAlimentoRepository"
import { PrismaSuministroRepository } from "../../infrastructure/repositorios/PrismaSuministroRepository"

const service = new AlimentoService(new PrismaAlimentoRepository(), undefined, new PrismaSuministroRepository())

export class AlimentoController {
  static async listar(_req: Request, res: Response) {
    const alimentos = await service.listar()
    res.json(alimentos)
  }

  static async obtenerPorId(req: Request, res: Response) {
    const id = Number(req.params.id)
    const alimento = await service.obtenerPorId(id)
    if (!alimento) return res.status(404).json({ message: "No encontrado" })
    res.json(alimento)
  }

  static async registrar(req: Request, res: Response) {
    const { id, nroSerie: nroSerieRaw, vencimiento, idDetalleAlimento, suministros } = req.body
    // convertir vencimiento a Date si viene como string
    const fecha = vencimiento ? new Date(vencimiento) : undefined
    const nroSerie = nroSerieRaw !== undefined && nroSerieRaw !== null ? Number(nroSerieRaw) : undefined
    if (nroSerie === undefined || !Number.isFinite(nroSerie) || !Number.isInteger(nroSerie)) {
      return res.status(400).json({ message: "nroSerie inválido: debe ser un número entero" })
    }
    const nuevo = await service.registrar(id, nroSerie, fecha as Date, idDetalleAlimento, suministros)
    res.status(201).json(nuevo)
  }

  static async actualizar(req: Request, res: Response) {
    const id = Number(req.params.id)
    const { nroSerie: nroSerieRaw, vencimiento, idDetalleAlimento, suministros } = req.body
    const fecha = vencimiento ? new Date(vencimiento) : undefined
    const nroSerie = nroSerieRaw !== undefined && nroSerieRaw !== null ? Number(nroSerieRaw) : undefined
    if (nroSerie === undefined || !Number.isFinite(nroSerie) || !Number.isInteger(nroSerie)) {
      return res.status(400).json({ message: "nroSerie inválido: debe ser un número entero" })
    }
    await service.actualizar(id, nroSerie, fecha as Date, idDetalleAlimento, suministros)
    res.status(204).send()
  }

  static async eliminar(req: Request, res: Response) {
    const id = Number(req.params.id)
    await service.eliminar(id)
    res.status(204).send()
  }
}
