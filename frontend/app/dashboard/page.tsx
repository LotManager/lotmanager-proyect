'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FaCog, 
  FaChartLine, 
  FaExclamationTriangle, 
  FaRulerHorizontal, 
  FaBell, 
  FaCheckCircle 
} from 'react-icons/fa';

// ✅ Importamos el servicio que conecta con el backend
import { getDashboardData, DashboardData } from '@/src/services/dashboard'; 

// ✅ Importamos el componente del gráfico
import WeightEvolutionChart from '@/src/components/dashboard/WeightEvolutionChart';

// --- COMPONENTES INTERNOS (Tarjetas pequeñas) ---

const MetricCard = ({ title, value, units, icon: Icon, color = 'text-[var(--color-secondary)]' }: any) => {
  const isEmpty = value === undefined || value === null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border flex flex-col justify-between h-32 transition-transform hover:scale-105">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-600">{title}</h3>
        {Icon && <Icon size={16} className={`${isEmpty ? 'text-gray-300' : 'text-gray-400'}`} />}
      </div>
      <div className="flex flex-col">
        <p className={`text-4xl font-bold ${isEmpty ? 'text-gray-300' : color}`}>
          {isEmpty ? '-' : value} <span className="text-sm text-gray-500 font-normal">{isEmpty ? '' : units}</span>
        </p>
      </div>
    </div>
  );
};

const AlertCard = ({ title, desc, date }: { title: string; desc: string; date: string }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer">
    <FaBell className="text-red-500 mt-1 flex-shrink-0" size={16} />
    <div className="flex-1">
      <p className="font-semibold text-sm text-red-800">{title}</p>
      <p className="text-xs text-red-600 line-clamp-2">{desc}</p>
      <p className="text-xs text-gray-500 mt-1 text-right">{date}</p>
    </div>
  </div>
);

// --- PÁGINA PRINCIPAL ---

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Carga de datos reales al montar el componente
  useEffect(() => {
    getDashboardData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error("Error cargando dashboard:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-gray-500 animate-pulse">Cargando panel de control...</div>;

  return (
      <div className="p-4 md:p-8 w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Panel de Control</h1>
            <p className="text-sm text-gray-500 mt-1">Resumen general del establecimiento</p>
          </div>
          <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full border">
            Actualizado: {new Date().toLocaleDateString('es-AR')}
          </div>
        </div>

        {/* Sección 1: KPIs (Indicadores Clave) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <MetricCard 
            title="Total Animales" 
            value={data?.kpis.totalAnimales} 
            icon={FaCog} 
            color="text-blue-600" 
          />
          <MetricCard 
            title="Peso Promedio" 
            value={data?.kpis.pesoPromedio} 
            units="kg" 
            icon={FaChartLine} 
            color="text-green-600" 
          />
          <MetricCard 
            title="GMD Promedio" 
            value={data?.kpis.gmdPromedio} 
            units="kg/día" 
            icon={FaRulerHorizontal} 
            color="text-purple-600" 
          />
          <MetricCard 
            title="Alertas Sanitarias" 
            value={data?.kpis.alertasCount} 
            icon={FaExclamationTriangle} 
            color="text-red-500" 
          />
        </div>

        {/* Sección 2: Gráficos y Detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* COLUMNA IZQUIERDA: Gráfico de Evolución */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border min-h-[400px]">
               <h3 className="font-bold text-lg text-gray-700 mb-6">Evolución de Peso (Estimado)</h3>
               <div className="h-[320px] w-full">
                 {/* Si hay datos, mostramos el gráfico. Si no, un mensaje. */}
                 {data?.pesoEvolution && data.pesoEvolution.length > 0 ? (
                    <WeightEvolutionChart data={data.pesoEvolution} />
                 ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg border border-dashed">
                      No hay datos suficientes para el gráfico
                    </div>
                 )}
               </div>
            </div>

            {/* COLUMNA DERECHA: Lista de Alertas */}
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md border h-full flex flex-col min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-700">Alertas Recientes</h3>
                {data?.alertasRecientes && data.alertasRecientes.length > 0 && (
                  <Link href="/dashboard/sanidad" className="text-sm text-blue-600 hover:underline font-medium">
                    Ver todas
                  </Link>
                )}
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                {/* Lógica para mostrar lista o mensaje de "Todo OK" */}
                {!data || data.alertasRecientes.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8 opacity-60">
                      <div className="bg-green-100 p-4 rounded-full mb-4">
                        <FaCheckCircle className="text-green-600 text-3xl" />
                      </div>
                      <h4 className="text-gray-800 font-semibold">Todo en orden</h4>
                      <p className="text-sm text-gray-500 mt-1">No hay alertas pendientes.</p>
                  </div>
                ) : (
                  data.alertasRecientes.map((alert, idx) => (
                      <AlertCard key={idx} title={alert.title} desc={alert.desc} date={alert.date} />
                  ))
                )}
              </div>
            </div>
        </div>
      </div>
  );
}