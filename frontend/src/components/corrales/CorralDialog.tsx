import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Stack, MenuItem, FormControl, InputLabel, Select, CircularProgress
} from "@mui/material";
import { Corral } from "@/src/services/corral";

// Definimos el tipo de dato para crear/editar (sin ID)
type CorralInput = Omit<Corral, "id" | "nombreDieta">; 

type Props = {
  open: boolean;
  onClose: () => void;
  // ✅ Corregido: onSave recibe los datos y devuelve una promesa
  onSave: (data: CorralInput) => Promise<void>; 
  corralToEdit?: Corral | null;
};

const initialState: CorralInput = {
  numero: 0,
  capacidadMaxima: 0,
  tipo: "ENGORDE",
  feedlotId: 1, // Por defecto 1, o podrías poner un input
};

export function CorralDialog({ open, onClose, onSave, corralToEdit }: Props) {
  const [form, setForm] = useState<CorralInput>(initialState);
  const [saving, setSaving] = useState(false);

  // Cargar datos al abrir si es edición
  useEffect(() => {
    if (open && corralToEdit) {
      setForm({
        numero: corralToEdit.numero,
        capacidadMaxima: corralToEdit.capacidadMaxima,
        tipo: corralToEdit.tipo,
        feedlotId: corralToEdit.feedlotId
      });
    } else if (open && !corralToEdit) {
      setForm(initialState);
    }
  }, [open, corralToEdit]);

  const handleChange = (field: keyof CorralInput, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const dataToSend = {
        ...form,
        numero: Number(form.numero),
        capacidadMaxima: Number(form.capacidadMaxima),
        feedlotId: Number(form.feedlotId)
      };
      await onSave(dataToSend);
      onClose();
    } catch (error) {
      console.error(error);
      // El manejo de la alerta lo hace el padre (page.tsx)
    } finally {
      setSaving(false);
    }
  };

  const title = corralToEdit ? `Editar Corral #${corralToEdit.numero}` : "Nuevo Corral";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          
          <TextField
            label="Número de Corral" 
            type="number" 
            fullWidth
            autoFocus
            value={form.numero || ''} 
            onChange={(e) => handleChange("numero", e.target.value)}
          />
          
          <TextField
            label="Capacidad Máxima" 
            type="number" 
            fullWidth
            value={form.capacidadMaxima || ''} 
            onChange={(e) => handleChange("capacidadMaxima", e.target.value)}
            helperText="Cantidad máxima de animales permitidos"
          />
          
          <FormControl fullWidth>
            <InputLabel>Tipo de Corral</InputLabel>
            <Select
              value={form.tipo}
              label="Tipo de Corral"
              onChange={(e) => handleChange("tipo", e.target.value)}
            >
              <MenuItem value="ENGORDE">Engorde</MenuItem>
              <MenuItem value="ENFERMA">Enfermería</MenuItem>
            </Select>
          </FormControl>

          {/* Campo oculto o visible según necesidad para feedlotId */}
           {/* <TextField label="ID Feedlot" ... /> */}

        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={saving}>
          {saving ? <CircularProgress size={24} /> : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}