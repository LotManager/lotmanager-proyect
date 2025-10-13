// src/components/animales/AnimalTable.tsx

import { Paper, Chip, CircularProgress } from "@mui/material";
import { Bovino } from "@/src/services/bovino";
import { EditButton, ViewButton, DeleteButton } from "@/src/components/ui/buttons";

type Props = {
  bovinos: Bovino[];
  loading: boolean;
};

export function AnimalTable({ bovinos, loading }: Props) {
  // ... (tu función getStatusChip) ...

  return (
    <Paper elevation={2} className="p-4">
      {/* ... (tu header de la tabla) ... */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {/* ... (tus encabezados th) ... */}
          </thead>
          <tbody>
            {/* ✅ ESTA ES LA LÓGICA CLAVE */}
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center p-8">
                  <CircularProgress />
                  <p className="mt-2 text-slate-500">Cargando animales...</p>
                </td>
              </tr>
            ) : bovinos.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-8 text-slate-500">
                  No se encontraron animales. Registra uno para comenzar.
                </td>
              </tr>
            ) : (
              bovinos.map((bovino) => (
                <tr key={bovino.id} className="border-b hover:bg-slate-50">
                  <td className="p-3 font-mono">#{bovino.caravana}</td>
                  <td className="p-3 font-semibold">{bovino.pesoActual} kg</td>
                  <td className="p-3">{bovino.edad} meses</td>
                  <td className="p-3">{bovino.nombreCorral}</td>
                  <td className="p-3 font-medium text-green-600">{bovino.gmd} kg/día</td>
                  {/* ... (el resto de tus celdas td) ... */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Paper>
  );
}