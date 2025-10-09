'use client';
// components/reportes/EvolucionPesoLote.tsx
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { EvolucionMes } from '@/types/reportes';

export default function EvolucionPesoLote({ data }: { data: EvolucionMes[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);

    const option: EChartsOption = {
      xAxis: {
        type: 'category',
        data: data.map(d => d.mes),
      },
      yAxis: { type: 'value', name: 'Peso promedio (kg)' },
      series: [
        {
          type: 'bar',
          data: data.map(d => d.pesoPromedio),
          itemStyle: { color: '#3B82F6' },
        },
      ],
    };

    myChart.setOption(option);
    return () => myChart.dispose();
  }, [data]);

  return <div ref={chartRef} className="w-full h-80" />;
}