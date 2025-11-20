// components/sanidad/SanidadStats.tsx
'use client';

import { SanidadStats as Stats } from '../../types/sanidad';
import { FaSyringe, FaExclamationTriangle, FaHeart, FaCheckCircle } from 'react-icons/fa';

export default function SanidadStats({ stats }: { stats: Stats }) {
    const cards = [
        { title: 'En tratamiento', value: stats.enTratamiento, icon: FaSyringe, color: 'text-blue-600' },
        { title: 'Urgentes', value: stats.urgentes, icon: FaExclamationTriangle, color: 'text-red-600' },
        { title: 'En recuperación', value: stats.enRecuperacion, icon: FaHeart, color: 'text-green-600' },
        { title: 'Completados este mes', value: stats.completadosEsteMes, icon: FaCheckCircle, color: 'text-purple-600' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card) => (
                <div key={card.title} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-gray-500">{card.title}</p>
                    <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                    </div>
                    <card.icon className={`text-3xl ${card.color} opacity-80`} />
                </div>
                </div>
            ))}
        </div>
    );
}