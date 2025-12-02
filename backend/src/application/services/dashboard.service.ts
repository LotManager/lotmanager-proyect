import prisma from "../../config/db";
import { BovinoMetricsCalculator } from "../../application/services/BovinoMetric";

export class DashboardService {
  
  async getSummary() {
    // --- 1. Obtener datos para KPIs (Total, Peso, GMD) ---
    const bovinos = await prisma.bovino.findMany({
      where: { situacionBovino: "ENCORRAL" }, // Solo activos
      include: { 
        pesajes: { orderBy: { fecha: 'desc' }, take: 1 } 
      }
    });

    let sumaPeso = 0;
    let sumaGmd = 0;
    const totalAnimales = bovinos.length;

    // Calculamos métricas individuales y sumamos
    for (const b of bovinos) {
      const m = BovinoMetricsCalculator.calculate(b);
      sumaPeso += m.pesoActual;
      sumaGmd += m.gmd;
    }

    const pesoPromedio = totalAnimales > 0 ? sumaPeso / totalAnimales : 0;
    const gmdPromedio = totalAnimales > 0 ? sumaGmd / totalAnimales : 0;

    // --- 2. Obtener Alertas (Animales Enfermos) ---
    // Contamos cuántos están enfermos actualmente
    const alertasCount = await prisma.bovino.count({
      where: { estadoSalud: "ENFERMO", situacionBovino: "ENCORRAL" }
    });

    // Buscamos los últimos casos de enfermedad para la lista de "Alertas Recientes"
    const ultimosCasos = await prisma.casoEnfermedad.findMany({
      take: 5,
      orderBy: { fechaDeteccion: 'desc' },
      include: { enfermedad: true, bovino: true }
    });

    const alertasRecientes = ultimosCasos.map(caso => ({
      title: `Caso: ${caso.enfermedad.nombre}`,
      desc: `Bovino #${caso.bovino.caravana} detectado enfermo.`,
      date: new Date(caso.fechaDeteccion).toLocaleDateString('es-AR')
    }));

    // --- 3. Datos para el Gráfico (Evolución de Peso - Simulación Realista) ---
    // Para hacerlo real 100% necesitaríamos una query compleja de agrupación por mes.
    // Por ahora, tomaremos los pesajes de los últimos 6 meses y promediaremos.
    const fechaHace6Meses = new Date();
    fechaHace6Meses.setMonth(fechaHace6Meses.getMonth() - 6);

    const pesajesHistoricos = await prisma.pesaje.findMany({
      where: { fecha: { gte: fechaHace6Meses } },
      orderBy: { fecha: 'asc' }
    });

    // Agrupamos pesajes por "Mes-Año" en memoria (simple y efectivo)
    const evolucionMap = new Map<string, { sum: number, count: number }>();
    
    pesajesHistoricos.forEach(p => {
      const mes = new Date(p.fecha).toLocaleString('es-AR', { month: 'short' }); // "ene", "feb"
      const current = evolucionMap.get(mes) || { sum: 0, count: 0 };
      evolucionMap.set(mes, { sum: current.sum + p.pesoActual, count: current.count + 1 });
    });

    const pesoEvolution = Array.from(evolucionMap.entries()).map(([month, data]) => ({
      month: month.charAt(0).toUpperCase() + month.slice(1), // Capitalizar "Ene"
      peso: parseFloat((data.sum / data.count).toFixed(1))
    }));

    // Si no hay datos históricos, mandamos un array vacío o placeholder
    if (pesoEvolution.length === 0) {
        // Opcional: Devolver datos vacíos o un placeholder
    }

    // --- RETORNO FINAL ---
    return {
      kpis: {
        totalAnimales,
        pesoPromedio: parseFloat(pesoPromedio.toFixed(1)),
        gmdPromedio: parseFloat(gmdPromedio.toFixed(3)),
        alertasCount
      },
      pesoEvolution,
      alertasRecientes
    };
  }
}