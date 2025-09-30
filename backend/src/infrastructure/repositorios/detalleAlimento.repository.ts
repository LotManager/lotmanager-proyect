import prisma from '../../config/db'
import { CreateDetalleAlimentoDtoType } from "../../application/detalleAlimento/dtos/createDetalleAlimento.dto"

export const DetalleAlimentoRepository = {
  create: async (data: CreateDetalleAlimentoDtoType) => {
    return prisma.detalleAlimento.create({ data })
  },
  getAll: async () => {
    return prisma.detalleAlimento.findMany()
  }
}