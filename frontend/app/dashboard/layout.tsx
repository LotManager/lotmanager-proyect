//app/dashboard/layout.tsx

import type { Metadata } from 'next';
import React from 'react';
import DashboardLayout from '../../src/components/dashboard/DashboardLayout';


export const metadata: Metadata = {
    title: 'LotManager - Gestión de Ganado',
    description: 'La solución integral para la gestión de lotes.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout>{children}</DashboardLayout>
    );
}
