'use client';

import { EmpleadoStats as Stats } from '@/types/empleado';
import { FaUsers, FaUserCheck, FaUserTimes, FaCalendarPlus } from 'react-icons/fa';

export default function EmpleadoStats({ stats }: { stats: Stats }) {
  const cards = [
    { title: 'Total Empleados', value: stats.total, icon: FaUsers, color: 'text-blue-600' },
    { title: 'Activos', value: stats.activos, icon: FaUserCheck, color: 'text-green-600' },
    { title: 'Inactivos', value: stats.inactivos, icon: FaUserTimes, color: 'text-red-600' },
    { title: 'Nuevos este mes', value: stats.nuevosEsteMes, icon: FaCalendarPlus, color: 'text-purple-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium text-gray-500`}>{card.title}</p>
              <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
            </div>
            <card.icon className={`text-3xl ${card.color} opacity-80`} />
          </div>
        </div>
      ))}
    </div>
  );
}