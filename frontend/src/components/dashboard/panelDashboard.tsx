"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    FaChartBar, FaWarehouse, FaSyringe, FaUsers, 
    FaChevronLeft, FaChevronRight 
} from "react-icons/fa";
import { 
    FiHome, FiList, FiFramer, FiLogOut 
} from "react-icons/fi"; 

// --- DEFINICIÓN DE TIPOS Y ENLACES ---
type NavItem = {
    label: string;
    href: string;
    Icon: React.ElementType;
};

const NAV: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", Icon: FiHome },
    { label: "Gestión de Animales", href: "/dashboard/animals", Icon: FiList }, 
    { label: "Corrales/Lotes", href: "/dashboard/corrales", Icon: FaWarehouse }, 
    { label: "Dietas", href: "/dashboard/dietas", Icon: FiFramer },
    { label: "Control Sanitario", href: "/dashboard/sanitary", Icon: FaSyringe }, 
    { label: "Reportes", href: "/dashboard/reports", Icon: FaChartBar },
    { label: "Gestión de Empleados", href: "/dashboard/employees", Icon: FaUsers },
];

export default function PanelDashboard() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            {/* ASIDE: Contenedor Principal del Sidebar */}
            <aside className={`
                fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col
                transition-all duration-300 ease-in-out z-50
                ${isCollapsed ? 'w-20' : 'w-72'}
            `}>
                
                {/* ZONA SUPERIOR: Logo, Título y Botón de Toggle */}
                <div className="px-4 py-5 flex items-center justify-between border-b border-slate-100 relative">
                    
                    {/* Contenedor del Logo y Texto del Sistema */}
                    <div className="flex items-center gap-3">
                        {/* Logo (Siempre visible) */}
                        <div className={`w-10 h-10 relative flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-0'}`}> 
                            <Image src="/images/logo_lotm.png" alt="logo" fill className="object-contain" />
                        </div>
                        
                        {/* Título del Sistema (Solo visible si está expandido) */}
                        <div className={`flex-shrink-0 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                            <h2 className="text-lg font-semibold text-green-800 whitespace-nowrap">Feedlot System</h2>
                            <span className="text-sm text-slate-500 whitespace-nowrap">Tambero</span>
                        </div>
                    </div>
                    
                    {/* Botón de toggle */}
                    <button
                        onClick={toggleSidebar}
                        className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
                    >
                        {isCollapsed ? (
                            <FaChevronRight size={10} className="text-slate-600" />
                        ) : (
                            <FaChevronLeft size={10} className="text-slate-600" />
                        )}
                    </button>
                </div>

                {/* NAVEGACIÓN PRINCIPAL */}
                <nav className="px-2 py-4 flex-1 overflow-y-auto">
                    <ul className="space-y-1">
                        {NAV.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 hover:bg-green-50 hover:text-green-800 transition-colors group relative"
                                    title={isCollapsed ? item.label : ""}
                                >
                                    <item.Icon className="text-green-600 flex-shrink-0" size={20} />
                                    
                                    <span className={`
                                        text-sm font-medium whitespace-nowrap transition-all duration-300
                                        ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}
                                    `}>
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* ZONA INFERIOR: Cerrar Sesión SIMPLE como antes */}
                <div className="px-2 py-4 border-t border-slate-100">
                    <Link
                        href="/logout"
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors group relative"
                        title={isCollapsed ? "Cerrar Sesión" : ""}
                    >
                        <FiLogOut className="text-red-600 flex-shrink-0" size={18} />
                        <span className={`
                            text-sm whitespace-nowrap transition-all duration-300
                            ${isCollapsed ? 'opacity-0 w-0 absolute left-full ml-2 bg-white px-2 py-1 rounded shadow-md invisible group-hover:visible' : 'opacity-100 w-auto relative'}
                        `}>
                            Cerrar Sesión
                        </span>
                    </Link>
                </div>
            </aside>

            {/* ESPACIO PARA EL CONTENIDO PRINCIPAL */}
            <div className={`
                transition-all duration-300 ease-in-out
                ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}
            `}>
            </div>
        </>
    );
}