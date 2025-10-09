// components/reportes/ResumenMensual.tsx
import { ResumenRow } from '@/types/reportes';

export default function ResumenMensual({ rows }: { rows: ResumenRow[] }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Resumen Mensual</h2>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="py-2 text-gray-600">{r.concepto}</td>
              <td className="py-2 font-medium text-right">{r.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}