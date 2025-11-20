// app/dashboard/empleados/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getEmpleados, getEmpleadoStats } from '../../../src/lib/api';
import type { Empleado, EmpleadoStats } from '../../../src/types/empleado';
import EmpleadoTable from '../../../src/components/empleados/EmpleadoTable';
import StatsComponent from '../../../src/components/empleados/EmpleadoStats';
import AgregarEmpleadoModal from '../../../src/components/empleados/AgregarEmpleadoModal';

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [stats, setStats] = useState<EmpleadoStats>({ total: 0, activos: 0, inactivos: 0, nuevosEsteMes: 0 });
  
  // 2. ESTADO DEL MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Promise.all([getEmpleados(), getEmpleadoStats()])
      .then(([data, st]) => {
        setEmpleados(data);
        setStats(st);
      })
      .catch((err) => alert(err.message)); // Podrías cambiar esto por console.error
  }, []);

  const handleEdit = (id: number) => {
    alert(`Editar empleado ${id} (próximo paso)`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Confirmar eliminación?')) return;
    try {
      await fetch(`/api/empleados/${id}`, { method: 'DELETE' });
      setEmpleados((prev) => prev.filter((e) => e.id !== id));
      setStats((prev) => ({
        ...prev,
        total: prev.total - 1,
        activos: prev.activos - 1, 
      }));
    } catch (e: any) {
      alert(e.message);
    }
  };

  // 3. MANEJAR EL GUARDADO DEL NUEVO EMPLEADO
  const handleGuardarNuevo = async (data: Omit<Empleado, 'id'>) => {
    try {
        // AQUÍ HARÍAS EL POST A TU API REAL
        /*
        const res = await fetch('/api/empleados', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        const nuevoEmpleado = await res.json();
        */

        // SIMULACIÓN (MOCK)
        const nuevoEmpleado: Empleado = {
            id: Date.now(), // ID temporal
            ...data
        };

        // Actualizamos la tabla
        setEmpleados([...empleados, nuevoEmpleado]);
        
        // Actualizamos las estadísticas visualmente
        setStats(prev => ({
            ...prev,
            total: prev.total + 1,
            activos: data.estado === 'Activo' ? prev.activos + 1 : prev.activos,
            nuevosEsteMes: prev.nuevosEsteMes + 1
        }));

        alert("Empleado agregado correctamente");

    } catch (error) {
        console.error(error);
        alert("Error al guardar empleado");
    }
  };

  return (
    <div className="p-6">
      
      {/* 4. ENCABEZADO CON BOTÓN (Flexbox) */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-[var(--color-secondary)]">Gestión de Empleados</h1>
        
        <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[rgb(35,76,47)] hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
            <span className="text-xl font-bold">+</span> 
            Agregar Empleado
        </button>
      </div>

      <StatsComponent stats={stats} />

      <EmpleadoTable empleados={empleados} onEdit={handleEdit} onDelete={handleDelete} />

      {/* 5. COMPONENTE MODAL */}
      <AgregarEmpleadoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleGuardarNuevo}
      />
    </div>
  );
}