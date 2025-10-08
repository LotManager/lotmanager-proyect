import { Pesaje } from '../../domain/entities/Pesaje';
import { IPesajeRepository } from '../../domain/interfaces/IPesajeRepository';
import { IBovinoRepository } from '../../domain/interfaces/IBovinoRepository';
export class PesajeService {
  constructor(
    private readonly pesajeRepo: IPesajeRepository,
    private readonly bovinoRepo: IBovinoRepository
  ) {}

  /* ---------- Alta ---------- */
  async registrar(
    idBovino: number,
    fecha: Date,
    pesoDado: number
  ): Promise<Pesaje> {
    const bovino = await this.bovinoRepo.findById(idBovino);
    if (!bovino) throw new Error('Bovino no encontrado');

    const pesaje = new Pesaje(null, idBovino, fecha, pesoDado);
    return this.pesajeRepo.save(pesaje);
  }

  /* ---------- Historial ---------- */
  async historial(idBovino: number): Promise<Pesaje[]> {
    return this.pesajeRepo.findByBovinoId(idBovino);
  }

  /* ---------- REPORTES ---------- */

  /**
   * Ganancia total (kg) entre primera y última pesada
   */
  async gananciaTotal(idBovino: number): Promise<number> {
    const pesos = await this.historial(idBovino);
    if (pesos.length < 2) return 0;                       // guard clause
    const inicial = pesos[0]!.peso_dado;                  // ! = seguro que existe
    const final   = pesos[pesos.length - 1]!.peso_dado;
    return final - inicial;
  }

  /**
   * Ganancia promedio diaria (GMD) en el período
   */
  async gananciaMediaDiaria(idBovino: number): Promise<number> {
    const pesos = await this.historial(idBovino);
    if (pesos.length < 2) return 0;                       // guard clause
    const inicial = pesos[0]!;                            // objeto completo
    const final   = pesos[pesos.length - 1]!;

    const dias = Math.ceil(
      (final.fecha.getTime() - inicial.fecha.getTime()) / (1000 * 60 * 60 * 24)
    );
    const ganancia = final.peso_dado - inicial.peso_dado;
    return dias > 0 ? ganancia / dias : 0;
  }

  /**
   * Calcula la eficiencia alimenticia de un bovino
   * @param idBovino ID del bovino
   * @param getConsumo función que retorna el consumo de alimento (kg) para un corral y fecha
   */
  async eficienciaAlimenticia(idBovino: number, getConsumo: (idCorral: number, fecha: Date) => Promise<number>): Promise<any> {
    const bovino = await this.bovinoRepo.findById(idBovino);
    if (!bovino) throw new Error('Bovino no encontrado');
    const pesajes = await this.pesajeRepo.findByBovinoId(idBovino);
    if (pesajes.length < 2) throw new Error('No hay suficientes pesajes');

    // TypeScript ya sabe que hay al menos dos elementos
    let consumoTotal = 0;
    for (const pesaje of pesajes) {
      consumoTotal += await getConsumo(bovino.id_corral, pesaje.fecha);
    }
    const ganancia = pesajes[pesajes.length - 1]!.peso_dado - pesajes[0]!.peso_dado;
    const eficiencia = ganancia / consumoTotal;

    return { eficiencia, ganancia, consumoTotal };
  }
}


