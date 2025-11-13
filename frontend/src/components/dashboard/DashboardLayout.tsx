"use client";

import React from 'react';
// IMPORTANTE: Asumimos que PanelDashboard es el componente de sidebar funcional
import PanelDashboard from './panelDashboard'; 
import Topbar from './Topbar';  

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    // ESTADO: Necesitamos obtener el estado 'isCollapsed' del sidebar para ajustar el margen.
    // Como el sidebar maneja su estado internamente, necesitamos una manera de comunicarlo.
    // Para simplificar: lo haremos aquí y pasaremos la prop. (PERO ESO ES MÁS CÓDIGO)

    // SOLUCIÓN SIMPLE: El sidebar ya maneja el margen, sólo hay que ajustarlo.
    
    return (
        // Contenedor principal que se estira y permite al sidebar 'fixed' trabajar
        <div className="flex min-h-screen bg-gray-50 w-full relative">
            
            {/* Sidebar Colapsable (Ahora fixed/top/left) */}
            <PanelDashboard />
            
            {/* Contenido Principal (Esta área debe ser la que recibe el margen) */}
            <div className="flex-1 flex flex-col">
                <Topbar />
                
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}