import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Tabs, Tab, Box, List, ListItem, ListItemText, IconButton, TextField, 
  Select, MenuItem, FormControl, InputLabel, Stack
} from "@mui/material";
import { Delete, Add, LocalHospital, Healing } from "@mui/icons-material";
import { 
  getSanidadAuxiliares, Enfermedad, Tratamiento, 
  createEnfermedad, deleteEnfermedad, 
  createTratamiento, deleteTratamiento 
} from "@/src/services/sanidad";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SanidadManagerDialog({ open, onClose }: Props) {
  const [tab, setTab] = useState(0);
  const [enfermedades, setEnfermedades] = useState<Enfermedad[]>([]);
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);

  // Estados para formularios simples
  const [newEnfermedad, setNewEnfermedad] = useState({ nombre: "", tipo: "OTRA" });
  const [newTratamiento, setNewTratamiento] = useState({ nombre: "", unidad: "UNIDAD" });

  const loadData = () => {
    getSanidadAuxiliares().then(data => {
      setEnfermedades(data.enfermedades);
      setTratamientos(data.tratamientos);
    });
  };

  useEffect(() => { if (open) loadData(); }, [open]);

  // --- HANDLERS ENFERMEDAD ---
  const handleAddEnfermedad = async () => {
    try {
      await createEnfermedad(newEnfermedad);
      setNewEnfermedad({ nombre: "", tipo: "OTRA" }); // Reset
      loadData();
    } catch (e: any) { alert(e.message); }
  };

  const handleDeleteEnfermedad = async (id: number) => {
    if (!confirm("¿Borrar enfermedad?")) return;
    try { await deleteEnfermedad(id); loadData(); } catch (e: any) { alert(e.message); }
  };

  // --- HANDLERS TRATAMIENTO ---
  const handleAddTratamiento = async () => {
    try {
      await createTratamiento(newTratamiento);
      setNewTratamiento({ nombre: "", unidad: "UNIDAD" }); // Reset
      loadData();
    } catch (e: any) { alert(e.message); }
  };

  const handleDeleteTratamiento = async (id: number) => {
    if (!confirm("¿Borrar tratamiento?")) return;
    try { await deleteTratamiento(id); loadData(); } catch (e: any) { alert(e.message); }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Configuración Sanitaria</DialogTitle>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab icon={<LocalHospital />} label="Enfermedades" />
          <Tab icon={<Healing />} label="Tratamientos" />
        </Tabs>
      </Box>

      <DialogContent>
        {/* --- TAB 0: ENFERMEDADES --- */}
        {tab === 0 && (
          <Stack spacing={3}>
            {/* Formulario simple inline */}
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField 
                label="Nueva Enfermedad" size="small" fullWidth 
                value={newEnfermedad.nombre}
                onChange={e => setNewEnfermedad({...newEnfermedad, nombre: e.target.value})}
              />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Tipo</InputLabel>
                <Select 
                  value={newEnfermedad.tipo} label="Tipo"
                  onChange={e => setNewEnfermedad({...newEnfermedad, tipo: e.target.value})}
                >
                  <MenuItem value="RESPIRATORIA">Respiratoria</MenuItem>
                  <MenuItem value="SISTEMA_NERVIOSO">Sistema Nervioso</MenuItem>
                  <MenuItem value="OJOS">Ocular</MenuItem>
                  <MenuItem value="PARASITARIA">Parasitaria</MenuItem>
                  <MenuItem value="DIGESTIVA">Digestiva</MenuItem>
                  <MenuItem value="INTOXICACION">Intoxicación</MenuItem>
                  <MenuItem value="TRAUMATOLOGICA">Traumatologica</MenuItem>
                  <MenuItem value="OTRA">Otra</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" onClick={handleAddEnfermedad} disabled={!newEnfermedad.nombre}>
                <Add />
              </Button>
            </Stack>

            {/* Lista */}
            <List dense sx={{ bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto' }}>
              {enfermedades.map(e => (
                <ListItem key={e.id} secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteEnfermedad(e.id)} color="error">
                    <Delete />
                  </IconButton>
                }>
                  <ListItemText primary={e.nombre} secondary={e.tipo} />
                </ListItem>
              ))}
            </List>
          </Stack>
        )}

        {/* --- TAB 1: TRATAMIENTOS --- */}
        {tab === 1 && (
          <Stack spacing={3}>
            {/* Formulario simple inline */}
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField 
                label="Nuevo Tratamiento" size="small" fullWidth 
                value={newTratamiento.nombre}
                onChange={e => setNewTratamiento({...newTratamiento, nombre: e.target.value})}
              />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Unidad</InputLabel>
                <Select 
                  value={newTratamiento.unidad} label="Unidad"
                  onChange={e => setNewTratamiento({...newTratamiento, unidad: e.target.value})}
                >
                  <MenuItem value="ML">Mililitros</MenuItem>
                  <MenuItem value="MG">Miligramos</MenuItem>
                  <MenuItem value="G">Gramos</MenuItem>
                  <MenuItem value="TABLETA">Tableta</MenuItem>
                  <MenuItem value="UNIDAD">Unidad</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" onClick={handleAddTratamiento} disabled={!newTratamiento.nombre}>
                <Add />
              </Button>
            </Stack>

            {/* Lista */}
            <List dense sx={{ bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto' }}>
              {tratamientos.map(t => (
                <ListItem key={t.id} secondaryAction={
                  <IconButton edge="end" onClick={() => handleDeleteTratamiento(t.id)} color="error">
                    <Delete />
                  </IconButton>
                }>
                  <ListItemText primary={t.nombre} secondary={`Unidad: ${t.unidad || '-'}`} />
                </ListItem>
              ))}
            </List>
          </Stack>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}