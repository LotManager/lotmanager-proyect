"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Datos de ejemplo para la evolución de peso
const data = [
    { name: 'Ene', peso: 100 },
    { name: 'Feb', peso: 120 },
    { name: 'Mar', peso: 150 },
    { name: 'Abr', peso: 180 },
    { name: 'May', peso: 220 },
    { name: 'Jun', peso: 260 },
    { name: 'Jul', peso: 290 },
];

export default function WeightEvolutionChart() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-80 border">
            <h3 className="font-semibold text-xl text-gray-800 mb-4">Evolución de Peso Mensual</h3>
            
            {/* Contenedor Responsive para Recharts */}
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    
                    {/* Eje X (Meses) */}
                    <XAxis dataKey="name" stroke="#6b7280" /> 
                    
                    {/* Eje Y (Peso - kg) */}
                    <YAxis stroke="#6b7280" /> 
                    
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'var(--color-secondary)', 
                            border: 'none', 
                            borderRadius: '4px' 
                        }}
                        labelStyle={{ color: 'white' }} 
                        formatter={(value) => [`${value} kg`, 'Peso']} 
                    />
                    
                    {/* Barra de la gráfica - Usamos un color de paleta (primary) */}
                    <Bar dataKey="peso" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}