import { Request, Response } from "express"
import { PesajeService } from "../../application/services/pesajeService"
import { PrismaPesajeRepository } from "../../infrastructure/repositorios/PrismaPesajeRepository"
import { Pesaje } from "../../domain/entities/Pesaje"

const service = new PesajeService(new PrismaPesajeRepository())

export const crearPesaje = async (req: Request, res: Response) => {
  try {
    const { id_bovino, fecha, peso_dado } = req.body
    const nuevo = await service.registrar(
      new Pesaje(null, Number(id_bovino), new Date(fecha), Number(peso_dado))
    )
    res.status(201).json(nuevo)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export const listarPesajesPorBovino = async (req: Request, res: Response) => {
  try {
    const id_bovino = Number(req.params.id)
    const pesajes = await service.historial(id_bovino)
    res.json(pesajes)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}