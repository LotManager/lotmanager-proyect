import { Paper, Chip, CircularProgress } from "@mui/material";
import { Bovino } from "@/src/services/bovino";
import { EditButton, ViewButton, DeleteButton, WeighButton, MoveButton } from "@/src/components/ui/buttons";

type Props = {
  bovinos: Bovino[];
  loading: boolean;
  // Hacemos las funciones opcionales (?) para que el componente sea flexible
  // y no explote si alguna página no necesita una acción específica.
  onDelete?: (id: number) => void;
  onEdit?: (bovino: Bovino) => void;
  onView?: (id: number) => void;
  onMove?: (bovino: Bovino) => void;
};

export function AnimalTable({ bovinos, loading, onDelete, onEdit, onView, onMove }: Props) {

  // Helper para darle color al estado
  const getStatusChip = (status: string) => {
    switch (status) {
      case "SANO":
        return <Chip label="Sano" color="success" size="small" variant="outlined" />;
      case "ENFERMO":
        return <Chip label="Enfermo" color="error" size="small" variant="filled" />;
      case "FALLECIDO":
      case "MUERTO":
        return <Chip label="Fallecido" color="default" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Paper elevation={2} className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-700">Lista de Animales</h2>
        <span className="text-sm text-slate-500">
          {bovinos.length} registrados
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="text-left p-3 font-semibold text-slate-600">Caravana</th>
              <th className="text-left p-3 font-semibold text-slate-600">Peso Actual</th>
              <th className="text-left p-3 font-semibold text-slate-600">Corral</th>
              <th className="text-left p-3 font-semibold text-slate-600">GMD</th>
              <th className="text-left p-3 font-semibold text-slate-600">Estado</th>
              <th className="text-left p-3 font-semibold text-slate-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center p-8">
                  <div className="flex flex-col items-center gap-2">
                    <CircularProgress size={30} />
                    <p className="text-slate-500 text-sm">Cargando animales...</p>
                  </div>
                </td>
              </tr>
            ) : bovinos.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-8 text-slate-500">
                  No se encontraron animales. Registra uno para comenzar.
                </td>
              </tr>
            ) : (
              bovinos.map((bovino) => (
                <tr key={bovino.id} className="border-b hover:bg-slate-50 transition-colors">
                  {/* Caravana */}
                  <td className="p-3 font-mono font-bold text-slate-700">
                    #{bovino.caravana}
                  </td>
                  
                  {/* Peso */}
                  <td className="p-3 font-medium">
                    {bovino.pesoActual} kg
                  </td>
                  
                  {/* Corral */}
                  <td className="p-3 text-slate-600">
                    {bovino.nombreCorral}
                  </td>
                  
                  {/* GMD */}
                  <td className="p-3 font-medium text-green-600">
                    {bovino.gmd > 0 ? `+${bovino.gmd}` : bovino.gmd} kg/día
                  </td>
                  
                  {/* Estado (Chip) */}
                  <td className="p-3">
                    {getStatusChip(bovino.estadoSalud)}
                  </td>
                  
                  {/* Acciones */}
                  <td className="p-3 flex gap-2">
                    {/* Usamos '&&' para renderizar el botón SOLO si se pasó la función */}
                    {onView && <WeighButton onClick={() => onView(bovino.id)} label="" />}
                    {onMove && <MoveButton onClick={() => onMove(bovino)} label="" />}
                    {onEdit && <EditButton onClick={() => onEdit(bovino)} label="" />}
                    {onDelete && <DeleteButton onClick={() => onDelete(bovino.id)} label="" />}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Paper>
  );
}