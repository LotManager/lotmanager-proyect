import { IBovinoRepository } from "../../domain/interfaces/IBovinoRepository"
import { IPesajeRepository } from "../../domain/interfaces/IPesajeRepository"
import prisma from "../../config/db"

export class CorralMetricsService {
  constructor(
    private readonly bovinoRepo: IBovinoRepository,
    private readonly pesajeRepo: IPesajeRepository
  ) {}

  /**
   * Ganancia Media Diaria (GMD) promedio de un corral
   * Calcula la GMD de cada bovino y luego promedia
   */
  async gmdPorCorral(idCorral: number): Promise<number> {
    const bovinos = await this.bovinoRepo.findByCorral(idCorral)
    if (bovinos.length === 0) return 0

    let sumaGmd = 0
    let count = 0

    for (const b of bovinos) {
      const pesajes = await this.pesajeRepo.findByBovino(b.id!)

      const pesoInicial = b.peso_ingreso
      const pesoFinal =
        pesajes.length > 0
          ? pesajes[pesajes.length - 1]!.peso_dado
          : b.peso_ingreso

      const dias = Math.max(
        1,
        Math.round(
          (new Date().getTime() - b.ingreso.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )

      const gmdBovino = (pesoFinal - pesoInicial) / dias
      sumaGmd += gmdBovino
      count++
    }

    return count > 0 ? sumaGmd / count : 0
  }

  /**
   * Eficiencia de un corral
   * Peso total actual de los bovinos dividido el consumo diario de la dieta
   */
  async eficienciaPorCorral(idCorral: number): Promise<{
    eficiencia: number
    pesoTotal: number
    consumoDiario: number
  }> {
    const bovinos = await this.bovinoRepo.findByCorral(idCorral)
    if (bovinos.length === 0) {
      return { eficiencia: 0, pesoTotal: 0, consumoDiario: 0 }
    }

    // 1. Calcular peso total actual
    let pesoTotal = 0
    for (const b of bovinos) {
      const pesajes = await this.pesajeRepo.findByBovino(b.id!)
      if (pesajes.length > 0) {
        pesoTotal += pesajes[pesajes.length - 1]!.peso_dado
      } else {
        pesoTotal += b.peso_ingreso
      }
    }

    // 2. Obtener consumo diario según la dieta del corral
    const corral = await prisma.corral.findUnique({
      where: { id: idCorral },
      include: {
        alimentacion: {
          include: { Suministro: true }
        }
      }
    })

    if (!corral?.alimentacion) {
      return { eficiencia: 0, pesoTotal, consumoDiario: 0 }
    }

    const consumoDiario = corral.alimentacion.Suministro
      .reduce((acc, s) => acc + s.cantidad, 0)

    // 3. Calcular eficiencia
    const eficiencia =
      consumoDiario > 0 ? pesoTotal / consumoDiario : 0

    return { eficiencia, pesoTotal, consumoDiario }
  }
}