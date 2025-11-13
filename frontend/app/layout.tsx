// app/layout.tsx 

import type { Metadata } from "next";
import "./globals.css";
import React from 'react';

export const metadata: Metadata = {
    title: "LotManager - Gestión de Ganado",
    description: "Sistema de gestión de lotes y engorde de ganado.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            {/* Solo un body limpio para que el page.tsx tome el control total del layout */}
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
}