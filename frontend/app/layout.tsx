// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // O tu fuente

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LotManager',
  description: 'Gestión de ganado eficiente',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}