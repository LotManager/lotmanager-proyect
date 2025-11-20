import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Stack, MenuItem, FormControl, InputLabel, Select, CircularProgress
} from "@mui/material";
import { Corral } from "@/src/services/corral";
import { getDietas, Dieta } from "@/src/services/dieta";
import { createSuministro } from "@/src/services/suministro";

type Props = {
  open: boolean;
  onClose: () => void;
  corral: Corral | null;
  onSuccess: () => void;
};

export function SuministroDialog({ open, onClose, corral, onSuccess }: Props) {
  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [dietaId, setDietaId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setLoadingData(true);
      getDietas()
        .then(setDietas)
        .catch(console.error)
        .finally(() => setLoadingData(false));
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!corral || !dietaId || !cantidad) return;
    setSaving(true);
    try {
      await createSuministro({
        corralId: corral.id,
        dietaId: Number(dietaId),
        cantidadKg: Number(cantidad)
      });
      alert("Suministro registrado correctamente 🌽");
      onSuccess();
      handleClose();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setCantidad("");
    setDietaId("");
    onClose();
  };

  if (!corral) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Registrar Comida - Corral #{corral.numero}</DialogTitle>
      <DialogContent>
        {loadingData ? <div className="flex justify-center p-4"><CircularProgress /></div> : (
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Dieta</InputLabel>
              <Select value={dietaId} label="Dieta" onChange={(e) => setDietaId(e.target.value)}>
                {dietas.map((d) => <MenuItem key={d.id} value={d.id}>{d.nombre}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField
              label="Cantidad (kg)" type="number" fullWidth
              value={cantidad} onChange={(e) => setCantidad(e.target.value)}
            />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="success" disabled={saving || !dietaId || !cantidad}>
          {saving ? <CircularProgress size={24} /> : "Confirmar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}