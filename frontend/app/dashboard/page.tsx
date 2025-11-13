import React from 'react';
import WeightEvolutionChart from '@/components/dashboard/WeightEvolutionChart'; 
import { FaCog, FaChartLine, FaExclamationTriangle, FaCalendarAlt, FaRulerHorizontal, FaPlus, FaTachometerAlt } from 'react-icons/fa';


// ------------------------------------
// Componentes Modulares de la Página
// (Definidos aquí para cumplir con la estructura solicitada, aunque es mejor moverlos a /components)
// ------------------------------------

// Tarjeta de Métrica (Ej: Total Animales, Peso Promedio)
interface MetricCardProps {
  title: string
  value: string | number
  units?: string
  progress?: string
  icon?: React.ComponentType<any>
  color?: string
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, units, progress, icon: Icon, color = 'text-[var(--color-secondary)]' }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border flex flex-col justify-between h-32">
        <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-600">{title}</h3>
            {/* Ícono de configuración/adición sutil */}
            <FaPlus size={16} className="text-gray-400 hover:text-[var(--color-primary)] cursor-pointer" />
        </div>
        <div className="flex flex-col">
            <p className={`text-4xl font-bold ${color}`}>{value} {units}</p>
            {progress && (
                <span className="text-xs text-gray-500 mt-1">{progress}</span>
            )}
        </div>
    </div>
);

// Tarjeta de Alerta (Ej: Alerta Sanitaria, Vacunación)
interface AlertCardProps {
  type: 'urgent' | 'preventive' | 'routine'
  title: string
  detail: string
  tag: string
  tagColor?: string
}

const AlertCard: React.FC<AlertCardProps> = ({ type, title, detail, tag, tagColor }) => {
    // Definición de iconos y colores según el tipo de alerta
    const iconMap = {
        urgent: { icon: FaExclamationTriangle, color: 'text-red-500', bg: 'bg-red-50' },
        preventive: { icon: FaCalendarAlt, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        routine: { icon: FaRulerHorizontal, color: 'text-blue-500', bg: 'bg-blue-50' },
    };

    const { icon: Icon, color: IconColor, bg: BgColor } = iconMap[type] || iconMap.routine;

    return (
        <div className={`p-4 rounded-lg flex items-start space-x-3 transition-shadow duration-300 hover:shadow-lg ${BgColor}`}>
            <Icon size={18} className={`${IconColor} mt-1`} />
            <div className="flex-1">
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-sm text-gray-600 mt-0.5">{detail}</p>
            </div>
            {/* Tag de estado (Urgente, Preventivo, Rutina) */}
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tagColor}`}>{tag}</span>
        </div>
    );
};


// ------------------------------------
// Componente de la Página Dashboard Home (DashboardPage)
// ------------------------------------

export default function DashboardPage() {
    return (
        <>
            {/* Título y Actualización */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-[var(--color-secondary)]">
                    Dashboard
                </h1>
                <span className="text-sm text-gray-500">
                    Última actualización: {new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </span>
            </div>
            
            {/* Sección 1: Tarjetas de Métricas (Replicando el diseño de 4 tarjetas) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard 
                    title="Total Animales" 
                    value="1,247" 
                    units="" 
                    progress="+12 desde ayer" 
                    icon={FaCog} 
                />
                <MetricCard 
                    title="Peso Promedio" 
                    value="485" 
                    units="kg" 
                    progress="+2.3% este mes" 
                    icon={FaChartLine}
                />
                <MetricCard 
                    title="GMD Promedio" 
                    value="1.8" 
                    units="kg/día" 
                    progress="Objetivo: 2.0 kg/día" 
                    icon={FaRulerHorizontal}
                />
                <MetricCard 
                    title="Alertas Sanitarias" 
                    value="3" 
                    units="" 
                    progress="Requieren atención" 
                    icon={FaExclamationTriangle} 
                    color="text-red-500" 
                />
            </div>
            
            {/* Sección 2 y 3: Gráfica y Alertas Recientes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 2. Gráfica de Evolución*/}
                <div className="lg:col-span-2">
                    <WeightEvolutionChart />
                </div>
                
                {/* 3. Alertas Recientes*/}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md h-auto border">
                        <h3 className="font-semibold text-xl text-gray-800 mb-4">Alertas Recientes</h3>
                        <div className="space-y-4">
                            <AlertCard 
                                type="urgent" 
                                title="Animal #1247 - Fiebre Alta" 
                                detail="Corral 5 - Requiere tratamiento urgente" 
                                tag="Urgente" 
                                tagColor="bg-red-200 text-red-800"
                            />
                            <AlertCard 
                                type="preventive" 
                                title="Vacunación programada" 
                                detail="Corral 2 - Mañana 8:00 AM" 
                                tag="Preventivo" 
                                tagColor="bg-yellow-200 text-yellow-800"
                            />
                            <AlertCard 
                                type="routine" 
                                title="Pesaje semanal" 
                                detail="Todos los corrales - Viernes 6:00 AM" 
                                tag="Rutina" 
                                tagColor="bg-blue-200 text-blue-800"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}