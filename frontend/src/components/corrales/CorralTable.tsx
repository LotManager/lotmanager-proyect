import { Chip } from "@mui/material";
import { EditButton, DeleteButton, ViewButton, SupplyButton } from "@/src/components/ui/buttons";
import { Corral } from "@/src/services/corral";

type Props = {
  title?: string;
  corrales: Corral[];
  onEdit: (c: Corral) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  onSupply?: (c: Corral) => void;
  chipColor?: "primary" | "error" | "success" | "default"; 
};

export function CorralTable({
  title,
  corrales,
  onEdit,
  onDelete,
  onView,
  onSupply,
  chipColor = "primary",
}: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      {title && (
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3">Número</th>
              <th className="px-4 py-3">Capacidad</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Dieta Actual</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {corrales.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No hay corrales registrados.
                </td>
              </tr>
            ) : (
              corrales.map((c) => (
                <tr key={c.id} className="border-b hover:bg-slate-50 transition-colors">
                  
                  {/* Número (Fuerte) */}
                  <td className="px-4 py-3 font-bold text-slate-700 text-lg">
                    #{c.numero}
                  </td>
                  
                  {/* ✅ CAPACIDAD: Agregamos negrita y color más oscuro */}
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {c.capacidadMaxima} <span className="text-sm text-gray-500">animales</span>
                  </td>
                  
                  {/* Tipo (Chip Sólido) */}
                  <td className="px-4 py-3">
                    <Chip 
                      label={c.tipo} 
                      color={c.tipo === "ENGORDE" ? "primary" : "error"} 
                      size="small" 
                      variant="filled" // ✅ CORRECCIÓN: Fondo Sólido
                    />
                  </td>
                  
                  {/* Dieta Actual (Chip Sólido) */}
                  <td className="px-4 py-3">
                    <Chip 
                      label={c.nombreDieta || "Sin Asignar"} 
                      color={c.nombreDieta && c.nombreDieta !== "Sin Dieta Asignada" ? "success" : "default"}
                      size="small"
                      variant="filled" // ✅ CORRECCIÓN: Fondo Sólido
                    />
                  </td>
                  
                  {/* Acciones */}
                  <td className="px-4 py-3 flex justify-end gap-2">
                    {onSupply && (
                      <SupplyButton onClick={() => onSupply(c)} label="" />
                    )}
                    <ViewButton onClick={() => onView(c.id)} label="" />
                    <EditButton onClick={() => onEdit(c)} label="" />
                    <DeleteButton onClick={() => onDelete(c.id)} label="" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}