// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react'; // 1. Importamos hooks
import Link from 'next/link';
import WeightEvolutionChart from 'src/components/dashboard/WeightEvolutionChart';
import { getDashboardData } from 'src/lib/api'; // 2. Importamos la función de datos
// 3. Agregamos FaCheckCircle a los imports
import { FaCog, FaChartLine, FaExclamationTriangle, FaRulerHorizontal, FaBell, FaCheckCircle } from 'react-icons/fa';

// --- COMPONENTES INTERNOS (MetricCard y AlertCard) ---

interface MetricCardProps {
  title: string;
  value: string | number;
  units?: string;
  progress?: string;
  icon?: React.ComponentType<any>;
  color?: string;
}

const MetricCard = ({ title, value, units, icon: Icon, color = 'text-[var(--color-secondary)]' }: any) => {
  const isEmpty = !value || value === 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border flex flex-col justify-between h-32">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-600">{title}</h3>
        {Icon && <Icon size={16} className={`${isEmpty ? 'text-gray-300' : 'text-gray-400'}`} />}
      </div>
      <div className="flex flex-col">
        <p className={`text-4xl font-bold ${isEmpty ? 'text-gray-300' : color}`}>
          {isEmpty ? '-' : value} <span className="text-sm text-gray-500 font-normal">{isEmpty ? '' : units}</span>
        </p>
        {isEmpty && <span className="text-xs text-gray-400 mt-1">Sin registros</span>}
      </div>
    </div>
  );
};

const AlertCard = ({ title, desc, date }: { title: string; desc: string; date: string }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg border border-red-200 bg-red-50">
    <FaBell className="text-red-500 mt-1" size={16} />
    <div className="flex-1">
      <p className="font-semibold text-sm text-red-800">{title}</p>
      <p className="text-xs text-red-600">{desc}</p>
      <p className="text-xs text-gray-500 mt-1">{date}</p>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

export default function DashboardPage() {
  // 4. RECUPERAMOS EL ESTADO (EL CEREBRO DE LA PÁGINA)
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Muestra cargando mientras esperamos datos
  if (loading) return <div className="p-8 text-gray-500">Cargando panel...</div>;

  return (
      <div className="p-4 md:p-8 w-full">
        {/* Título */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-[var(--color-secondary)]">Home</h1>
          <span className="text-sm text-gray-500">
            Última actualización: {new Date().toLocaleDateString('es-AR')}
          </span>
        </div>

        {/* KPIs - Ahora conectados a 'data' */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 w-full">
          <MetricCard title="Total Animales" value={data?.kpis.totalAnimales} icon={FaCog} />
          <MetricCard title="Peso Promedio" value={data?.kpis.pesoPromedio} units="kg" icon={FaChartLine} />
          <MetricCard title="GMD Promedio" value={data?.kpis.gmdPromedio} units="kg/día" icon={FaRulerHorizontal} />
          <MetricCard title="Alertas Sanitarias" value={data?.kpis.alertasCount} icon={FaExclamationTriangle} color="text-red-500" />
        </div>

        {/* Gráfico + Alertas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
            
            {/* COLUMNA 1: GRÁFICO */}
            <div className="lg:col-span-2 h-full">
              {/* 5. AQUÍ SOLUCIONAMOS EL ERROR DEL GRÁFICO PASANDO LA PROP 'DATA' */}
              <WeightEvolutionChart data={data?.pesoEvolution || []} />
            </div>

            {/* COLUMNA 2: ALERTAS */}
            <div className="lg:col-span-1 h-full">
              <div className="bg-white p-6 rounded-lg shadow-md border h-full flex flex-col">
                
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-xl text-gray-800">Alertas Recientes</h3>
                  {data?.alertasRecientes.length > 0 && (
                    <Link href="/dashboard/sanidad" className="text-sm text-[var(--color-primary)] hover:underline">
                      Ver todas
                    </Link>
                  )}
                </div>

                {/* LÓGICA DE ESTADO VACÍO vs LISTA */}
                {!data || data.alertasRecientes.length === 0 ? (
                  
                  // --- ESTADO VACÍO (POSITIVO) ---
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                      <div className="bg-green-50 p-4 rounded-full mb-3 animate-pulse">
                        {/* Ahora sí existe FaCheckCircle */}
                        <FaCheckCircle className="text-green-500 text-3xl" />
                      </div>
                      <h4 className="text-gray-800 font-semibold text-lg">Todo bajo control</h4>
                      <p className="text-sm text-gray-400 mt-2 px-4">
                        No se detectaron alertas sanitarias ni problemas de alimentación hoy.
                      </p>
                  </div>

                ) : (
                  
                  // --- LISTA DE ALERTAS (SI HAY DATOS) ---
                  <div className="space-y-4 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                      {data.alertasRecientes.map((alert: any, idx: number) => (
                          <AlertCard key={idx} title={alert.title} desc={alert.desc} date={alert.date} />
                      ))}
                  </div>

                )}
                
              </div>
            </div>
          </div>
      </div>
  );
}
