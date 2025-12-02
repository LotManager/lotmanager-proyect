import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, FormControl, InputLabel, Select, MenuItem, Autocomplete } from "@mui/material";
import { getSanidadAuxiliares, Enfermedad, Tratamiento, registrarCaso } from "@/src/services/sanidad";
import { getBovinos, Bovino } from "@/src/services/bovino"; // Para buscar al paciente

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  preSelectedBovinoId?: number | null; // Opcional si venimos de la tabla de bovinos
};

export function TratamientoDialog({ open, onClose, onSuccess, preSelectedBovinoId }: Props) {
  const [enfermedades, setEnfermedades] = useState<Enfermedad[]>([]);
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
  const [bovinos, setBovinos] = useState<Bovino[]>([]);
  
  const [form, setForm] = useState({
    bovinoId: preSelectedBovinoId || "",
    enfermedadId: "",
    tratamientoId: "",
    fecha: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    if (open) {
      // Cargamos listas
      getSanidadAuxiliares().then(data => {
        setEnfermedades(data.enfermedades);
        setTratamientos(data.tratamientos);
      });
      // Cargamos bovinos para el buscador (si no vino preseleccionado)
      if (!preSelectedBovinoId) {
          getBovinos().then(setBovinos);
      }
    }
  }, [open, preSelectedBovinoId]);

  // Si cambia la prop, actualizamos el form
  useEffect(() => {
      if(preSelectedBovinoId) setForm(f => ({...f, bovinoId: preSelectedBovinoId}));
  }, [preSelectedBovinoId]);

  const handleSubmit = async () => {
    try {
      await registrarCaso({
        bovinoId: Number(form.bovinoId),
        enfermedadId: Number(form.enfermedadId),
        tratamientoId: Number(form.tratamientoId),
        fechaDeteccion: new Date(form.fecha).toISOString()
      });
      alert("Tratamiento registrado. Animal marcado como ENFERMO.");
      onSuccess();
      onClose();
    } catch (e: any) { alert(e.message); }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Registrar Caso Sanitario</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          
          {/* Buscador de Bovino (Solo si no vino preseleccionado) */}
          {!preSelectedBovinoId ? (
             <Autocomplete
                options={bovinos}
                getOptionLabel={(option) => `Caravana #${option.caravana}`}
                onChange={(_, val) => setForm({ ...form, bovinoId: val?.id || "" })}
                renderInput={(params) => <TextField {...params} label="Buscar Bovino" />}
             />
          ) : (
             <TextField disabled label="ID Bovino" value={preSelectedBovinoId} />
          )}

          <FormControl fullWidth>
            <InputLabel>Enfermedad Detectada</InputLabel>
            <Select 
                value={form.enfermedadId} 
                label="Enfermedad Detectada"
                onChange={(e) => setForm({...form, enfermedadId: e.target.value})}
            >
              {enfermedades.map(e => <MenuItem key={e.id} value={e.id}>{e.nombre} ({e.tipo})</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Tratamiento Aplicado</InputLabel>
            <Select 
                value={form.tratamientoId} 
                label="Tratamiento Aplicado"
                onChange={(e) => setForm({...form, tratamientoId: e.target.value})}
            >
              {tratamientos.map(t => <MenuItem key={t.id} value={t.id}>{t.nombre}</MenuItem>)}
            </Select>
          </FormControl>
          
          <TextField type="date" label="Fecha" value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} />

        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="error" onClick={handleSubmit}>Registrar Caso</Button>
      </DialogActions>
    </Dialog>
  );
}