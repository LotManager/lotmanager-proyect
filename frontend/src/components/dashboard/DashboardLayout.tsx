// src/components/dashboard/DashboardLayout.tsx
"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import { FaBell, FaUserCircle } from 'react-icons/fa'; 

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const secondaryColor = '#234c2f';
    const contentMarginClass = isCollapsed ? 'ml-0' : 'ml-64'; 
    
    return (
        <div className="flex min-h-screen bg-gray-50 relative w-full">
            
            {/* 1. SIDEBAR (Componente Sidebar) */}
            <Sidebar 
                isCollapsed={isCollapsed}
                onToggle={() => setIsCollapsed(!isCollapsed)}
            />

            {/* 2. ÁREA DE CONTENIDO PRINCIPAL */}
            <div className={`w-full  ${isCollapsed ? 'ml-20' : 'ml-32'}`}>
                
                {/* Contenido de la Página */}
                <main className="flex-1 p-2 md:p-4 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}