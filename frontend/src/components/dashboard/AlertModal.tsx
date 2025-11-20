// src/components/dashboard/AlertModal.tsx
'use client';

import { FaTimes, FaBell } from 'react-icons/fa';

interface Alert {
  title: string;
  desc: string;
  date: string;
}

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: Alert[];
}

export default function AlertModal({ isOpen, onClose, alerts }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Todas las alertas</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes size={18} />
          </button>
        </div>

        {/* Lista */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {alerts.map((alert, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-red-200 bg-red-50">
              <FaBell className="text-red-500 mt-1" size={16} />
              <div>
                <p className="font-semibold text-sm text-red-800">{alert.title}</p>
                <p className="text-xs text-red-600">{alert.desc}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:opacity-90"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}