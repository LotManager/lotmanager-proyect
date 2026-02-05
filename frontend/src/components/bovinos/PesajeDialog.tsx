import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  CircularProgress,
  Typography
} from "@mui/material";
import { registrarPesaje, CreatePesajeInput } from "@/src/services/pesaje";

type Props = {
  open: boolean;
  onClose: () => void;
  bovinoId: number | null; // El ID del animal que estamos pesando
  caravana?: number; // Opcional, para mostrarlo en el título
  onSuccess: () => void; // Para recargar la tabla después de guardar
};

export function PesajeDialog({ open, onClose, bovinoId, caravana, onSuccess }: Props) {
  const [peso, setPeso] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]); // Hoy
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!bovinoId || !peso) return;

    setSaving(true);
    try {
      const data: CreatePesajeInput = {
        bovinoId,
        pesoActual: Number(peso),
        fecha: new Date(fecha).toISOString(),
      };

      await registrarPesaje(data);
      alert("Pesaje registrado correctamente ⚖️");
      onSuccess(); // Recargamos la tabla principal para actualizar el 'pesoActual'
      handleClose();
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setPeso(""); // Limpiar formulario
    setFecha(new Date().toISOString().split("T")[0]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Registrar Pesaje
        {caravana && <Typography variant="subtitle2" color="text.secondary" component="span">Bovino #{caravana}</Typography>}
      </DialogTitle>
      
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Nuevo Peso (kg)"
            type="number"
            fullWidth
            autoFocus
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            InputProps={{ endAdornment: <span className="text-gray-500">kg</span> }}
          />
          <TextField
            label="Fecha de Pesaje"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">Cancelar</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={saving || !peso}
        >
          {saving ? <CircularProgress size={24} /> : "Guardar Peso"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}