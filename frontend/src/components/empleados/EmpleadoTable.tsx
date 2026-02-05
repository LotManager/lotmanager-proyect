// components/empleados/EmpleadoTable.tsx
'use client';

import { Empleado } from '@/src/types/empleado';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Props {
  empleados: Empleado[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function EmpleadoTable({ empleados, onEdit, onDelete }: Props) {
  if (empleados.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600">Aún no hay empleados</h3>
        <p className="text-gray-500 mt-2">Total: 0 | Activos: 0 | Inactivos: 0</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left font-medium text-gray-600">Nombre</th>
            <th className="px-6 py-4 text-left font-medium text-gray-600">Email</th>
            <th className="px-6 py-4 text-left font-medium text-gray-600">Rol</th>
            <th className="px-6 py-4 text-left font-medium text-gray-600">Teléfono</th>
            <th className="px-6 py-4 text-left font-medium text-gray-600">Fecha Ingreso</th>
            <th className="px-6 py-4 text-left font-medium text-gray-600">Estado</th>
            <th className="px-6 py-4 text-center font-medium text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{emp.nombre}</td>
              <td className="px-6 py-4 text-gray-600">{emp.email}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${emp.rol === 'Administrador' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {emp.rol}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600">{emp.telefono}</td>
              <td className="px-6 py-4 text-gray-600">{new Date(emp.fechaIngreso).toLocaleDateString('es-AR')}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${emp.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {emp.estado}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center items-center gap-2">
                  <button onClick={() => onEdit(emp.id)} className="text-blue-600 hover:text-blue-800 transition">
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete(emp.id)} className="text-red-600 hover:text-red-800 transition">
                    <FaTrash />
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