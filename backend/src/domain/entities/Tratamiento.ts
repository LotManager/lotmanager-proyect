import { Enfermedad } from './Enfermedad'
import { ITratamiento } from '..//interfaces/ITratamientoRepository'

export class Tratamiento implements ITratamiento {
  constructor(
    public readonly id: number,
    public descripcion: string,
    public dosisAplicada: string,
    public nombre: string,
    private enfermedades: Enfermedad[] = []
  ) {}

  getId(): number {
    return this.id
  }

  getDescripcion(): string {
    return this.descripcion
  }

  getDosisAplicada(): string {
    return this.dosisAplicada
  }

  getNombre(): string {
    return this.nombre
  }

  getEnfermedades(): Enfermedad[] {
    return this.enfermedades
  }

  aplicarDosis(nuevaDosis: string): void {
    this.dosisAplicada = nuevaDosis
  }
}