import { ITratamiento } from '..//interfaces/ITratamientoRepository'
import { CasoEnfermedad, TipoUnidad } from '@prisma/client'

export class Tratamiento implements ITratamiento {
  constructor(
    public readonly id: number,
    public descripcion: string | null,
    public nombre: string,
    public unidad: TipoUnidad
  ) {}

  getId(): number {
    return this.id
  }

  getDescripcion(): string {
    if (this.descripcion === null) {
      return ''
    }
    return this.descripcion
  }

  getUnidad(): TipoUnidad {
    return this.unidad
  }

  getNombre(): string {
    return this.nombre
  }
}
