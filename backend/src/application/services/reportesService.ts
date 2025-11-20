import { PrismaClient, EstadoSalud, SituacionBovino } from "@prisma/client";
import db from "../../config/db";
import { BovinoMetricsCalculator } from "./BovinoMetric";

export class ReportesService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = db;
  }

  async getCorralEfficiency() {
    // Obtener todos los corrales con sus bovinos activos y sus pesajes
    const corrales = await this.prisma.corral.findMany({
      include: {
        bovinos: {
          where: { situacionBovino: SituacionBovino.ENCORRAL },
          include: {
            pesajes: {
              orderBy: { fecha: "desc" },
              take: 1,
            },
          },
        },
      },
    });

    const reportData = corrales.map((corral) => {
      const totalBovinos = corral.bovinos.length;
      if (totalBovinos === 0) {
        return {
          corralId: corral.id,
          nombre: `Corral ${corral.numero}`,
          eficiencia: 0,
          gmd: 0,
        };
      }

      let totalGmd = 0;
      corral.bovinos.forEach((bovino) => {
        const metrics = BovinoMetricsCalculator.calculate(bovino);
        totalGmd += metrics.gmd;
      });

      const avgGmd = totalGmd / totalBovinos;
      // Calculo de eficiencia simple: Meta de 1.5 kg/dia = 100%
      const eficiencia = Math.min((avgGmd / 1.5) * 100, 100);

      return {
        corralId: corral.id,
        nombre: `Corral ${corral.numero}`,
        eficiencia: parseFloat(eficiencia.toFixed(1)),
        gmd: parseFloat(avgGmd.toFixed(2)),
      };
    });

    // Ordenar por eficiencia descendente o numero de corral
    return reportData.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  async getHealthStats() {
    const totalBovinos = await this.prisma.bovino.count({
      where: { situacionBovino: SituacionBovino.ENCORRAL },
    });

    if (totalBovinos === 0) {
      return {
        sanosPercentage: 0,
        enTratamientoPercentage: 0,
        criticosPercentage: 0,
        mortalidadPercentage: 0,
      };
    }

    const sanos = await this.prisma.bovino.count({
      where: {
        situacionBovino: SituacionBovino.ENCORRAL,
        estadoSalud: EstadoSalud.SANO,
      },
    });

    const enfermos = await this.prisma.bovino.count({
      where: {
        situacionBovino: SituacionBovino.ENCORRAL,
        estadoSalud: EstadoSalud.ENFERMO,
      },
    });

    // Asumimos criticos como una subcategoría o si hubiera un estado CRITICO.
    // Por ahora, usaremos un valor dummy bajo o basado en alguna lógica futura.
    // Vamos a asumir que el 10% de los enfermos son críticos para este ejemplo,
    // o 0 si no hay lógica real aun.
    const criticos = Math.round(enfermos * 0.1); 

    // Mortalidad en el último mes
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);

    const fallecidosMes = await this.prisma.bovino.count({
      where: {
        estadoSalud: EstadoSalud.FALLECIDO,
        egreso: {
          gte: unMesAtras,
        },
      },
    });
    
    // Mortalidad se calcula sobre el total histórico del periodo o sobre el stock actual + fallecidos?
    // Usualmente sobre stock promedio. Usaremos stock actual para simplificar.
    const mortalidadRate = (fallecidosMes / (totalBovinos + fallecidosMes)) * 100;

    return {
      sanosPercentage: parseFloat(((sanos / totalBovinos) * 100).toFixed(1)),
      enTratamientoPercentage: parseFloat(((enfermos / totalBovinos) * 100).toFixed(1)),
      criticosPercentage: parseFloat(((criticos / totalBovinos) * 100).toFixed(1)), // Placeholder
      mortalidadPercentage: parseFloat(mortalidadRate.toFixed(1)),
    };
  }

  async getMonthlySummary() {
    const bovinos = await this.prisma.bovino.findMany({
      where: { situacionBovino: SituacionBovino.ENCORRAL },
      include: {
        pesajes: {
          orderBy: { fecha: "desc" },
          take: 1,
        },
      },
    });

    if (bovinos.length === 0) {
      return {
        pesoPromedioInicial: 0,
        pesoPromedioActual: 0,
        gananciaTotal: 0,
        gmdPromedio: 0,
      };
    }

    let totalPesoInicial = 0;
    let totalPesoActual = 0;
    let totalGmd = 0;

    bovinos.forEach((bovino) => {
      const metrics = BovinoMetricsCalculator.calculate(bovino);
      totalPesoInicial += bovino.pesoIngreso;
      totalPesoActual += metrics.pesoActual;
      totalGmd += metrics.gmd;
    });

    const count = bovinos.length;

    return {
      pesoPromedioInicial: parseFloat((totalPesoInicial / count).toFixed(1)),
      pesoPromedioActual: parseFloat((totalPesoActual / count).toFixed(1)),
      gananciaTotal: parseFloat((totalPesoActual - totalPesoInicial).toFixed(1)), // Ganancia total acumulada del stock actual
      gmdPromedio: parseFloat((totalGmd / count).toFixed(2)),
    };
  }

  async getWeightEvolution() {
    // Obtener pesajes de los últimos 6 meses
    const seisMesesAtras = new Date();
    seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);

    const pesajes = await this.prisma.pesaje.findMany({
      where: {
        fecha: { gte: seisMesesAtras },
      },
      include: {
        bovino: {
          include: {
            corral: true,
          },
        },
      },
      orderBy: { fecha: "asc" },
    });

    // Agrupar por Mes y Corral
    // Estructura deseada: { month: "Ene", "Corral 1": 300, "Corral 2": 320 }
    
    const dataMap = new Map<string, { [key: string]: any }>();
    const corralesSet = new Set<string>();

    pesajes.forEach((pesaje) => {
      const mes = pesaje.fecha.toLocaleString('es-ES', { month: 'short' }); // "ene", "feb"
      // Ojo: toLocaleString depende del locale del sistema servidor. 
      // Mejor usar algo más determinista si es posible, pero para MVP está bien.
      
      const key = mes;
      const corralName = `Corral ${pesaje.bovino.corral.numero}`;
      corralesSet.add(corralName);

      if (!dataMap.has(key)) {
        dataMap.set(key, { month: key, counts: {} });
      }

      const entry = dataMap.get(key)!;
      
      // Acumular pesos para promediar después
      if (!entry[corralName]) entry[corralName] = { sum: 0, count: 0 };
      entry[corralName].sum += pesaje.pesoActual;
      entry[corralName].count += 1;
    });

    // Formatear salida
    const data = Array.from(dataMap.values()).map((entry) => {
      const row: any = { month: entry.month };
      corralesSet.forEach((corral) => {
        if (entry[corral]) {
          row[corral] = parseFloat((entry[corral].sum / entry[corral].count).toFixed(1));
        } else {
          row[corral] = null; // O 0, o interpolar
        }
      });
      return row;
    });

    // Generar series dinámicas
    const series = Array.from(corralesSet).map((corral, index) => {
      const colors = ["#3F51B5", "#009688", "#F57C00", "#E91E63", "#9C27B0", "#2196F3"];
      return {
        dataKey: corral,
        name: corral,
        color: colors[index % colors.length],
      };
    });

    return { data, series };
  }
}
