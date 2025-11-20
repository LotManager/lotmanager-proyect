import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../Sidebar';
import { usePathname } from 'next/navigation';

// Mock next/link to render children directly
jest.mock('next/link', () => ({ __esModule: true, default: ({ href, children }: any) => <a href={href}>{children}</a> }));

// Mock usePathname
jest.mock('next/navigation', () => ({
  __esModule: true,
  usePathname: jest.fn(),
}));

// Mock MUI Button to a simple button
jest.mock('@mui/material', () => ({
  __esModule: true,
  Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}));

// Mock react-icons to simple components
jest.mock('react-icons/fa', () => ({
  __esModule: true,
  FaHome: () => <span>home-icon</span>,
  FaSyringe: () => <span>syringe-icon</span>,
  FaUtensils: () => <span>utensils-icon</span>,
  FaTractor: () => <span>tractor-icon</span>,
  FaWeightHanging: () => <span>weight-icon</span>,
  FaChartBar: () => <span>chart-icon</span>,
  FaUser: () => <span>user-icon</span>,
}));

describe('Sidebar', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders the logo and title', () => {
    render(<Sidebar />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('LotManager')).toBeInTheDocument();
  });

  test('renders all navigation items with correct labels and links', () => {
    render(<Sidebar />);

    const items = [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Gestión de Animales', href: '/dashboard/animales' },
      { name: 'Corrales/Lotes', href: '/dashboard/corrales' },
      { name: 'Dietas', href: '/dashboard/dietas' },
      { name: 'Control Sanitario', href: '/dashboard/sanidad' },
      { name: 'Reportes', href: '/dashboard/reportes' },
    ];

    items.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });

  test('highlights the active route based on pathname', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard/corrales');
    render(<Sidebar />);

    const active = screen.getByRole('link', { name: 'Corrales/Lotes' });
    // Should include active styles
    expect(active.className).toMatch(/bg-gray-200/);
    expect(active.className).toMatch(/text-\[var\(--color-secondary\)\]/);
  });

  test('non-active routes do not have active styles', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
    render(<Sidebar />);

    const inactive = screen.getByRole('link', { name: 'Reportes' });
    expect(inactive.className).not.toMatch(/bg-gray-200/);
  });

  test('logout button triggers console log', () => {
    render(<Sidebar />);
    const btn = screen.getByRole('button', { name: /cerrar sesión/i });
    btn.click();
    expect(console.log).toHaveBeenCalledWith('Cerrar Sesión');
  });
});
