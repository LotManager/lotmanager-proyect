"use client"; // Necesita ser Cliente para usar useState y useEffect (para el modal)

import React, { useState, useEffect} from 'react';
import { IoClose } from 'react-icons/io5'; // Icono para cerrar
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';


// Definimos las props que recibirá el modal
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void; // Función para cerrar el modal
    initialView: 'login' | 'register'; // Nueva prop
}

export default function AuthModal({ isOpen, onClose, initialView }: AuthModalProps) {
    const [isSignIn, setIsSignIn] = useState(initialView === 'login');

    // Usamos useEffect para actualizar el estado interno cada vez que la prop initialView cambie
    useEffect(() => {
        setIsSignIn(initialView === 'login');
    }, [initialView]);

    if (!isOpen) {
        return null;
    }

    const backdropClasses = 'fixed inset-0 bg-[var(--color-secondary)] bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-300';

    const formContainerClasses = 'bg-white rounded-xl shadow-2xl p-10 w-full max-w-sm';
    
    return (
        <div className={backdropClasses} onClick={onClose}>
            <div className={formContainerClasses} onClick={(e) => e.stopPropagation()}>
                
                {/* Botón de Cierre (Cambiamos el color a secundario para que contraste con el fondo blanco) */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                    <IoClose size={24} />
                </button>

                {/* Alternador Sign Up / Sign In - AJUSTE DE COLOR DE TEXTO A OSCURO */}
                <div className="flex justify-center mb-6 border-b border-gray-200 pb-2">
                    <button
                        onClick={() => setIsSignIn(false)}
                        className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                            !isSignIn ? 'text-[var(--color-secondary)] border-b-2 border-[var(--color-secondary)]' : 'text-gray-500 hover:text-[var(--color-secondary)]'
                        }`}
                    >
                        Registro
                    </button>
                    <button 
                        onClick={() => setIsSignIn(true)}
                        className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                            isSignIn ? 'text-[var(--color-secondary)] border-b-2 border-[var(--color-secondary)]' : 'text-gray-500 hover:text-[var(--color-secondary)]'
                        }`}
                    >
                        Inicio de Sesión
                    </button>
                </div>
                
                {/* Título */}
                <h2 className="text-3xl font-extrabold text-[var(--color-secondary)] mb-6 text-center">
                    {isSignIn ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </h2>

                {/* Formularios (Cambiamos el color de texto) */}
                <div className="text-[var(--color-secondary)]">
                    {isSignIn ? (
                        <SignInForm />
                    ) : (
                        <SignUpForm />
                    )}
                </div>

            </div>
        </div>
    );
}
