// src/application/services/bovinoView.service.ts

import { IBovinoRepository } from "../../domain/interfaces/IBovinoRepository";

export class BovinoViewService {
  constructor(private readonly repo: IBovinoRepository) {}

  async getBovinosForTable() {
    // 1. OBTENER DATOS OPTIMIZADOS
    const bovinosConRelaciones = await this.repo.findAllConRelaciones();

    // 2. TRANSFORMAR Y CALCULAR
    return bovinosConRelaciones.map((bovino) => {
      
      // --- Cálculo del Peso Actual ---
      const pesoActual = (bovino.pesajes && bovino.pesajes.length > 0)
        ? bovino.pesajes[0].pesoActual 
        : bovino.pesoIngreso;
      
      // --- Cálculo de Días (Necesario para GMD) ---
      const fechaIngreso = new Date(bovino.ingreso);
      const hoy = new Date();
      const diasTranscurridos = (hoy.getTime() - fechaIngreso.getTime()) / (1000 * 3600 * 24);
      // Evitamos dividir por cero
      const diasParaCalculo = Math.max(1, diasTranscurridos);

      // --- Cálculo de la GMD ---
      const gananciaDePeso = pesoActual - bovino.pesoIngreso;
      const gmd = gananciaDePeso / diasParaCalculo;

      // --- Preparación de datos adicionales ---
      const nombreCorral = bovino.corral ? `Corral ${bovino.corral.numero}` : "Sin Asignar";

      // 3. DEVOLVER OBJETO LIMPIO (Sin Edad)
      return {
        id: bovino.id,
        caravana: bovino.caravana,
        pesoActual: parseFloat(pesoActual.toFixed(2)),
        nombreCorral: nombreCorral,
        corralId: bovino.corralId,
        gmd: parseFloat(gmd.toFixed(2)),
        estadoSalud: bovino.estadoSalud,
      };
    });
  }

  async getBovinoById(id: number) {
    return this.repo.findById(id);
  }
}