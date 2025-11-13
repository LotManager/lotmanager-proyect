"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
    FaHome, FaSyringe, FaUtensils, FaTractor, FaChartBar, FaUser,
    FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';
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
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside className={`
            bg-white text-gray-800 flex flex-col shadow-xl border-r border-gray-200
            transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-20' : 'w-64'}
        `}>
            
            {/* Header con Logo y Toggle */}
            <div className="p-4 flex items-center justify-between border-b border-gray-200 relative">
                {/* Logo y Título */}
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 relative flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`}>
                        <Image src="/images/logo_lotm.png" alt="Logo" fill className="object-contain" />
                    </div>
                    
                    {/* Título (solo visible cuando está expandido) */}
                    {!isCollapsed && (
                        <div className="flex-shrink-0">
                            <h2 className="text-xl font-extrabold tracking-wide text-green-800">Feedlot System</h2>
                            <span className="text-sm text-gray-500">Tambero</span>
                        </div>
                    )}
                </div>

                {/* Botón de Toggle */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
                >
                    {isCollapsed ? (
                        <FaChevronRight size={10} className="text-gray-600" />
                    ) : (
                        <FaChevronLeft size={10} className="text-gray-600" />
                    )}
                </button>
            </div>

            {/* Navegación */}
            <nav className="flex-1 p-2 overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link 
                                    href={item.href}
                                    className={`
                                        flex items-center gap-3 p-2 rounded transition-colors duration-200 
                                        ${isActive 
                                            ? 'bg-green-50 text-green-800 font-semibold border-r-2 border-green-600' 
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }
                                        ${isCollapsed ? 'justify-center' : ''}
                                    `}
                                    title={isCollapsed ? item.name : ""}
                                >
                                    <item.icon 
                                        size={18} 
                                        className={isActive ? 'text-green-600' : 'text-gray-500'} 
                                    />
                                    
                                    {/* Texto del enlace (solo visible cuando está expandido) */}
                                    {!isCollapsed && (
                                        <span className="whitespace-nowrap">{item.name}</span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer con Cerrar Sesión */}
            <div className="p-4 border-t border-gray-200">
                <Button
                    variant="text"
                    startIcon={!isCollapsed ? <FaUser /> : undefined}
                    className={`
                        w-full justify-start transition-all duration-300
                        ${isCollapsed ? 'justify-center min-w-0' : ''}
                    `}
                    sx={{ 
                        color: 'gray', 
                        '&:hover': { 
                            color: 'red', 
                            backgroundColor: 'rgba(239, 68, 68, 0.1)' 
                        } 
                    }}
                    onClick={() => { console.log('Cerrar Sesión') }}
                    title={isCollapsed ? "Cerrar Sesión" : ""}
                >
                    {!isCollapsed && "Cerrar Sesión"}
                </Button>
            </div>
        </aside>
    );
}