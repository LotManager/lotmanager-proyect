"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";

// Servicios
import { 
  Corral, getCorrales, createCorral, updateCorral, deleteCorral 
} from "@/src/services/corral";

// Componentes
import { CorralTable } from "@/src/components/corrales/CorralTable";
import { CorralDialog } from "@/src/components/corrales/CorralDialog";
import { SuministroDialog } from "@/src/components/corrales/SuministroDialog";
import { SuministroHistory } from "@/src/components/corrales/SuministroHistory";

export default function CorralesPage() {
  const router = useRouter();
  
  // Estados
  const [corrales, setCorrales] = useState<Corral[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCorral, setSelectedCorral] = useState<Corral | null>(null);

  // Estados para Suministro
  const [openSupplyDialog, setOpenSupplyDialog] = useState(false);
  const [corralForSupply, setCorralForSupply] = useState<Corral | null>(null);

  // Carga de datos
  const loadCorrales = async () => {
    setLoading(true);
    try {
      const data = await getCorrales();
      setCorrales(data);
    } catch (err) {
      console.error(err);
      // Podrías poner un estado de error aquí si querés mostrar un mensaje
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCorrales(); }, []);

  // --- LÓGICA DE SEPARACIÓN ---
  // Filtramos los corrales según su tipo
  const corralesEngorde = corrales.filter(c => c.tipo === "ENGORDE");
  const corralesEnfermeria = corrales.filter(c => c.tipo === "ENFERMA");

  // --- Handlers ---

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este corral? Esta acción no se puede deshacer.")) return;
    try {
      await deleteCorral(id);
      setCorrales(prev => prev.filter(c => c.id !== id));
    } catch (e: any) { alert(e.message); }
  };

  const handleSave = async (data: any) => {
    try {
      // Aseguramos feedlotId
      const dataToSend = { ...data, feedlotId: 1 }; 

      if (selectedCorral) {
        await updateCorral(selectedCorral.id, dataToSend);
        alert("Corral actualizado correctamente");
      } else {
        await createCorral(dataToSend);
        alert("Corral creado correctamente");
      }
      setOpenDialog(false);
      setSelectedCorral(null);
      loadCorrales(); // Recargamos la lista
    } catch (e: any) { 
        console.error(e);
        alert(e.message || "Error al guardar"); 
    }
  };

  const handleView = (id: number) => {
    // ✅ Navegamos a la nueva ruta 'corrales'
    router.push(`/dashboard/corrales/${id}`);
  };

  const handleOpenCreate = () => {
    setSelectedCorral(null); 
    setOpenDialog(true);
  };

  const handleEdit = (c: Corral) => {
    setSelectedCorral(c);
    setOpenDialog(true);
  };

  const handleSupply = (c: Corral) => {
    setCorralForSupply(c);
    setOpenSupplyDialog(true);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Corrales</h1>
        <Button 
          variant="contained" startIcon={<Add />}
          onClick={handleOpenCreate}
        >
          Nuevo Corral
        </Button>
      </div>

      {/* ✅ Usamos Stack para separar las dos tablas */}
      <Stack spacing={6}>
        
        {/* Tabla 1: Engorde */}
        <CorralTable
          title="Corrales de Engorde"
          corrales={corralesEngorde}
          chipColor="primary"
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
          onSupply={handleSupply}
        />

        {/* Tabla 2: Enfermería */}
        <CorralTable
          title="Corrales de Enfermería"
          corrales={corralesEnfermeria}
          chipColor="error"
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />

      </Stack>

      <CorralDialog 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
        corralToEdit={selectedCorral}
      />

      {/* ✅ Modal de Suministro */}
      <SuministroDialog 
        open={openSupplyDialog}
        onClose={() => setOpenSupplyDialog(false)}
        corral={corralForSupply}
        onSuccess={loadCorrales} // Recarga la tabla para actualizar "Dieta Actual"
      />
    </div>
  );
}