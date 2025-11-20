'use client';

import { useEffect, useState } from 'react';
import { getEmpleados, getEmpleadoStats } from '@/lib/api';
import { Empleado, EmpleadoStats } from '@/types/empleado';
import EmpleadoTable from '@/components/empleados/EmpleadoTable';
import StatsComponent from '@/components/empleados/EmpleadoStats';

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [stats, setStats] = useState<EmpleadoStats>({ total: 0, activos: 0, inactivos: 0, nuevosEsteMes: 0 });

  useEffect(() => {
    Promise.all([getEmpleados(), getEmpleadoStats()])
      .then(([data, st]) => {
        setEmpleados(data);
        setStats(st);
      })
      .catch((err) => alert(err.message));
  }, []);

  const handleEdit = (id: number) => {
    alert(`Editar empleado ${id} (próximo paso)`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Confirmar eliminación?')) return;
    try {
      await fetch(`/api/empleados/${id}`, { method: 'DELETE' });
      setEmpleados((prev: Empleado[]) => prev.filter((e) => e.id !== id));
      setStats((prev: EmpleadoStats) => ({
        ...prev,
        total: prev.total - 1,
        activos: prev.activos - 1,
      }));
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-[var(--color-secondary)]">Gestión de Empleados</h1>

      {/* 1. Tarjetas de resumen (arriba) */}
      <StatsComponent stats={stats} />

      {/* 2. Tabla con acciones */}
      <EmpleadoTable empleados={empleados} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}