import { Enfermedad } from '../entities/Enfermedad'

export interface ITratamiento {
  getId(): number
  getDescripcion(): string
  getDosisAplicada(): string
  getNombre(): string
  getEnfermedades(): Enfermedad[]
  aplicarDosis(nuevaDosis: string): void
}