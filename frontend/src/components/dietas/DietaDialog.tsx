import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Stack, MenuItem, FormControl, InputLabel, Select, 
  CircularProgress, IconButton, Typography, Divider
} from "@mui/material";
import { Delete, AddCircleOutline } from "@mui/icons-material";

// ✅ 1. CORREGIDO: Importamos los tipos y funciones desde el servicio del frontend
import { getAlimentos, Alimento } from "@/src/services/alimento";
import { Dieta, CreateDietaInput } from "@/src/services/dieta"; 

// Definimos un tipo local para el formulario que sea más flexible (acepta strings temporales)
type FormState = {
  nombre: string;
  descripcion: string;
  detalles: {
    alimentoId: number | string; // Permite string vacío para el select inicial
    proporcionKg: number | string; // Permite string vacío mientras se escribe
  }[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  // ✅ El onSave espera el tipo estricto del servicio
  onSave: (data: CreateDietaInput) => Promise<void>; 
  dietaToEdit?: Dieta | null;
};

const initialState: FormState = {
  nombre: "",
  descripcion: "",
  detalles: [{ alimentoId: "", proporcionKg: "" }] // Fila vacía inicial
};

export function DietaDialog({ open, onClose, onSave, dietaToEdit }: Props) {
  // ✅ 2. ACÁ VA EL ESTADO (Usamos el tipo local FormState)
  const [form, setForm] = useState<FormState>(initialState);
  
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);

  // Cargar Alimentos
  useEffect(() => {
    if (open) {
      setLoadingData(true);
      getAlimentos()
        .then(setAlimentos)
        .catch(console.error)
        .finally(() => setLoadingData(false));
    }
  }, [open]);

  // Cargar datos si es Edición
useEffect(() => {
    if (open && dietaToEdit) {
      // 1. Obtenemos el array de detalles, o un array vacío si es null/undefined
      const detallesRecibidos = dietaToEdit.detallesDieta || [];
      
      // 2. Si hay detalles, los mapeamos. Si no, usamos el initialState (con una fila vacía).
      const detallesParaForm = detallesRecibidos.length > 0 
        ? detallesRecibidos.map(d => ({
            alimentoId: d.alimentoId,
            proporcionKg: d.proporcionKg
          }))
        : initialState.detalles; // Fallback: al menos una fila vacía para empezar

      setForm({
        nombre: dietaToEdit.nombre,
        descripcion: dietaToEdit.descripcion || "",
        detalles: detallesParaForm,
      });
    } else if (open && !dietaToEdit) {
      // Si es creación, reseteamos a los valores iniciales
      setForm(initialState);
    }
  }, [open, dietaToEdit]); // Dependencias

  // --- HANDLERS ---

  const handleAddRow = () => {
    setForm(prev => ({
      ...prev,
      detalles: [...prev.detalles, { alimentoId: "", proporcionKg: "" }]
    }));
  };

  const handleRemoveRow = (index: number) => {
    setForm(prev => ({
      ...prev,
      detalles: prev.detalles.filter((_, i) => i !== index)
    }));
  };

  const handleChangeRow = (index: number, field: "alimentoId" | "proporcionKg", value: any) => {
    const newDetalles = [...form.detalles];
    newDetalles[index] = { ...newDetalles[index], [field]: value };
    setForm(prev => ({ ...prev, detalles: newDetalles }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      // ✅ CONVERSIÓN: Pasamos del FormState flexible al CreateDietaInput estricto
      const payload: CreateDietaInput = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        // Filtramos filas incompletas y convertimos a números
        detalles: form.detalles
          .filter(d => d.alimentoId && d.proporcionKg)
          .map(d => ({
            alimentoId: Number(d.alimentoId),
            proporcionKg: Number(d.proporcionKg)
          }))
      };

      if (payload.detalles.length === 0) {
        alert("La dieta debe tener al menos un ingrediente.");
        setSaving(false);
        return;
      }

      await onSave(payload);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Calculamos el total visualmente para ayudar al usuario
  const totalMezcla = form.detalles.reduce((acc, curr) => acc + Number(curr.proporcionKg || 0), 0);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{dietaToEdit ? "Editar Dieta" : "Nueva Dieta"}</DialogTitle>
      <DialogContent>
        {loadingData ? <div className="flex justify-center p-4"><CircularProgress /></div> : (
          <Stack spacing={3} sx={{ mt: 1 }}>
            
            <TextField
              label="Nombre de la Dieta"
              fullWidth
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <TextField
              label="Descripción (Opcional)"
              fullWidth
              multiline
              rows={2}
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />

            <Divider>Ingredientes</Divider>

            {form.detalles.map((detalle, index) => (
              <Stack key={index} direction="row" spacing={2} alignItems="center">
                <FormControl fullWidth>
                  <InputLabel>Ingrediente</InputLabel>
                  <Select
                    value={detalle.alimentoId}
                    label="Ingrediente"
                    onChange={(e) => handleChangeRow(index, "alimentoId", e.target.value)}
                  >
                    {alimentos.map((al) => (
                      <MenuItem key={al.id} value={al.id}>
                        {al.nombre} ({al.tipo})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Kg"
                  type="number"
                  sx={{ width: 150 }}
                  value={detalle.proporcionKg}
                  onChange={(e) => handleChangeRow(index, "proporcionKg", e.target.value)}
                />

                <IconButton color="error" onClick={() => handleRemoveRow(index)} disabled={form.detalles.length === 1}>
                  <Delete />
                </IconButton>
              </Stack>
            ))}

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Button startIcon={<AddCircleOutline />} onClick={handleAddRow}>
                Agregar Ingrediente
              </Button>
              <Typography variant="subtitle1" fontWeight="bold">
                Total Mezcla: {totalMezcla} kg
              </Typography>
            </Stack>

          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={saving}>
          {saving ? <CircularProgress size={24} /> : "Guardar Receta"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}