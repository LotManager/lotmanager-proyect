import { 
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography 
} from "@mui/material";
import { SuministroHistorico } from "@/src/services/corral";
import { History } from "@mui/icons-material"; // Ícono de reloj/historial

type Props = {
  suministros: SuministroHistorico[];
};

export function SuministroHistory({ suministros }: Props) {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3 text-slate-700">
        <History fontSize="small" />
        <Typography variant="h6" fontWeight={600}>
          Últimos Suministros
        </Typography>
      </div>
      
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: 'slate.50' }}>
            <TableRow>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Dieta</strong></TableCell>
              <TableCell align="right"><strong>Cantidad</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suministros.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                  No hay registros recientes.
                </TableCell>
              </TableRow>
            ) : (
              suministros.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell>
                    {new Date(s.fecha).toLocaleDateString()} {/* Formato DD/MM/AAAA */}
                  </TableCell>
                  <TableCell>{s.nombreDieta}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'medium' }}>
                    {s.cantidadKg.toLocaleString()} kg
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}