// SignUpForm.tsx

"use client";

import React from 'react';
import { Button } from '@mui/material';
// Importamos FaPhone en lugar de FaBriefcase
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa'; 

export default function SignUpForm() {
    return (
        <form className="flex flex-col space-y-3">
            
            {/* Campo de Nombre */}
            <div className="relative flex items-center">
                <FaUser className="absolute left-4 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full p-3 pl-12 rounded-full border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                    required
                />
            </div>

            {/* Campo de Email */}
            <div className="relative flex items-center">
                <FaEnvelope className="absolute left-4 text-gray-400" size={18} />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full p-3 pl-12 rounded-full border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                    required
                />
            </div>
            
            {/* CAMPO DE TELÉFONO (REEMPLAZO DEL ROL) */}
            <div className="relative flex items-center">
                <FaPhone className="absolute left-4 text-gray-400" size={18} /> {/* Nuevo icono FaPhone */}
                <input
                    type="tel" // Tipo 'tel' para móviles
                    placeholder="Número de Teléfono"
                    className="w-full p-3 pl-12 rounded-full border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                    required
                />
            </div>

            {/* Campo de Contraseña */}
            <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-gray-400" size={18} />
                <input
                    type="password"
                    placeholder="Crear contraseña"
                    className="w-full p-3 pl-12 rounded-full border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                    required
                />
            </div>

            {/* Campo de Confirmación de Contraseña */}
            <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-gray-400" size={18} />
                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    className="w-full p-3 pl-12 rounded-full border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                    required
                />
            </div>


            {/* Botón de Submit: Estilo de Flecha */}
            <div className="flex justify-between items-center mt-8">
                <span className="text-2xl font-bold text-[var(--color-secondary)]">Crear</span>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        marginTop: '1.5rem', 
                        padding: '10px 20px', 
                        borderRadius: '0.75rem',
                        minWidth: '60px',
                        height: '60px',
                        bgcolor: 'var(--color-primary)', 
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'var(--color-secondary)',
                            transform: 'scale(1.05)',
                        },
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(106, 142, 127, 0.4)',
                    }}
                >
                    <span className="text-2xl">→</span>
                </Button>
            </div>
            
            {/* Pregunta de login */}
            <p className="text-center text-sm text-gray-500 pt-4">
                ¿Ya tienes cuenta? 
                <span className="font-bold text-[var(--color-secondary)] cursor-pointer hover:text-[var(--color-primary)] ml-1">
                    Iniciar Sesión
                </span>
            </p>
        </form>
    );
}