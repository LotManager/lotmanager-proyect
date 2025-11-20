'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav 
            className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
                scrolled 
                ? 'bg-white/90 backdrop-blur-md border-gray-200 py-3 shadow-sm' 
                : 'bg-transparent border-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 md:w-12 md:h-12">
                        <Image 
                            src="/images/logo_lotm.png" 
                            alt="LotManager Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-secondary' : 'text-white'}`}>
                        LotManager
                    </span>
                </div>

                {/* Botones Actualizados */}
                <div className="flex items-center gap-4">
                    <Link 
                        // CAMBIO AQUÍ: Agregamos ?mode=login
                        href="/registro?mode=login" 
                        className={`font-medium text-sm transition-colors ${
                            scrolled ? 'text-gray-600 hover:text-primary' : 'text-white/90 hover:text-white'
                        }`}
                    >
                        Iniciar Sesión
                    </Link>
                    <Link 
                        // CAMBIO AQUÍ: Agregamos ?mode=register
                        href="/registro?mode=register" 
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:scale-105 ${
                            scrolled 
                            ? 'bg-primary text-white hover:bg-green-700' 
                            : 'bg-white text-primary hover:bg-gray-100'
                        }`}
                    >
                        Crear Cuenta
                    </Link>
                </div>
            </div>
        </nav>
    );
}