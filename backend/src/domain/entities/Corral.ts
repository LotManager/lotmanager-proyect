import { TipoCorral } from "@prisma/client"; 

export class Corral {
  constructor(
    public readonly id: number,

    public capacidadMaxima: number,
    public numero: number,
    public tipo: TipoCorral,
    public feedlotId: number
    
  ) {}
}