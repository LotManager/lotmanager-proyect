// app/reportes/page.tsx
import { Suspense } from 'react';
import { getSanidadStats, getResumenMensual, getEficienciaCorral, getEvolucionPesoLote } from '@/lib/api';
import SanidadStats from '@/components/reportes/SanidadStats';
import ResumenMensual from '@/components/reportes/ResumenMensual';
import EficienciaPorCorral from '@/components/reportes/EficienciaPorCorral';
import EvolucionPesoLote from '@/components/reportes/EvolucionPesoLote';

export default async function ReportesPage() {
  const [sanidad, resumen, eficiencia, evolucion] = await Promise.all([
    getSanidadStats(),
    getResumenMensual(),
    getEficienciaCorral(),
    getEvolucionPesoLote(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Reportes y Estadísticas</h1>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SanidadStats rows={sanidad} />
        <ResumenMensual rows={resumen} />
      </section>

      <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EficienciaPorCorral data={eficiencia} />
        <EvolucionPesoLote data={evolucion} />
      </section>
    </main>
  );
}