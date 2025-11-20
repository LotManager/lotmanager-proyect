'use client';

// 1. IMPORTAMOS useEffect
import { useState, useEffect } from 'react';
import type { Tratamiento } from '@/types/sanidad';

const VACAS_DISPONIBLES = ['#1243', '#1249', '#1255', '#3021', '#8842'];
const CORRALES_DISPONIBLES = [1, 2, 3, 4, 5, 6];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Tratamiento, 'id' | 'estado' | 'diasRestantes'>) => void;
}

export default function AgregarTratamientoModal({ isOpen, onClose, onSave }: Props) {
    // 2. LÓGICA PARA BLOQUEAR EL SCROLL DE FONDO
    useEffect(() => {
        if (isOpen) {
        // Cuando se abre, bloqueamos el scroll del body
        document.body.style.overflow = 'hidden';
        } else {
        // Cuando se cierra (o no está abierto), lo restauramos
        document.body.style.overflow = 'unset';
        }

        // Función de limpieza (se ejecuta si el componente se desmonta abruptamente)
        return () => {
        document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const [formData, setFormData] = useState<{
        idBovino: string
        corral: string
        diagnostico: string
        medicamento: string
        dosis: string
        diasTotales: number
        fechaInicio: string
    }>({
        idBovino: '',
        corral: '',
        diagnostico: '',
        medicamento: '',
        dosis: '',
        diasTotales: 5,
        fechaInicio: new Date().toISOString().split('T')[0],
    });

    // Si no está abierto, retornamos null, PERO el useEffect de arriba ya se ejecutó antes
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
        idBovino: Number(formData.idBovino.replace('#', '')),
        corral: Number(formData.corral),
        diagnostico: formData.diagnostico,
        medicamento: formData.medicamento,
        dosis: formData.dosis,
        diasTotales: Number(formData.diasTotales),
        fechaInicio: formData.fechaInicio,
        diasTranscurridos: 0,
        });
        // Nota: El scroll se desbloqueará automáticamente porque al llamar a onClose,
        // isOpen pasa a false y el useEffect actualiza el estilo.
        onClose();
    };

    const btnGreenClass = "bg-[rgb(35,76,47)] hover:opacity-90 text-white";

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 border border-gray-200 max-h-[90vh] overflow-y-auto">
            
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-xl font-bold text-[rgb(35,76,47)]">Nuevo Tratamiento</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">
                ✕
            </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            {/* FILA 1: SELECTS */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Bovino</label>
                <select
                    required
                    className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-[rgb(35,76,47)] focus:border-transparent outline-none"
                    value={formData.idBovino}
                    onChange={(e) => setFormData({...formData, idBovino: e.target.value})}
                >
                    <option value="">Seleccionar...</option>
                    {VACAS_DISPONIBLES.map((vaca) => (
                    <option key={vaca} value={vaca}>{vaca}</option>
                    ))}
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nro Corral</label>
                <select
                    required
                    className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-[rgb(35,76,47)] focus:border-transparent outline-none"
                    value={formData.corral}
                    onChange={(e) => setFormData({...formData, corral: e.target.value})}
                >
                    <option value="">Seleccionar...</option>
                    {CORRALES_DISPONIBLES.map((c) => (
                    <option key={c} value={c}>Corral {c}</option>
                    ))}
                </select>
                </div>
            </div>

            {/* DIAGNÓSTICO */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnóstico</label>
                <input
                required
                type="text"
                placeholder="Ej: Mastitis"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[rgb(35,76,47)] outline-none"
                value={formData.diagnostico}
                onChange={(e) => setFormData({...formData, diagnostico: e.target.value})}
                />
            </div>

            {/* FILA 2: MEDICAMENTO y DOSIS */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicamento</label>
                <input
                    required
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[rgb(35,76,47)] outline-none"
                    value={formData.medicamento}
                    onChange={(e) => setFormData({...formData, medicamento: e.target.value})}
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosis</label>
                <input
                    required
                    type="text"
                    placeholder="Ej: 10ml"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[rgb(35,76,47)] outline-none"
                    value={formData.dosis}
                    onChange={(e) => setFormData({...formData, dosis: e.target.value})}
                />
                </div>
            </div>

            {/* DURACIÓN */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duración (Días)</label>
                <input
                required
                type="number"
                min="1"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[rgb(35,76,47)] outline-none"
                value={formData.diasTotales}
                onChange={(e) => setFormData({...formData, diasTotales: Number(e.target.value)})}
                />
            </div>

            {/* BOTONES */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                Cancelar
                </button>
                <button
                type="submit"
                className={`px-6 py-2 rounded-md shadow-md transition-all ${btnGreenClass}`}
                >
                Guardar
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}