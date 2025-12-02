"use client";

import { useEffect, useState } from "react";
import { Button, CircularProgress, Alert } from "@mui/material";
import { Add, Restaurant } from "@mui/icons-material"; // Agregamos ícono Restaurant

// Servicios
import { Dieta, getDietas, createDieta, updateDieta, deleteDieta, CreateDietaInput } from "@/src/services/dieta";

// Componentes
import { DietaCard } from "@/src/components/dietas/DietaCard";
import { DietaDialog } from "@/src/components/dietas/DietaDialog";
// ✅ IMPORTAMOS EL GESTOR DE ALIMENTOS
import { AlimentosManagerDialog } from "@/src/components/alimentos/AliementoManagerDialog";

export default function DietasPage() {
  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados del Modal de Dieta
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDieta, setSelectedDieta] = useState<Dieta | null>(null);

  // ✅ NUEVO ESTADO: Para abrir el Gestor de Alimentos
  const [openAlimentosManager, setOpenAlimentosManager] = useState(false);

  const loadDietas = async () => {
    setLoading(true);
    try {
      const data = await getDietas();
      setDietas(data);
    } catch (err: any) {
      console.error(err);
      setError("No se pudieron cargar las dietas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDietas(); }, []);

  // --- HANDLERS ---

  const handleOpenCreate = () => {
    setSelectedDieta(null);
    setOpenDialog(true);
  };

  const handleEdit = (dieta: Dieta) => {
    setSelectedDieta(dieta);
    setOpenDialog(true);
  };

  const handleSave = async (data: CreateDietaInput) => {
    try {
      if (selectedDieta) {
        await updateDieta(selectedDieta.id, data);
        alert("Dieta actualizada correctamente");
      } else {
        await createDieta(data);
        alert("Dieta creada correctamente");
      }
      setOpenDialog(false);
      setSelectedDieta(null);
      loadDietas();
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Error al guardar");
    }
  };

  const handleDelete = async (dieta: Dieta) => {
    if (!confirm(`¿Estás seguro de eliminar la dieta "${dieta.nombre}"?`)) return;
    try {
      await deleteDieta(dieta.id);
      setDietas(prev => prev.filter(d => d.id !== dieta.id));
    } catch (e: any) {
      alert("Error al eliminar");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header con Botones */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Dietas</h1>
        
        <div className="flex gap-3">
          {/* ✅ BOTÓN INGREDIENTES: Abre el AlimentosManagerDialog */}
            <Button 
            variant="outlined" 
            color="primary" // Cambiado de 'inherit' a 'primary' para que se vea azul/verde
            startIcon={<Restaurant />}
            onClick={() => setOpenAlimentosManager(true)}
            sx={{ fontWeight: 'bold' }} // Un poco más de peso a la letra
          >
            Alimentos
          </Button>

          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Add />}
            onClick={handleOpenCreate}
          >
            Crear Dieta
          </Button>
        </div>
      </div>

      {loading && <div className="flex justify-center p-8"><CircularProgress /></div>}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dietas.map((dieta) => (
            <div key={dieta.id}>
              <DietaCard 
                dieta={dieta} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </div>
          ))}
          
          {dietas.length === 0 && (
            <div className="col-span-full w-full text-center p-8 text-slate-500">
              No hay dietas registradas. ¡Crea la primera!
            </div>
          )}
        </div>
      )}

      {/* Modal de Crear/Editar Dieta */}
      <DietaDialog 
        open={openDialog}
        onClose={() => { setOpenDialog(false); setSelectedDieta(null); }}
        onSave={handleSave}
        dietaToEdit={selectedDieta}
      />

      {/* ✅ Modal Gestor de Alimentos */}
      <AlimentosManagerDialog 
        open={openAlimentosManager}
        onClose={() => setOpenAlimentosManager(false)}
      />
    </div>
  );
}