import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  FormHelperText
} from "@mui/material";
// Importamos el tipo Bovino para usarlo en la prop
import { CreateBovinoInput, Bovino } from "@/src/services/bovino";
import { getRazas, Raza } from "@/src/services/raza";
import { getCorrales, Corral } from "@/src/services/corral";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: CreateBovinoInput) => Promise<void>;
  // ✅ Nueva prop opcional: El bovino que queremos editar
  bovinoToEdit?: Bovino | null;
};

const initialState: CreateBovinoInput = {
  caravana: 0,
  razaId: 0,
  corralId: 0,
  pesoIngreso: 0,
  ingreso: new Date().toISOString().split('T')[0],
  sexo: "MACHO",
  tipoBovino: "TERNERO",
  estadoSalud: "SANO",
  situacionBovino: "ENCORRAL"
};

export function BovinoDialog({ open, onClose, onSave, bovinoToEdit }: Props) {
  const [form, setForm] = useState<CreateBovinoInput>(initialState);
  const [saving, setSaving] = useState(false);
  const [razas, setRazas] = useState<Raza[]>([]);
  const [corrales, setCorrales] = useState<Corral[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Carga de datos auxiliares (Razas/Corrales)
  useEffect(() => {
    if (open) {
      setLoadingData(true);
      Promise.all([getRazas(), getCorrales()])
        .then(([razasData, corralesData]) => {
          setRazas(razasData);
          setCorrales(corralesData);
        })
        .catch(console.error)
        .finally(() => setLoadingData(false));
    }
  }, [open]);

  // ✅ EFECTO PARA LLENAR EL FORMULARIO SI ES EDICIÓN
  useEffect(() => {
    if (open && bovinoToEdit) {
      // Si estamos editando, llenamos el form con los datos del bovino
      // NOTA: Como tu 'Bovino' de lectura ya tiene nombres de corrales/razas pero no IDs,
      // idealmente tu endpoint GET debería devolver también los IDs (razaId, corralId).
      // Por ahora asumimos que los tenés o que el usuario los tiene que volver a elegir si quiere cambiarlos.
      // Si tu tipo Bovino de lectura NO tiene razaId/corralId, tendrás que agregarlos al backend 'listarParaFrontend'.
      
      setForm({
        caravana: bovinoToEdit.caravana,
        // ⚠️ OJO: Asegurate que tu GET /api/bovinos devuelva estos IDs, 
        // si no, estos campos quedarán vacíos al editar.
        razaId: (bovinoToEdit as any).razaId || 0, 
        corralId: (bovinoToEdit as any).corralId || 0,
        
        pesoIngreso: 0, // Este dato quizás no lo tengas en la vista simple, podés dejarlo en 0 o traerlo
        ingreso: new Date().toISOString().split('T')[0], // Lo mismo con la fecha
        sexo: "MACHO", // Valor por defecto o traerlo del back
        tipoBovino: "TERNERO", // Valor por defecto o traerlo del back
        estadoSalud: bovinoToEdit.estadoSalud,
        situacionBovino: "ENCORRAL"
      });
    } else if (open && !bovinoToEdit) {
      // Si es creación, reseteamos
      setForm(initialState);
    }
  }, [open, bovinoToEdit]);

  const handleChange = (field: keyof CreateBovinoInput, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const dataToSend: CreateBovinoInput = {
        ...form,
        caravana: Number(form.caravana),
        razaId: Number(form.razaId),
        corralId: Number(form.corralId),
        pesoIngreso: Number(form.pesoIngreso),
        ingreso: new Date(form.ingreso).toISOString() 
      };

      await onSave(dataToSend);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Título dinámico
  const title = bovinoToEdit ? `Editar Bovino #${bovinoToEdit.caravana}` : "Registrar Nuevo Animal";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* ... (El resto de tu JSX del formulario queda IGUAL) ... */}
        {/* Solo asegurate de copiar el contenido del return anterior aquí */}
        {loadingData ? (
           <div className="flex justify-center p-4"><CircularProgress /></div>
        ) : (
          <Stack spacing={2} sx={{ mt: 1 }}>
             {/* ... TUS INPUTS ... */}
             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Caravana" type="number" fullWidth
                value={form.caravana || ''} onChange={(e) => handleChange("caravana", e.target.value)}
              />
              {/* Ocultamos peso ingreso al editar si no es relevante, o lo dejamos */}
              <TextField
                label="Peso de Ingreso (kg)" type="number" fullWidth
                value={form.pesoIngreso || ''} onChange={(e) => handleChange("pesoIngreso", e.target.value)}
              />
            </Stack>
             {/* ... Resto de inputs (Raza, Corral, Sexo, etc.) ... */}
             {/* Copialos de tu versión anterior, funcionan igual */}
             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <FormControl fullWidth>
                  <InputLabel id="raza-label">Raza</InputLabel>
                  <Select labelId="raza-label" label="Raza" value={form.razaId || ''} onChange={(e) => handleChange("razaId", e.target.value)}>
                    {razas.map((r) => <MenuItem key={r.id} value={r.id}>{r.nombre}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="corral-label">Corral</InputLabel>
                  <Select labelId="corral-label" label="Corral" value={form.corralId || ''} onChange={(e) => handleChange("corralId", e.target.value)}>
                    {corrales.map((c) => <MenuItem key={c.id} value={c.id}>Corral #{c.numero} ({c.tipo})</MenuItem>)}
                  </Select>
                </FormControl>
             </Stack>
             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Sexo</InputLabel>
                <Select value={form.sexo} label="Sexo" onChange={(e) => handleChange("sexo", e.target.value)}>
                  <MenuItem value="MACHO">Macho</MenuItem>
                  <MenuItem value="HEMBRA">Hembra</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select value={form.tipoBovino} label="Categoría" onChange={(e) => handleChange("tipoBovino", e.target.value)}>
                  <MenuItem value="TERNERO">Ternero</MenuItem>
                  <MenuItem value="NOVILLO">Novillo</MenuItem>
                  <MenuItem value="VAQUILLONA">Vaquillona</MenuItem>
                  <MenuItem value="DESCARTE">Descarte</MenuItem>
                </Select>
              </FormControl>
            </Stack>
             <TextField label="Fecha de Ingreso" type="date" fullWidth InputLabelProps={{ shrink: true }} value={form.ingreso} onChange={(e) => handleChange("ingreso", e.target.value)} />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={saving || loadingData}>
          {saving ? <CircularProgress size={24} /> : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}