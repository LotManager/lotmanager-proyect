// src/components/empleados/AgregarEmpleadoModal.tsx
'use client';

import { useState, useEffect } from 'react';
import type { Empleado } from '@/types/empleado';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    // Omitimos 'id' porque lo genera la base de datos
    onSave: (data: Omit<Empleado, 'id'>) => void;
    }

export default function AgregarEmpleadoModal({ isOpen, onClose, onSave }: Props) {
    
    // 1. Bloquear scroll al abrir
    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = 'hidden';
        } else {
        document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // 2. Estado del formulario
    const [formData, setFormData] = useState<{
        nombre: string;
        email: string;
        telefono: string;
        rol: 'Administrador' | 'Tambero';
        fechaIngreso: string;
        estado: 'Activo' | 'Inactivo';
    }>({
        nombre: '',
        email: '',
        telefono: '',
        rol: 'Tambero', // Valor por defecto
        fechaIngreso: new Date().toISOString().split('T')[0],
        estado: 'Activo',
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    // Clase para el color verde personalizado
    const btnGreenClass = "bg-[rgb(35,76,47)] hover:opacity-90 text-white";

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 border border-gray-200 max-h-[90vh] overflow-y-auto">
            
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-xl font-bold text-[rgb(35,76,47)]">Nuevo Empleado</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* NOMBRE */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                required
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[rgb(35,76,47)] outline-none"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                />
            </div>

            {/* EMAIL Y TELÉFONO */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    required
                    type="email"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[rgb(35,76,47)] outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                    required
                    type="tel"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[rgb(35,76,47)] outline-none"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                />
                </div>
            </div>

            {/* ROL Y ESTADO (Selects) */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                    className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-[rgb(35,76,47)] outline-none"
                    value={formData.rol}
                    onChange={(e) => setFormData({...formData, rol: e.target.value as 'Administrador' | 'Tambero'})}
                >
                    <option value="Tambero">Tambero</option>
                    <option value="Administrador">Administrador</option>
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                    className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-[rgb(35,76,47)] outline-none"
                    value={formData.estado}
                    onChange={(e) => setFormData({...formData, estado: e.target.value as 'Activo' | 'Inactivo'})}
                >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                </div>
            </div>

            {/* FECHA INGRESO */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ingreso</label>
                <input
                required
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[rgb(35,76,47)] outline-none"
                value={formData.fechaIngreso}
                onChange={(e) => setFormData({...formData, fechaIngreso: e.target.value})}
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