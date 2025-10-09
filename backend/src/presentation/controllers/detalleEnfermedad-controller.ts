import { Request, Response } from 'express'
import { DetalleEnfermedadService } from '../../application/services/detalleEnfermedadService'
import { CreateDetalleEnfermedadDTO } from '../../application/dtos/detalleEnfermedad.dto'
import { UpdateDetalleEnfermedadDTO } from '../../application/dtos/detalleEnfermedad.dto'

export const DetalleEnfermedadController = {
  create: async (req: Request, res: Response) => {
    try {
      const dto: CreateDetalleEnfermedadDTO = req.body
      const result = await DetalleEnfermedadService.create(dto)
      res.status(201).json(result)
    } catch (error) {
      console.error('Error al crear DetalleEnfermedad:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  },

  getByBovino: async (req: Request, res: Response) => {
    try {
      const id_bovino = Number(req.params.id_bovino)
      const result = await DetalleEnfermedadService.getByBovino(id_bovino)
      res.json(result)
    } catch (error) {
      console.error('Error al obtener DetalleEnfermedad:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id_bovino = Number(req.params.id_bovino)
      const id_enfermedad = Number(req.params.id_enfermedad)
      const dto: UpdateDetalleEnfermedadDTO = req.body
      const result = await DetalleEnfermedadService.update(id_bovino, id_enfermedad, dto)
      res.json(result)
    } catch (error) {
      console.error('Error al actualizar DetalleEnfermedad:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id_bovino = Number(req.params.id_bovino)
      const id_enfermedad = Number(req.params.id_enfermedad)
      const result = await DetalleEnfermedadService.delete(id_bovino, id_enfermedad)
      res.json(result)
    } catch (error) {
      console.error('Error al eliminar DetalleEnfermedad:', error)
      res.status(500).json({ message: 'Error interno del servidor' })
    }
  },
}