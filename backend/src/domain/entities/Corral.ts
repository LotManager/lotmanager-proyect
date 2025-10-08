import { TipoCorral } from "../enums/TipoCorral"

export class Corral {
  constructor(
    public readonly id: number,
    public readonly capacidadMaxima: number,
    public readonly numero: number,
    public readonly tipoCorral: TipoCorral,
    public readonly idAlimentacion: number | null,
    public readonly idFeedlot: number,
    public nombreAlimentacion?: string,
  ) {}
}