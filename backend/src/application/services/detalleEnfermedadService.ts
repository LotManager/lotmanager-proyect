import { CreateDetalleEnfermedadDTO } from '../dtos/detalleEnfermedad.dto'
import { DetalleEnfermedadRepository } from '../../infrastructure/repositorios/PrismaDetalleEnfermedadRepository'

export const DetalleEnfermedadService = {
  create: async (dto: CreateDetalleEnfermedadDTO) => {
    return DetalleEnfermedadRepository.create(dto)
  },

  getByBovino: async (id_bovino: number) => {
    return DetalleEnfermedadRepository.findByBovino(id_bovino)
  },

  update: async (id_bovino: number, id_enfermedad: number, data: any) => {
    return DetalleEnfermedadRepository.update(id_bovino, id_enfermedad, data)
  },

  delete: async (id_bovino: number, id_enfermedad: number) => {
    return DetalleEnfermedadRepository.delete(id_bovino, id_enfermedad)
  },
}