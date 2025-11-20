import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Box, CircularProgress, Stack, Typography
} from "@mui/material";
import { Add, Close, Restaurant } from "@mui/icons-material";

// Servicios
import { 
  Alimento, getAlimentos, createAlimento, updateAlimento, deleteAlimento, CreateAlimentoInput 
} from "@/src/services/alimento";

// Componentes (Reutilizamos lo que ya hiciste)
import { AlimentoTable } from "./AlimentoTable";
import { AlimentoDialog } from "./AlimentoDialog";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AlimentosManagerDialog({ open, onClose }: Props) {
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Estados para el sub-modal de formulario (Crear/Editar Alimento)
  const [openForm, setOpenForm] = useState(false);
  const [selectedAlimento, setSelectedAlimento] = useState<Alimento | null>(null);

  // Cargar datos cada vez que se abre este modal
  const loadAlimentos = async () => {
    setLoading(true);
    try {
      const data = await getAlimentos();
      setAlimentos(data);
    } catch (err) {
      console.error(err);
      // Podrías usar tu sistema de notificaciones acá
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) loadAlimentos();
  }, [open]);

  // --- HANDLERS ---

  const handleCreate = () => {
    setSelectedAlimento(null);
    setOpenForm(true);
  };

  const handleEdit = (alimento: Alimento) => {
    setSelectedAlimento(alimento);
    setOpenForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de borrar este ingrediente?")) return;
    try {
      await deleteAlimento(id);
      // Actualizamos la lista localmente
      setAlimentos(prev => prev.filter(a => a.id !== id));
    } catch (e: any) { 
      alert(e.message || "Error al eliminar"); 
    }
  };

  const handleSave = async (data: CreateAlimentoInput) => {
    try {
      if (selectedAlimento) {
        await updateAlimento(selectedAlimento.id, data);
      } else {
        await createAlimento(data);
      }
      setOpenForm(false);
      setSelectedAlimento(null);
      loadAlimentos(); // Recargamos la lista para ver el cambio
    } catch (e: any) { 
      alert(e.message || "Error al guardar"); 
    }
  };

  return (
    <>
      {/* --- MODAL PRINCIPAL (LISTADO) --- */}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        
        {/* Cabecera con Botón de Agregar */}
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Restaurant color="primary" />
            <Typography variant="h6">Gestión de Alimentos</Typography>
          </Stack>
          
          <Button 
            variant="contained" size="small" startIcon={<Add />} 
            onClick={handleCreate}
          >
            Nuevo Aliemento
          </Button>
        </DialogTitle>
        
        <DialogContent dividers>
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>
          ) : (
            <AlimentoTable 
              alimentos={alimentos}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose} color="inherit" startIcon={<Close />}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- SUB-MODAL (FORMULARIO) --- */}
      {/* Se renderiza encima del otro si openForm es true */}
      <AlimentoDialog 
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
        alimentoToEdit={selectedAlimento}
      />
    </>
  );
}