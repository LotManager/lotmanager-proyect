export class BovinoMetricsCalculator {
  
  /**
   * Recibe un bovino (con sus pesajes) y devuelve sus métricas calculadas.
   */
  public static calculate(bovino: any) {
    // 1. Peso Actual
    const pesoActual = (bovino.pesajes && bovino.pesajes.length > 0)
      ? bovino.pesajes[0].pesoActual 
      : bovino.pesoIngreso;
    
    // 2. Días Transcurridos
    const fechaIngreso = new Date(bovino.ingreso);
    const hoy = new Date();
    const diasTranscurridos = (hoy.getTime() - fechaIngreso.getTime()) / (1000 * 3600 * 24);
    const diasParaCalculo = Math.max(1, diasTranscurridos); // Evitar división por 0

    // 3. GMD
    const gananciaDePeso = pesoActual - bovino.pesoIngreso;
    const gmd = gananciaDePeso / diasParaCalculo;

    return {
      pesoActual: parseFloat(pesoActual.toFixed(2)),
      gmd: parseFloat(gmd.toFixed(2)),
    };
  }
}