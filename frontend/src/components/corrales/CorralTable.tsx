import { Chip } from "@mui/material"
import { EditButton, DeleteButton, ViewButton } from "@/src/components/ui/buttons"
import { Corral } from "@/src/services/corral"

type Props = {
  title: string
  subtitle?: string
  corrales: Corral[]
  chipColor: "primary" | "error"
  onEdit: (c: Corral) => void
  onDelete: (id: number) => void
  onView: (id: number) => void
  rowHoverClass?: string
}

export function CorralTable({
  title,
  subtitle,
  corrales,
  chipColor,
  onEdit,
  onDelete,
  onView,
  rowHoverClass = "hover:bg-slate-50",
}: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="px-4 py-3 border-b border-slate-100">
        <h2 className="text-lg font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="p-4 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Número</th>
                <th className="text-left p-3 font-semibold">Capacidad</th>
                <th className="text-left p-3 font-semibold">Dieta</th>
                <th className="text-left p-3 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {corrales.map((c) => (
                <tr key={c.id} className={`border-b ${rowHoverClass}`}>
                  <td className="p-3 font-bold text-lg">{c.numero}</td>
                  <td className="p-3">{c.capacidadMaxima}</td>
                  <td className="p-3">
                    <Chip
                      label={c.nombreAlimentacion ?? "Sin dieta"}
                      color={chipColor}
                      size="small"
                    />
                  </td>
                  <td className="p-3 flex gap-2">
                    <EditButton onClick={() => onEdit(c)} />
                    <DeleteButton onClick={() => onDelete(c.id)} />
                    <ViewButton onClick={() => onView(c.id)} />
                  </td>
                </tr>
              ))}
              {corrales.length === 0 && (
                <tr>
                  <td className="p-4 text-slate-500" colSpan={4}>
                    No hay corrales en esta categoría.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}