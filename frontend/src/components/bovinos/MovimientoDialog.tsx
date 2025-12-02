import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Stack, MenuItem, FormControl, InputLabel, Select, CircularProgress, Typography, FormHelperText
} from "@mui/material";
import { getCorrales, Corral } from "@/src/services/corral";
import { crearMovimiento, CreateMovimientoInput } from "@/src/services/movimiento";
import { Bovino } from "@/src/services/bovino";

type Props = {
  open: boolean;
  onClose: () => void;
  bovino: Bovino | null; // El animal que vamos a mover
  onSuccess: () => void; // Para recargar la tabla
};

export function MovimientoDialog({ open, onClose, bovino, onSuccess }: Props) {
  const [corrales, setCorrales] = useState<Corral[]>([]);
  const [destinoId, setDestinoId] = useState("");
  const [motivo, setMotivo] = useState("CAMBIO");
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // Cargar corrales al abrir
  useEffect(() => {
    if (open) {
      setLoadingData(true);
      getCorrales()
        .then(setCorrales)
        .catch(console.error)
        .finally(() => setLoadingData(false));
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!bovino || !destinoId) return;

    setSaving(true);
    try {
      const payload: CreateMovimientoInput = {
        bovinoId: bovino.id,
        corralOrigenId: bovino.corralId, // ID actual
        corralDestinoId: Number(destinoId),
        motivo: motivo as "CAMBIO" | "ENFERMEDAD",
      };

      await crearMovimiento(payload);
      alert("Movimiento registrado correctamente 🚚");
      onSuccess(); // Recargar tabla
      onClose();   // Cerrar modal
      setDestinoId(""); // Reset
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (!bovino) return null;

  // Filtramos la lista para no mostrar el corral donde ya está
  const corralesDestino = corrales.filter(c => c.id !== bovino.corralId);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Mover Bovino
        <Typography variant="subtitle2" color="text.secondary" component="span" display="block">
          Caravana #{bovino.caravana} — Actualmente en {bovino.nombreCorral}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        {loadingData ? <CircularProgress /> : (
          <Stack spacing={3} sx={{ mt: 1 }}>
            
            {/* Selección de Destino */}
            <FormControl fullWidth>
              <InputLabel>Corral de Destino</InputLabel>
              <Select
                value={destinoId}
                label="Corral de Destino"
                onChange={(e) => setDestinoId(e.target.value)}
              >
                {corralesDestino.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    Corral #{c.numero} ({c.tipo}) - Cap: {c.capacidadMaxima}
                  </MenuItem>
                ))}
              </Select>
              {corralesDestino.length === 0 && <FormHelperText>No hay otros corrales disponibles</FormHelperText>}
            </FormControl>

            {/* Selección de Motivo */}
            <FormControl fullWidth>
              <InputLabel>Motivo</InputLabel>
              <Select
                value={motivo}
                label="Motivo"
                onChange={(e) => setMotivo(e.target.value)}
              >
                <MenuItem value="CAMBIO">Cambio de Etapa / Rutina</MenuItem>
                <MenuItem value="ENFERMEDAD">Enfermedad / Aislamiento</MenuItem>
              </Select>
            </FormControl>

          </Stack>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="warning" disabled={saving || !destinoId}>
          {saving ? <CircularProgress size={24} /> : "Confirmar Movimiento"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}