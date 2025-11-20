// app/layout.tsx (Versión Raíz - Server Component)

import type { Metadata } from 'next';
import React from 'react';
import './globals.css'; 

export const metadata: Metadata = {
  title: "LotManager - Gestión de Ganado",
  description: "La solución integral para la gestión de lotes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        {children}
      </body>
    </html>
  );
}