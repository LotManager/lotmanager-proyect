// app/dashboard/page.tsx

import Link from 'next/link';
import DashboardLayout from 'src/components/dashboard/DashboardLayout';
import WeightEvolutionChart from 'src/components/dashboard/WeightEvolutionChart';
import { FaCog, FaChartLine, FaExclamationTriangle, FaRulerHorizontal, FaPlus, FaBell } from 'react-icons/fa';

interface MetricCardProps {
  title: string;
  value: string | number;
  units?: string;
  progress?: string;
  icon?: React.ComponentType<any>;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  units,
  progress,
  icon: Icon,
  color = 'text-[var(--color-secondary)]'
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md border flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <h3 className="font-semibold text-gray-600">{title}</h3>
      {Icon && <Icon size={16} className="text-gray-400 hover:text-[var(--color-primary)] cursor-pointer" />}
    </div>
    <div className="flex flex-col">
      <p className={`text-4xl font-bold ${color}`}>{value} {units}</p>
      {progress && <span className="text-xs text-gray-500 mt-1">{progress}</span>}
    </div>
  </div>
);

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

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 w-full">
        {/* Título */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-[var(--color-secondary)]">Home</h1>
          <span className="text-sm text-gray-500">
            Última actualización: {new Date().toLocaleDateString('es-AR')}
          </span>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 w-full">
          <MetricCard title="Total Animales" value="1,247" progress="+12 desde ayer" icon={FaCog} />
          <MetricCard title="Peso Promedio" value="485" units="kg" progress="+2.3% este mes" icon={FaChartLine} />
          <MetricCard title="GMD Promedio" value="1.8" units="kg/día" progress="Objetivo: 2.0 kg/día" icon={FaRulerHorizontal} />
          <MetricCard title="Alertas Sanitarias" value="3" progress="Requieren atención" icon={FaExclamationTriangle} color="text-red-500" />
        </div>

        {/* Gráfico + Alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          <div className="lg:col-span-2">
            <WeightEvolutionChart />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md h-auto border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-xl text-gray-800">Alertas Recientes</h3>
                <Link href="/dashboard/sanidad" className="text-sm text-[var(--color-primary)] hover:underline">
                  Ver todas
                </Link>
              </div>
              <div className="space-y-4">
                <AlertCard title="Fiebre en Corral 5" desc="3 animales detectados con fiebre" date="Hace 2 horas" />
                <AlertCard title="Dieta no registrada" desc="Corral 12 sin registro de alimentación" date="Hace 5 horas" />
                <AlertCard title="Peso bajo" desc="2 animales con GMD < 1,2 kg/día" date="Ayer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}