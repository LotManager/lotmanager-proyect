import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Stack, MenuItem, FormControl, InputLabel, Select, CircularProgress
} from "@mui/material";
import { CreateAlimentoInput, Alimento } from "@/src/services/alimento";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateAlimentoInput) => Promise<void>;
  alimentoToEdit?: Alimento | null;
};

const initialState: CreateAlimentoInput = {
  nombre: "",
  tipo: "GRANO"
};

export function AlimentoDialog({ open, onClose, onSave, alimentoToEdit }: Props) {
  const [form, setForm] = useState<CreateAlimentoInput>(initialState);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && alimentoToEdit) {
      setForm({ nombre: alimentoToEdit.nombre, tipo: alimentoToEdit.tipo });
    } else {
      setForm(initialState);
    }
  }, [open, alimentoToEdit]);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{alimentoToEdit ? "Editar Alimento" : "Nuevo Alimento"}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Nombre del Alimento"
            fullWidth
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select
              value={form.tipo}
              label="Tipo"
              onChange={(e) => setForm({ ...form, tipo: e.target.value as any })}
            >
              <MenuItem value="GRANO">Grano</MenuItem>
              <MenuItem value="FORRAJE">Forraje</MenuItem>
              <MenuItem value="SUPLEMENTO">Suplemento</MenuItem>
            </Select>
          </FormControl>
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