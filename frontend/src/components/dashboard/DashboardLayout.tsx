"use client";

import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';  

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* 1. Barra Superior (Header) */}
            <Topbar />

            <div className="flex flex-1">
                {/* 2. Barra Lateral (Sidebar) */}
                <Sidebar />

                {/* 3. Área de Contenido Principal */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}