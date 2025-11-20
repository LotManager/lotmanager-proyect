import { TipoUnidad } from '@prisma/client'

export interface ITratamiento {
  getId(): number
  getDescripcion(): string
  getNombre(): string
  getUnidad(): TipoUnidad
}