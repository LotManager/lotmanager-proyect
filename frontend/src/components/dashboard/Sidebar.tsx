// src/components/dashboard/Sidebar.tsx

"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
    FaChartBar, FaWarehouse, FaSyringe, FaUsers, FaSignOutAlt, 
    FaChevronLeft, FaChevronRight, FaClipboardList, FaSeedling, FaHeart, FaHome
} from "react-icons/fa";

// ✅ 1. IMPORTAMOS EL HOOK DE AUTH
import { useAuth } from "@/src/contexts/AuthContext";

const navItems = [
    { name: 'Home', href: '/dashboard', icon: FaHome },
    { name: 'Gestión de Animales', href: '/dashboard/bovinos', icon: FaClipboardList }, 
    { name: 'Corrales/Lotes', href: '/dashboard/corrales', icon: FaWarehouse }, 
    { name: 'Dietas', href: '/dashboard/dietas', icon: FaSeedling },
    { name: 'Control Sanitario', href: '/dashboard/sanidad', icon: FaHeart },
    { name: 'Reportes', href: '/dashboard/reports', icon: FaChartBar },
    { name: 'Gestión de Empleados', href: '/dashboard/empleados', icon: FaUsers },

];

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const { user } = useAuth();
    const isAdmin = user?.rol === "ADMINISTRADOR";
    // ✅ 2. OBTENEMOS LA FUNCIÓN LOGOUT DEL CONTEXTO
    const { logout } = useAuth();

    const secondaryColor = '#234c2f'; 
    const activeBgColor = '#6a8e7f'; 

    return (
        <aside className={`
            fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col
            transition-all duration-300 ease-in-out z-50
            ${isCollapsed ? 'w-20' : 'w-64'}
        `}>
            
            {/* Header del Sidebar (Logo y Título) */}
            <div className="p-4 border-b border-gray-200 relative">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 relative flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`}> 
                        <Image src="/images/logo_lotm.png" alt="Logo" width={40} height={40} className="object-contain" />
                    </div>
                    
                    {!isCollapsed && (
                        <div className="flex-shrink-0">
                            <h2 className="font-bold text-lg" style={{ color: secondaryColor }}>LotManager</h2>
                        </div>
                    )}
                </div>
                
                <button
                    onClick={onToggle}
                    className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 
                    bg-white border border-gray-300 rounded-full flex items-center 
                    justify-center shadow-md hover:shadow-lg transition-all z-10"
                >
                    {isCollapsed ? <FaChevronRight size={10} className="text-gray-600" /> : <FaChevronLeft size={10} className="text-gray-600" />}
                </button>
            </div>

            {/* Navegación Principal */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        if (item.name === 'Reportes' && !isAdmin) {
                            return null;
                        }
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        
                        return (
                            <li key={item.name}>
                                <Link 
                                    href={item.href}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-lg transition-all
                                        ${isCollapsed ? 'justify-center' : ''}
                                        ${isActive ? 'pointer-events-none' : 'text-gray-700 hover:bg-gray-100'}
                                    `}
                                    style={{ backgroundColor: isActive ? activeBgColor : undefined }}
                                    title={isCollapsed ? item.name : ""}
                                >
                                    <Icon 
                                        size={18} 
                                        style={{ color: isActive ? 'white' : secondaryColor }} 
                                        className="flex-shrink-0" 
                                    />
                                    {!isCollapsed && (
                                        <span className={`font-medium whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-700'}`}>
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer: Cerrar Sesión */}
            <div className="p-4 border-t border-gray-200">
                {/* ✅ 3. BOTÓN DE LOGOUT CORREGIDO */}
                {/* Ya no es un Link, es un button que llama a la función logout */}
                <button
                    onClick={logout} 
                    className={`
                        w-full flex items-center gap-3 p-3 rounded-lg text-gray-700 
                        hover:bg-red-50 hover:text-red-600 transition-all
                        ${isCollapsed ? 'justify-center' : ''}
                    `}
                    title={isCollapsed ? "Cerrar Sesión" : ""}
                >
                    <FaSignOutAlt size={18} className="text-red-600" />
                    {!isCollapsed && <span>Cerrar Sesión</span>}
                </button>
            </div>
        </aside>
    );
}