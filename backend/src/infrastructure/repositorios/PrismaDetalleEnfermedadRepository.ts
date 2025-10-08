import { PrismaClient } from '@prisma/client'
import { CreateDetalleEnfermedadDTO } from '../../application/dtos/detalleEnfermedad.dto'

const prisma = new PrismaClient()

export const DetalleEnfermedadRepository = {
  create: async (data: CreateDetalleEnfermedadDTO) => {
    return prisma.detalleEnfermedad.create({ data })
  },

  findByBovino: async (id_bovino: number) => {
    return prisma.detalleEnfermedad.findMany({
      where: { id_bovino },
      include: {
        enfermedad: { select: { id: true, nombre: true } },
        corral: { select: { id: true } },
        bovino: { select: { id: true, estado_salud: true } },
      },
    })
  },

  update: async (id_bovino: number, id_enfermedad: number, data: any) => {
    return prisma.detalleEnfermedad.update({
      where: { id_bovino_id_enfermedad: { id_bovino, id_enfermedad } },
      data,
    })
  },

  delete: async (id_bovino: number, id_enfermedad: number) => {
    return prisma.detalleEnfermedad.delete({
      where: { id_bovino_id_enfermedad: { id_bovino, id_enfermedad } },
    })
  },
}