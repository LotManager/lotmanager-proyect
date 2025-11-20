import { Paper, Chip, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Alimento } from "@/src/services/alimento";

type Props = {
  alimentos: Alimento[];
  onEdit: (alimento: Alimento) => void;
  onDelete: (id: number) => void;
};

export function AlimentoTable({ alimentos, onEdit, onDelete }: Props) {
  return (
    <Paper elevation={0} className="overflow-hidden border border-gray-200 rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Tipo</th>
            <th className="px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {alimentos.map((alimento) => (
            <tr key={alimento.id} className="hover:bg-gray-50">
              <td className="px-6 py-3 font-medium text-gray-900">{alimento.nombre}</td>
              <td className="px-6 py-3">
                <Chip 
                  label={alimento.tipo} 
                  size="small" 
                  color={alimento.tipo === "GRANO" ? "warning" : alimento.tipo === "FORRAJE" ? "success" : "info"} 
                  variant="outlined"
                />
              </td>
              <td className="px-6 py-3 text-right">
                <IconButton size="small" onClick={() => onEdit(alimento)} color="primary">
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete(alimento.id)} color="error">
                  <Delete fontSize="small" />
                </IconButton>
              </td>
            </tr>
          ))}
          {alimentos.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                No hay alimentos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Paper>
  );
}