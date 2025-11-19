// app/components/dashboard/WeightEvolutionChart.tsx

"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { FaChartLine, FaWeightHanging } from 'react-icons/fa';

// AHORA ACEPTAMOS "data" COMO PROPIEDAD (PROP)
interface Props {
    data: { name: string; peso: number }[];
}

export default function WeightEvolutionChart({ data }: Props) {
    
    // CASO 1: SI EL ARRAY ESTÁ VACÍO (USUARIO NUEVO)
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md h-80 border flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-3">
                    <FaChartLine className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-gray-600 font-semibold">Sin datos de peso</h3>
                <p className="text-sm text-gray-400 mt-1">Registra pesajes para ver tu primera evolución.</p>
            </div>
        );
    }

    // CASO 2: SI HAY UN SOLO DATO
    if (data.length === 1) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md h-80 border flex flex-col relative overflow-hidden">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">Evolución de Peso</h3>
                <div className="flex-1 flex flex-col items-center justify-center z-10">
                    <p className="text-gray-500 font-medium mb-2">Peso Inicial</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-extrabold text-[var(--color-secondary)]">{data[0].peso}</span>
                        <span className="text-xl text-gray-600">kg</span>
                    </div>
                    <p className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full mt-4">
                        Inicio del ciclo
                    </p>
                </div>
                <FaWeightHanging className="absolute -bottom-4 -right-4 text-gray-100 text-9xl z-0" />
            </div>
        );
    }

    // CASO 3: HAY DATOS SUFICIENTES -> MUESTRA EL GRÁFICO
    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-80 border flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-xl text-gray-800">Evolución de Peso Mensual</h3>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    Tendencia
                </span>
            </div>
            
            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#234c2f" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#234c2f" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10}/>
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#234c2f', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number) => [`${value} kg`, 'Peso']}
                        />
                        <Area type="monotone" dataKey="peso" stroke="#234c2f" strokeWidth={3} fillOpacity={1} fill="url(#colorPeso)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}