// SignInForm.tsx

"use client";

import React from 'react';
import { Button } from '@mui/material';
import { FaUser, FaLock } from 'react-icons/fa'; 

export default function SignInForm() {
    return (
        <form className="flex flex-col space-y-6"> {/* Aumentamos el espacio entre elementos */}
            
            {/* Campo de Usuario/Email */}
            <div className="relative flex items-center">
                <FaUser className="absolute left-4 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Usuario o Email"
                    className="w-full p-3 pl-12 rounded-full border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                    required
                />
            </div>
            
            {/* Campo de Contraseña */}
            <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-gray-400" size={18} />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full p-3 pl-12 rounded-full border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                    required
                />
            </div>

            {/* Link de Olvidaste tu Contraseña (Movido debajo de los inputs y alineado a la derecha) */}
            <p className="text-right text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] cursor-pointer -mt-2">
                ¿Olvidaste tu contraseña?
            </p>

            {/* Botón de Submit: ÚNICO, ANCHO COMPLETO Y CLARO */}
            <Button
                type="submit"
                variant="contained"
                sx={{
                    marginTop: '1.5rem', 
                    padding: '10px 20px', 
                    borderRadius: '0.75rem',
                    bgcolor: 'var(--color-secondary)', // Verde oscuro
                    color: 'white',
                    fontSize: '1rem', // Letra un poco más grande
                    fontWeight: 'bold',
                    '&:hover': {
                        bgcolor: 'var(--color-primary)', 
                    },
                }}
            >
                INICIAR SESIÓN
            </Button>
            
            {/* Pregunta de registro */}
            <p className="text-center text-sm text-gray-500 pt-4">
                ¿No tienes cuenta? 
                <span className="font-bold text-[var(--color-secondary)] cursor-pointer hover:text-[var(--color-primary)] ml-1">
                    Crear Cuenta
                </span>
            </p>
        </form>
    );
}