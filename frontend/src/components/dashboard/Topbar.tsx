"use client";

import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

export default function Topbar() {
    const userName = "Usuario Demo";

    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md border-b">
            {/* Columna Izquierda (Se puede usar para el título de la página actual) */}
            <h1 className="text-xl font-semibold text-gray-800">
                Feedlot System
            </h1>

            {/* Columna Derecha: Controles de Usuario */}
            <div className="flex items-center gap-4">
                <button className="text-gray-600 hover:text-[var(--color-secondary)] transition-colors">
                    <FaBell size={20} />
                </button>
                
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span>Admin</span> 
                    <FaUserCircle size={24} className="text-[var(--color-secondary)]" />
                    <span>{userName}</span>
                </div>
            </div>
        </header>
    );
}