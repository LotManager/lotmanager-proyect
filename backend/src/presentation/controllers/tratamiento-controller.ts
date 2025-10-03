import { Request, Response } from 'express'
import { TratamientoService } from '../../application/services/tratamientoService'

export class TratamientoController {
  constructor(private readonly service: TratamientoService) {}

  async getAll(_req: Request, res: Response) {
    const tratamientos = await this.service.getAll()
    res.json(tratamientos)
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    if(!id) return res.status(400).json({message: 'No se introdujo un id'})
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.status(400).json({ message: 'ID inválido' })

    const tratamiento = await this.service.getById(parsedId)
    if (!tratamiento) return res.status(404).json({ message: 'No encontrado' })

    res.json(tratamiento)
  }

  async getWithEnfermedades(req: Request, res: Response) {
    const { id } = req.params
    if(!id) return res.status(400).json({message: 'No se introdujo un id'})
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.status(400).json({ message: 'ID inválido' })

    const tratamiento = await this.service.getWithEnfermedades(parsedId)
    if (!tratamiento) return res.status(404).json({ message: 'No encontrado' })

    res.json(tratamiento)
  }

  async create(req: Request, res: Response) {
    try {
      const tratamiento = await this.service.create(req.body)
      res.status(201).json(tratamiento)
    } catch (error) {
      res.status(400).json({ message: 'Datos inválidos', error })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: 'Falta el parámetro ID' })

    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.status(400).json({ message: 'ID inválido' })

    try {
      const updated = await this.service.update(parsedId, req.body)
      if (!updated) return res.status(404).json({ message: 'No encontrado' })
      res.json(updated)
    } catch (error) {
      res.status(400).json({ message: 'Datos inválidos', error })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    if(!id) return res.status(400).json({message: 'No se introdujo un id'})
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.status(400).json({ message: 'ID inválido' })

    await this.service.delete(parsedId)
    res.status(204).send()
  }
}