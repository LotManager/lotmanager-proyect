'use client';
// components/reportes/EficienciaPorCorral.tsx
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { EficienciaBar } from '@/types/reportes';

export default function EficienciaPorCorral({ data }: { data: EficienciaBar[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current);

    const option: EChartsOption = {
      dataset: {
        source: data.map(d => [d.kgDiarios, d.corral]),
      },
      grid: { containLabel: true },
      xAxis: { name: 'kg/dia' },
      yAxis: { type: 'category' },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 0,
        max: Math.max(...data.map(d => d.kgDiarios)),
        text: ['Alto', 'Bajo'],
        dimension: 0,
        inRange: { color: ['#65B581', '#FFCE34', '#FD665F'] },
      },
      series: [{ type: 'bar', encode: { x: 0, y: 1 } }],
    };

    myChart.setOption(option);
    return () => myChart.dispose();
  }, [data]);

  return <div ref={chartRef} className="w-full h-80" />;
}