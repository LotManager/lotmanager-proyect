// src/components/dashboard/DashboardLayout.tsx
"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar'; 

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50 relative w-full">
            
            {/* 1. SIDEBAR */}
            {/* Asumimos que tu Sidebar tiene 'fixed' o 'absolute' h-full z-50 */}
            <Sidebar 
                isCollapsed={isCollapsed}
                onToggle={() => setIsCollapsed(!isCollapsed)}
            />

            {/* 2. ÁREA DE CONTENIDO PRINCIPAL */}
            <div 
                className={`w-full transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}
            >
                
                {/* Contenido de la Página */}
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}