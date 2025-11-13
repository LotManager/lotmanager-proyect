"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaSyringe, FaUtensils, FaTractor, FaWeightHanging, FaChartBar, FaUser } from 'react-icons/fa';
import { Button } from '@mui/material';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FaHome },
    { name: 'Gestión de Animales', href: '/dashboard/animales', icon: FaTractor },
    { name: 'Corrales/Lotes', href: '/dashboard/corrales', icon: FaTractor },
    { name: 'Dietas', href: '/dashboard/dietas', icon: FaUtensils },
    { name: 'Control Sanitario', href: '/dashboard/sanidad', icon: FaSyringe },
    { name: 'Reportes', href: '/dashboard/reportes', icon: FaChartBar },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <nav className="w-64 bg-[var(--color-secondary)] text-white p-4 flex flex-col shadow-xl">
            {/* Logo y Título */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/20">
                <img src="/images/logo_lotm.png" alt="Logo" className="h-10 w-auto bg-white p-1 rounded-full"/>
                <h2 className="text-xl font-extrabold tracking-wide">LotManager</h2>
            </div>

            {/* Enlaces de Navegación */}
            <ul className="space-y-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={item.name}>
                            <Link href={item.href} legacyBehavior>
                                <a 
                                    // 🎯 CLASES DEL LAYOUT GRIS/BLANCO 🎯
                                    className={`flex items-center gap-3 p-2 rounded transition-colors duration-200 
                                    ${isActive 
                                        ? 'bg-gray-200 text-[var(--color-secondary)] font-semibold' // Fondo gris claro, texto verde
                                        : 'text-gray-600 hover:bg-gray-100'}` // Texto gris, hover sutil
                                    }
                                >
                                    <item.icon size={18} />
                                    <span>{item.name}</span>
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            
            {/* Botón de Cerrar Sesión (al final del sidebar) */}
            <div className="mt-auto pt-4 border-t border-white/20">
                <Button
                    variant="text"
                    startIcon={<FaUser />}
                    sx={{ color: 'white', '&:hover': { color: 'var(--color-primary)', backgroundColor: 'transparent' } }}
                    onClick={() => { console.log('Cerrar Sesión') }} 
                >
                    Cerrar Sesión
                </Button>
            </div>
        </nav>
    );
}