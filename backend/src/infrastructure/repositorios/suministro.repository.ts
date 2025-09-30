import prisma from "../../config/db"
import { CreateSuministroDtoType } from "../../application/suministro/dtos/createSuministro.dto"

export const SuministroRepository = {
  create: async (data: CreateSuministroDtoType) => {
    return prisma.suministro.create({ data })
  },
  getAll: async () => {
    return prisma.suministro.findMany({ include: { alimento: true, alimentacion: true } })
  }
}