// src/application/services/bovinoView.service.ts

import { IBovinoRepository } from "../../domain/interfaces/IBovinoRepository";

export class BovinoViewService {
  constructor(private readonly repo: IBovinoRepository) {}

  /**
   * Prepara la lista de bovinos para la tabla principal del frontend.
   * Este método es el único que el controlador necesitará para la vista de listado.
   */
  async getBovinosForTable() {
    // 1. OBTENER DATOS OPTIMIZADOS
    // Llamamos al método del repositorio que trae los bovinos junto con
    // su último pesaje y los datos del corral en una sola consulta.
    const bovinosConRelaciones = await this.repo.findAllConRelaciones();

    // 2. TRANSFORMAR Y CALCULAR
    // Iteramos sobre cada bovino para calcular las métricas que el frontend necesita.
    return bovinosConRelaciones.map((bovino) => {
      
      // --- Cálculo del Peso Actual ---
      // Si el animal tiene algún pesaje, usamos el peso del último registro.
      // Si no, usamos su peso de ingreso.
      const pesoActual = bovino.pesaje.length > 0 ? bovino.pesaje[0].peso_dado : bovino.peso_ingreso;
      
      // --- Cálculo de la Edad en meses ---
      const fechaIngreso = new Date(bovino.ingreso);
      const hoy = new Date();
      // Diferencia en milisegundos, convertido a días.
      const diasTranscurridos = (hoy.getTime() - fechaIngreso.getTime()) / (1000 * 3600 * 24);
      // Usamos Math.max para evitar dividir por cero si el animal ingresó hoy.
      const diasParaCalculo = Math.max(1, diasTranscurridos);
      const edadEnMeses = Math.floor(diasParaCalculo / 30.44); // 30.44 es el promedio de días en un mes

      // --- Cálculo de la GMD (Ganancia Media Diaria) ---
      // Usamos la fórmula que definiste: (último peso - peso inicial) / días.
      const gananciaDePeso = pesoActual - bovino.peso_ingreso;
      const gmd = gananciaDePeso / diasParaCalculo;

      // --- Preparación de datos adicionales ---
      const nombreCorral = bovino.corral ? `Corral ${bovino.corral.numero}` : "Sin Asignar";

      // 3. DEVOLVER OBJETO LIMPIO
      // Creamos el objeto final con los nombres de propiedad en camelCase
      // y los datos formateados que el frontend espera.
      return {
        id: bovino.id,
        caravana: bovino.caravana,
        pesoActual: parseFloat(pesoActual.toFixed(2)),
        edad: edadEnMeses,
        nombreCorral: nombreCorral,
        gmd: parseFloat(gmd.toFixed(2)), // Lo formateamos a 2 decimales
        estado_salud: bovino.estado_salud,
      };
    });
  }
    async getBovinoById(id: number) {
    // Simplemente le pide al repositorio que busque el bovino.
    // No necesita cálculos adicionales.
    return this.repo.findById(id);
  }
}
