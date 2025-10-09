// components/reportes/SanidadStats.tsx
import { SanidadRow } from '@/types/reportes';

export default function SanidadStats({ rows }: { rows: SanidadRow[] }) {
  const totalAnimales = rows.reduce((acc, r) => acc + r.sanos + r.tratamiento + r.criticos, 0);
  const totalSanos = rows.reduce((acc, r) => acc + r.sanos, 0);
  const totalTratamiento = rows.reduce((acc, r) => acc + r.tratamiento, 0);
  const totalCriticos = rows.reduce((acc, r) => acc + r.criticos, 0);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Estadísticas de Sanidad</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Animales sanos</p>
          <p className="text-2xl text-green-600">{((totalSanos / totalAnimales) * 100).toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">En tratamiento</p>
          <p className="text-2xl text-yellow-600">{((totalTratamiento / totalAnimales) * 100).toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Casos críticos</p>
          <p className="text-2xl text-red-600">{((totalCriticos / totalAnimales) * 100).toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total animales</p>
          <p className="text-2xl text-gray-800">{totalAnimales}</p>
        </div>
      </div>
    </div>
  );
}