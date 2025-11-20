// components/sanidad/TratamientoActivoTable.tsx
'use client';

import { Tratamiento } from '../../types/sanidad';
import { FaCheck, FaEye } from 'react-icons/fa';

interface Props {
    tratamientos: Tratamiento[];
    onCompletar: (id: number) => void;
    onVerDetalle: (id: number) => void;
}

export default function TratamientoActivoTable({ tratamientos, onCompletar, onVerDetalle }: Props) {
    if (tratamientos.length === 0) {
    return (
        <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600">Aún no hay tratamientos activos</h3>
            <p className="text-gray-500 mt-2">Total: 0 | Urgentes: 0 | En recuperación: 0</p>
        </div>
    );
}

return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Tratamientos en curso</h3>
            </div>
            <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-4 text-left">Animal ID</th>
                    <th className="px-6 py-4 text-left">Diagnóstico</th>
                    <th className="px-6 py-4 text-left">Medicamento</th>
                    <th className="px-6 py-4 text-left">Dosis</th>
                    <th className="px-6 py-4 text-left">Progreso</th>
                    <th className="px-6 py-4 text-left">Corral</th>
                    <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {tratamientos.map((t) => (
                    <tr key={t.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">#{t.idBovino}</td>
                        <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${t.estado === 'Urgente' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {t.diagnostico}
                        </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{t.medicamento}</td>
                        <td className="px-6 py-4 text-gray-600">{t.dosis}</td>
                        <td className="px-6 py-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${(t.diasTranscurridos / t.diasTotales) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-500">{t.diasTranscurridos}/{t.diasTotales} días</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">Corral {t.corral}</td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex justify-center items-center gap-2">
                                <button onClick={() => onVerDetalle(t.id)} className="text-blue-600 hover:text-blue-800 transition">
                                    <FaEye />
                                </button>
                                <button onClick={() => onCompletar(t.id)} className="text-green-600 hover:text-green-800 transition">
                                    <FaCheck />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}