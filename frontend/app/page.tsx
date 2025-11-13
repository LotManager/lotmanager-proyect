"use client";

import React, { useState } from "react";
import Image from 'next/image';
import { Button } from '@mui/material';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa'; 

// ------------------------------------
// 1. COMPONENTE INTERNO: LoginForm
// ------------------------------------
interface AuthFormProps {
    onToggleView: () => void;
}

const LoginForm = ({ onToggleView }: AuthFormProps) => (
    <form className="flex flex-col space-y-4"> 
        
        {/* Campo de Usuario/Email */}
        <div className="relative flex items-center">
            <FaUser className="absolute left-4 text-gray-400" size={18} />
            <input
                type="text"
                placeholder="Usuario o Email"
                className="w-full p-3 pl-12 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                required
            />
        </div>
        
        {/* Campo de Contraseña */}
        <div className="relative flex items-center">
            <FaLock className="absolute left-4 text-gray-400" size={18} />
            <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-3 pl-12 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                required
            />
        </div>

        {/* Link de Olvidaste tu Contraseña */}
        <p className="text-right text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] cursor-pointer mt-1 mb-4">
            ¿Olvidaste tu contraseña?
        </p>

        {/* Botón de Submit */}
        <Button
            type="submit"
            variant="contained"
            sx={{
                marginTop: '1.5rem', 
                padding: '12px 20px', 
                borderRadius: '0.75rem', 
                bgcolor: 'var(--color-secondary)', 
                color: 'white',
                fontSize: '0.9rem', 
                fontWeight: '600', 
                '&:hover': {
                    bgcolor: 'var(--color-primary)', 
                },
            }}
        >
            INICIAR SESIÓN
        </Button>

        {/* Enlace para Registro */}
        <p className="text-center text-sm text-gray-500 pt-4">
            ¿No tienes cuenta? 
            <span 
                className="font-semibold text-[var(--color-secondary)] cursor-pointer hover:text-[var(--color-primary)] ml-1"
                onClick={onToggleView} 
            >
                Crear Cuenta
            </span>
        </p>
    </form>
);


// ------------------------------------
// 2. COMPONENTE INTERNO: RegisterForm
// ------------------------------------
const RegisterForm = ({ onToggleView }: AuthFormProps) => (
    <form className="flex flex-col space-y-3"> 
        
        {/* Campo de Nombre */}
        <div className="relative flex items-center">
            <FaUser className="absolute left-4 text-gray-400" size={18} />
            <input
                type="text"
                placeholder="Nombre completo"
                className="w-full p-2.5 pl-12 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                required
            />
        </div>

        {/* Campo de Email */}
        <div className="relative flex items-center">
            <FaEnvelope className="absolute left-4 text-gray-400" size={18} />
            <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full p-2.5 pl-12 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                required
            />
        </div>
        
        {/* Campo de Teléfono */}
        <div className="relative flex items-center">
            <FaPhone className="absolute left-4 text-gray-400" size={18} />
            <input
                type="tel" 
                placeholder="Número de Teléfono"
                className="w-full p-2.5 pl-12 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                required
            />
        </div>

        {/* Campo de Contraseña */}
        <div className="relative flex items-center">
            <FaLock className="absolute left-4 text-gray-400" size={18} />
            <input
                type="password"
                placeholder="Crear contraseña"
                className="w-full p-2.5 pl-12 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                required
            />
        </div>

        {/* Campo de Confirmación de Contraseña */}
        <div className="relative flex items-center">
            <FaLock className="absolute left-4 text-gray-400" size={18} />
            <input
                type="password"
                placeholder="Confirmar contraseña"
                className="w-full p-2.5 pl-12 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm"
                required
            />
        </div>

        {/* Botón de Submit */}
        <Button
            type="submit"
            variant="contained"
            sx={{
                marginTop: '1.5rem', 
                padding: '12px 20px', 
                borderRadius: '0.75rem', 
                bgcolor: 'var(--color-secondary)', 
                color: 'white',
                fontSize: '0.9rem', 
                fontWeight: '600',
                '&:hover': {
                    bgcolor: 'var(--color-primary)',
                },
            }}
        >
            CREAR CUENTA
        </Button>
        
        {/* Pregunta de login */}
        <p className="text-center text-sm text-gray-500 pt-3">
            ¿Ya tienes cuenta? 
            <span 
                className="font-semibold text-[var(--color-secondary)] cursor-pointer hover:text-[var(--color-primary)] ml-1"
                onClick={onToggleView} 
            >
                Iniciar Sesión
            </span>
        </p>
    </form>
);


// ------------------------------------
// 3. COMPONENTE PRINCIPAL: AuthPage
// ------------------------------------

export default function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(true);

    const handleToggleView = () => setIsSignIn(!isSignIn);
    
    const secondaryColor = 'var(--color-secondary)'; // #214a2f
    const primaryColor = 'var(--color-primary)';     // #6a8e7f

    // La tarjeta principal se ajusta para contener el formulario de registro más largo
    const formCardHeight = isSignIn ? 'h-auto max-h-[550px]' : 'h-auto max-h-[650px]';

    return (
        // Fondo de pantalla completo con degradado de color
        <div 
            className="flex items-center justify-center min-h-screen p-8 "
            style={{ background: `linear-gradient(to bottom right, ${secondaryColor}, ${primaryColor})` }}
        >
            
            {/* Tarjeta de Login/Registro Centrada */}
            <div className={`bg-white rounded-[2rem] shadow-2xl p-8 w-full max-w-md transition-all duration-500 ${formCardHeight}`}>
                
                {/* Contenedor que alinea el Logo a la izquierda */}
                <div className="flex justify-start items-center mb-4">
                    {/* 🎯 1. Logo a la izquierda (Ajustamos el margen derecho) 🎯 */}
                    <div className="mr-10"> 
                        <Image 
                            src="/images/logo_lotm.png" 
                            alt="LotManager Logo" 
                            width={70} 
                            height={70} 
                            className="w-20 h-auto"
                        />
                    </div>
                    
                    {/* 🎯 2. Título principal (Centrado pero sin el logo en la misma línea) 🎯 */}
                    <div className="flex flex-col items-start">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {isSignIn ? 'Iniciar Sesión' : 'Crear Cuenta'}
                        </h2>
                    </div>
                </div>

                {/* Subtítulo de Instrucción (Mantenemos el subtítulo centrado para que se vea limpio) */}
                <p className="text-gray-600 mb-6 text-center text-sm"> 
                    {isSignIn
                        ? "Por favor, ingrese sus credenciales."
                        : "Únete a LotManager para comenzar la gestión de tu ganado."}
                </p>

                {/* Renderizado de Formularios */}
                <div className="w-full">
                    {isSignIn ? (
                        <LoginForm onToggleView={handleToggleView} />
                    ) : (
                        <RegisterForm onToggleView={handleToggleView} />
                    )}
                </div>
            </div>
        </div>
    );
}