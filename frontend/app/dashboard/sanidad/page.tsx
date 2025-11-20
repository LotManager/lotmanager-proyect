// app/dashboard/sanidad/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getTratamientosActivos, getSanidadResumen } from '../../../src/lib/api';
import type { Tratamiento, SanidadStats as Stats } from '../../../src/types/sanidad';
import SanidadStats from '../../../src/components/sanidad/SanidadStats';
import TratamientoActivoTable from '../../../src/components/sanidad/TratamientoActivoTable';
import AgregarTratamientoModal from '../../../src/components/sanidad/AgregarTratamientoModal';

export default function SanidadPage() {
    const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
    const [stats, setStats] = useState<Stats>({ enTratamiento: 0, urgentes: 0, enRecuperacion: 0, completadosEsteMes: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        Promise.all([getTratamientosActivos(), getSanidadResumen()])
        .then(([data, st]) => {
            setTratamientos(data);
            setStats(st);
        })
        .catch((err) => console.error(err)); 
    }, []);

    const handleCompletar = async (id: number) => {
        if (!confirm('¿Marcar como completado?')) return;
        try {
            await fetch(`/api/sanidad/tratamientos/${id}/completar`, { method: 'PUT' });
            setTratamientos((prev) => prev.filter((t) => t.id !== id));
            setStats((prev) => ({ ...prev, enTratamiento: prev.enTratamiento - 1, completadosEsteMes: prev.completadosEsteMes + 1 }));
        } catch (e: any) {
            alert(e.message);
        }
    };

    const handleGuardarNuevo = async (nuevoData: any) => {
        try {
            const res = await fetch('/api/sanidad/tratamientos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...nuevoData,
                    diasRestantes: nuevoData.diasTotales, // Usamos lo que viene del form
                    estado: 'Activo', // Asegúrate que coincida con tu Tipo (Activo/EnCurso)
                }),
            });

            if (!res.ok) throw new Error(`Error ${res.status} al guardar`);

            const nuevoTratamiento: Tratamiento = await res.json();

            setTratamientos((prev) => [...prev, nuevoTratamiento]);
            setStats((prev) => ({
                ...prev,
                enTratamiento: prev.enTratamiento + 1,
            }));

            alert("Tratamiento guardado correctamente");
        } catch (e: any) {
            alert(`Error: ${e.message}`);
        }
    };

    const handleVerDetalle = (id: number) => {
        alert(`Ver detalle de tratamiento ${id} (próximo paso)`);
    };

    // --- AQUÍ ES DONDE TE FALTABA CÓDIGO ---
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                
                {/* 1. ENCABEZADO CON FLEXBOX (Título + Botón) */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-[var(--color-secondary)]">Control Sanitario</h1>
                    
                    {/* ESTE BOTÓN FALTABA */}
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[rgb(35,76,47)] hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <span className="text-xl font-bold">+</span> 
                        Agregar Tratamiento
                    </button>
                </div>

                {/* 2. Tarjetas de resumen */}
                <SanidadStats stats={stats} />

                {/* 3. Tabla de tratamientos */}
                <div className="mt-8">
                    <TratamientoActivoTable 
                        tratamientos={tratamientos} 
                        onCompletar={handleCompletar} 
                        onVerDetalle={handleVerDetalle} 
                    />
                </div>
            </div>

            {/* 4. EL MODAL (FALTABA RENDERIZARLO) */}
            <AgregarTratamientoModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onSave={handleGuardarNuevo}
            />
        </div>
    );
}