import { Request, Response } from "express"
import { BovinoService } from "../../application/services/bovinoService"
import { PrismaBovinoRepository } from "../../infrastructure/repositorios/PrismaBovinoRepository"
import { Bovino } from "../../domain/entities/Bovino"

const service = new BovinoService(new PrismaBovinoRepository())

export const crearBovino = async (req: Request, res: Response) => {
  try {
    const nuevo = await service.crear(req.body)
    res.status(201).json(nuevo)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export const listarBovinos = async (req: Request, res: Response) => {
  const bovinos = await service.listar()
  res.json(bovinos)
}

export const obtenerBovino = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const bovino = await service.obtener(id)
  if (!bovino) {
    res.status(404).json({ error: "Bovino no encontrado" })
    return
  }
  res.json(bovino)
}

export const actualizarBovino = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const data = req.body
    const bovino = new Bovino(
      id,
      data.id_raza,
      data.id_corral,
      data.caravana,
      data.estado_bovino,
      data.estado_salud,
      new Date(data.ingreso),
      data.egreso ? new Date(data.egreso) : null,
      data.peso_ingreso,
      data.peso_egreso ?? null,
      data.sexo,
      data.tipo_bovino
    )
    const actualizado = await service.actualizar(bovino)
    res.json(actualizado)
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}

export const eliminarBovino = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    await service.eliminar(id)
    res.status(204).send()
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
}