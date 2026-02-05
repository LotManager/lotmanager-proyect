import { ICorralRepository } from "../../domain/interfaces/ICorralRepository";
import { IBovinoRepository } from "../../domain/interfaces/IBovinoRepository";
import { BovinoMetricsCalculator } from "./BovinoMetric";

export class CorralViewService {
  constructor(
    private readonly corralRepo: ICorralRepository,
    private readonly bovinoRepo: IBovinoRepository
  ) {}

  async getCorralesForTable() {
    const corralesRaw = await this.corralRepo.findAllConUltimoSuministro();

    return corralesRaw.map((c) => {
      const ultimoSuministro = c.suministros[0];
      const nombreDieta = ultimoSuministro ? ultimoSuministro.dieta.nombre : "Sin Dieta Asignada";

      return {
        id: c.id,
        numero: c.numero,
        capacidadMaxima: c.capacidadMaxima,
        tipo: c.tipo,
        feedlotId: c.feedlotId,
        nombreDieta: nombreDieta,
      };
    });
  }

  async getCorralDetalle(idCorral: number) {
    // 1. Datos del Corral + Dieta
    const corral = await this.corralRepo.findByIdConUltimoSuministro(idCorral);
    if (!corral) throw new Error("Corral no encontrado");

    // 2. Bovinos + Pesajes (¡El método que acabamos de arreglar!)
    const bovinos = await this.bovinoRepo.findByCorralConRelaciones(idCorral);

    // 3. Consumo últimos 30 días (Ya lo tenías en el repo)
    const diasAnalisis = 30;
    const consumoUltimos30Dias = await this.corralRepo.getConsumoReciente(idCorral, diasAnalisis);

    // 4. NUEVO: Obtener historial de suministros (últimos 5)
    const ultimosSuministrosRaw = await this.corralRepo.findUltimosSuministros(idCorral, 5);

    // --- CÁLCULOS ---
    let sumaGmd = 0;
    let pesoTotalActual = 0;
    const cantidadBovinos = bovinos.length;

    for (const bovino of bovinos) {
      const metricas = BovinoMetricsCalculator.calculate(bovino);
      sumaGmd += metricas.gmd;
      pesoTotalActual += metricas.pesoActual;
    }

    // Promedios
    const gmdPromedio = cantidadBovinos > 0 ? sumaGmd / cantidadBovinos : 0;
    const gananciaPesoEstimada = gmdPromedio * cantidadBovinos * diasAnalisis;
    
    // Eficiencia (Peso Ganado / Alimento)
    const eficiencia = consumoUltimos30Dias > 0 ? gananciaPesoEstimada / consumoUltimos30Dias : 0;

    // Nombre de la dieta
    const nombreDieta = corral.suministros?.[0]?.dieta?.nombre || "Sin Dieta Asignada";

        const historialSuministros = ultimosSuministrosRaw.map(s => ({
      id: s.id,
      fecha: s.fecha, // Es un objeto Date
      nombreDieta: s.dieta.nombre,
      cantidadKg: s.cantidadKg
    }));


    return {
      id: corral.id,
      numero: corral.numero,
      capacidadMaxima: corral.capacidadMaxima,
      tipo: corral.tipo,
      nombreAlimentacion: nombreDieta,
      
      bovinosCount: cantidadBovinos,
      gmdKgDia: parseFloat(gmdPromedio.toFixed(3)),
      relacionPesoConsumo: parseFloat(eficiencia.toFixed(3)),
      pesoTotal: parseFloat(pesoTotalActual.toFixed(2)),
      consumoDiario: parseFloat((consumoUltimos30Dias / diasAnalisis).toFixed(2)), 
      historialSuministros: historialSuministros
    };
  }
}