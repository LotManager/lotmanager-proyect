// app/registro/page.tsx
"use client";

import Link from 'next/link';
import React, { useState, useEffect, Suspense } from "react";
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '@mui/material'; // Usamos TUS botones MUI
import { FaUser, FaLock, FaEnvelope, FaPhone, FaArrowLeft } from 'react-icons/fa';

// --------------------------------------------------------
// 1. ESTILOS LOGIN
// --------------------------------------------------------

// Este es el estilo exacto que tenías en tus inputs (bg-gray-50, rounded-xl, etc.)
const inputClass = "w-full p-3 pl-12 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] bg-gray-50 text-[var(--color-secondary)] placeholder-gray-500 outline-none transition-all duration-200 shadow-sm";

// --------------------------------------------------------
// 2. FORMULARIO DE LOGIN
// --------------------------------------------------------

interface AuthFormProps {
    onToggleView: () => void;
}

const LoginForm = ({ onToggleView }: AuthFormProps) => (
    <form className="flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500"> 
        
        {/* Usuario */}
        <div className="relative flex items-center">
            <FaUser className="absolute left-4 text-gray-400" size={18} />
            <input type="text" placeholder="Usuario o Email" className={inputClass} required />
        </div>
        
        {/* Contraseña */}
        <div className="relative flex items-center">
            <FaLock className="absolute left-4 text-gray-400" size={18} />
            <input type="password" placeholder="Contraseña" className={inputClass} required />
        </div>

        {/* Footer del form */}
        <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">¿No tienes cuenta?</p>
            <p 
                className="text-xs font-bold text-[var(--color-secondary)] cursor-pointer hover:text-[var(--color-primary)] hover:underline transition-all"
                onClick={onToggleView}
            >
                Crear Cuenta
            </p>
        </div>

        <Button
            type="submit"
            variant="contained"
            sx={{
                marginTop: '1rem', 
                padding: '12px', 
                borderRadius: '0.75rem', 
                bgcolor: 'var(--color-secondary)', 
                color: 'white',
                fontSize: '0.9rem', 
                fontWeight: '600', 
                textTransform: 'none', // Para que no sea todo mayúsculas si no quieres
                boxShadow: '0 4px 14px 0 rgba(20, 83, 45, 0.39)',
                '&:hover': {
                    bgcolor: 'var(--color-primary)', 
                },
            }}
        >
            INICIAR SESIÓN
        </Button>

        <p className="text-center text-xs text-[var(--color-secondary)] hover:text-[var(--color-primary)] cursor-pointer mt-6">
            ¿Olvidaste tu contraseña?
        </p>
    </form>
);

// --------------------------------------------------------
// 3. FORMULARIO DE REGISTRO
// --------------------------------------------------------

const RegisterForm = ({ onToggleView }: AuthFormProps) => (
    <form className="flex flex-col space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-500"> 
        
        {/* FILA 1: Nombre y Apellido (Comparten fila) */}
        <div className="grid grid-cols-2 gap-3">
            <div className="relative flex items-center">
                <FaUser className="absolute left-4 text-gray-400" size={14} />
                <input type="text" placeholder="Nombre" className={inputClass} required />
            </div>
            <div className="relative flex items-center">
                {/* Usamos el mismo icono o puedes importar FaUserTag si prefieres */}
                <FaUser className="absolute left-4 text-gray-400" size={14} />
                <input type="text" placeholder="Apellido" className={inputClass} required />
            </div>
        </div>

        {/* FILA 2: Email (Ancho completo ahora) */}
        <div className="relative flex items-center">
            <FaEnvelope className="absolute left-4 text-gray-400" size={16} />
            <input type="email" placeholder="Correo electrónico" className={inputClass} required />
        </div>

        {/* FILA 3: Contraseña (Ancho completo ahora) */}
        <div className="relative flex items-center">
            <FaLock className="absolute left-4 text-gray-400" size={16} />
            <input type="password" placeholder="Contraseña" className={inputClass} required />
        </div>

        {/* FILA 4: Confirmar (Ancho completo ahora) */}
        <div className="relative flex items-center">
            <FaLock className="absolute left-4 text-gray-400" size={16} />
            <input type="password" placeholder="Confirmar contraseña" className={inputClass} required />
        </div>

        {/* BOTÓN */}
        <Button type="submit" variant="contained" 
        sx={{
                marginTop: '0.5rem', // Reduje un poco el margen superior para que entre bien
                padding: '12px',
                borderRadius: '0.75rem',
                bgcolor: 'var(--color-secondary)',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: '600',
                textTransform: 'none',
                boxShadow: '0 4px 14px 0 rgba(20, 83, 45, 0.39)',
                '&:hover': {
                bgcolor: 'var(--color-primary)',
                },
            }}
        >CREAR CUENTA</Button>
        
        <p className="text-center text-xs text-gray-500 pt-1">
            ¿Ya tienes cuenta? 
            <span 
                className="font-bold text-[var(--color-secondary)] cursor-pointer hover:text-[var(--color-primary)] hover:underline ml-1"
                onClick={onToggleView} 
            >Iniciar Sesión</span>
        </p>
    </form>
);
// --------------------------------------------------------
// 4. CONTENEDOR PRINCIPAL 
// --------------------------------------------------------

function AuthContainer() {
    const searchParams = useSearchParams();
    const initialMode = searchParams.get('mode');
    const [isSignIn, setIsSignIn] = useState(true);

    useEffect(() => {
        if (initialMode === 'register') {
            setIsSignIn(false);
        } else {
            setIsSignIn(true);
        }
    }, [initialMode]);

    const handleToggleView = () => setIsSignIn(!isSignIn);

    return (
        // h-screen y overflow-hidden aseguran que NO HAYA SCROLL
        <div className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-gray-900">
            
            {/* FONDO (Tu fondo nuevo que te gustó) */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center scale-105"
                    style={{ backgroundImage: "url('/images/bg_lotm_home.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/90 to-black/80 backdrop-blur-[2px]" />
            </div>

            {/* TARJETA (Tu estilo original blanco y redondeado, pero con un toque moderno) */}
            <div className="relative z-10 w-full max-w-[450px] bg-white rounded-[2rem] shadow-2xl shadow-black/40 p-8 transition-all duration-500 mx-4">
                
                <div className="absolute top-6 left-6 z-20">
                    <Link href="/" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 group">
                        <FaArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold">Volver</span>
                    </Link>
                </div>

                {/* Encabezado */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="relative w-16 h-16"> 
                        <Image 
                            src="/images/logo_lotm.png" 
                            alt="LotManager Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="text-left">
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                            {isSignIn ? 'Bienvenido' : 'Crear Cuenta'}
                        </h2>
                        <p className="text-xs text-gray-500">
                            Gestión Ganadera Inteligente
                        </p>
                    </div>
                </div>

                {/* Renderizado Condicional del Formulario */}
                <div className="w-full">
                    {isSignIn ? (
                        <LoginForm onToggleView={handleToggleView} />
                    ) : (
                        <RegisterForm onToggleView={handleToggleView} />
                    )}
                </div>
                
                {/* Footer Copyright que te gustó */}
                <div className="mt-6 text-center border-t border-gray-100 pt-4">
                    <p className="text-[10px] text-gray-400 font-medium">© {new Date().getFullYear()} LotManager. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
}

// --------------------------------------------------------
// 5. EXPORTACIÓN 
// --------------------------------------------------------

export default function AuthPage() {
    return (
        <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-[var(--color-secondary)]">
                <div className="text-white animate-pulse font-bold">Cargando LotManager...</div>
            </div>
        }>
            <AuthContainer />
        </Suspense>
    );
}