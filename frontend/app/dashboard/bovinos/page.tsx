"use client";

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

// Servicios y Tipos
import { 
  Bovino, 
  getBovinos, 
  deleteBovino, 
  createBovino, 
  updateBovino, 
  CreateBovinoInput 
} from "@/src/services/bovino";

// Componentes
import { AnimalTable } from "@/src/components/bovinos/BovinoTable";
import { AnimalFilters, FilterState } from "@/src/components/bovinos/BovinoFilters";
import { BovinoDialog } from "@/src/components/bovinos/BovinoDialog";
import { PesajeDialog } from "@/src/components/bovinos/PesajeDialog";
import { MovimientoDialog } from "@/src/components/bovinos/MovimientoDialog"; 

export default function AnimalsManagementPage() {
  // --- ESTADOS DE DATOS ---
  const [bovinos, setBovinos] = useState<Bovino[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMoveDialog, setOpenMoveDialog] = useState(false);
  const [bovinoToMove, setBovinoToMove] = useState<Bovino | null>(null);

  // --- ESTADO DE FILTROS ---
  const [filters, setFilters] = useState<FilterState>({
    caravana: "",
    minPeso: "",
    maxPeso: "",
    corralId: ""
  });

  // --- ESTADOS DE MODALES ---
  const [openBovinoDialog, setOpenBovinoDialog] = useState(false);
  const [selectedBovino, setSelectedBovino] = useState<Bovino | null>(null);

  const [openPesajeDialog, setOpenPesajeDialog] = useState(false);
  const [selectedBovinoForPesaje, setSelectedBovinoForPesaje] = useState<{id: number, caravana: number} | null>(null);

  // --- CARGA INICIAL ---
  const loadBovinos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBovinos();
      setBovinos(data);
    } catch (err: any) {
      console.error("Error al cargar bovinos:", err);
      setError(err.message || "No se pudieron cargar los animales.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBovinos();
  }, []);

  // --- LÓGICA DE FILTRADO (Cliente) ---
  const filteredBovinos = bovinos.filter((b) => {
    // 1. Filtro por Caravana
    if (filters.caravana && !b.caravana.toString().includes(filters.caravana)) {
      return false;
    }
    // 2. Filtro por Peso Mínimo
    if (filters.minPeso && b.pesoActual < Number(filters.minPeso)) {
      return false;
    }
    // 3. Filtro por Peso Máximo
    if (filters.maxPeso && b.pesoActual > Number(filters.maxPeso)) {
      return false;
    }
    // 4. Filtro por Corral
    // Nota: Usamos 'as any' temporalmente porque el tipo Bovino del front quizás no tenga 'corralId' explícito aún,
    // pero si el backend lo manda (aunque sea dentro de la estructura), esto puede funcionar si ajustamos el tipo.
    // Si filtramos por ID, necesitamos que el objeto 'b' tenga corralId.
    if (filters.corralId) {
          // Ahora TypeScript sabe que 'b.corralId' existe
          if (b.corralId !== Number(filters.corralId)) {
            return false;
          }
        }
    return true;
  });

  // --- HANDLERS ---

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este animal? Esta acción no se puede deshacer.")) {
      return;
    }
    try {
      await deleteBovino(id);
      setBovinos((prev) => prev.filter((b) => b.id !== id));
      alert("Bovino eliminado correctamente.");
    } catch (err: any) {
      console.error("Error al eliminar:", err);
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  const handleOpenCreate = () => {
    setSelectedBovino(null);
    setOpenBovinoDialog(true);
  };

  const handleEdit = (bovino: Bovino) => {
    setSelectedBovino(bovino);
    setOpenBovinoDialog(true);
  };

  const handleSaveBovino = async (data: CreateBovinoInput) => {
    try {
      if (selectedBovino) {
        await updateBovino(selectedBovino.id, data);
        alert("Bovino actualizado correctamente.");
      } else {
        await createBovino(data);
        alert("Bovino registrado con éxito.");
      }
      setOpenBovinoDialog(false);
      setSelectedBovino(null);
      await loadBovinos();
    } catch (error: any) {
      console.error("Error al guardar:", error);
      alert(`Error: ${error.message}`);
      throw error;
    }
  };

  const handleRegistrarPesaje = (id: number) => {
    const animal = bovinos.find(b => b.id === id);
    if (animal) {
      setSelectedBovinoForPesaje({ id: animal.id, caravana: animal.caravana });
      setOpenPesajeDialog(true);
    }
  };

  const handleMove = (bovino: Bovino) => {
    setBovinoToMove(bovino);
    setOpenMoveDialog(true);
  };

  // --- RENDERIZADO ---
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Animales</h1>
        
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Add />}
          onClick={handleOpenCreate}
        >
          Registrar Nuevo Animal
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* ✅ Filtros conectados */}
      <AnimalFilters filters={filters} onChange={setFilters} />

      {/* ✅ Tabla recibiendo datos filtrados */}
      <AnimalTable
        bovinos={filteredBovinos}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleRegistrarPesaje}
        onMove={handleMove}
      />

      {/* Modales */}
      <BovinoDialog 
        open={openBovinoDialog}
        onClose={() => { setOpenBovinoDialog(false); setSelectedBovino(null); }}
        onSave={handleSaveBovino}
        bovinoToEdit={selectedBovino}
      />

      <PesajeDialog 
        open={openPesajeDialog}
        onClose={() => setOpenPesajeDialog(false)}
        bovinoId={selectedBovinoForPesaje?.id || null}
        caravana={selectedBovinoForPesaje?.caravana}
        onSuccess={loadBovinos}
      />

      <MovimientoDialog 
        open={openMoveDialog}
        onClose={() => setOpenMoveDialog(false)}
        bovino={bovinoToMove}
        onSuccess={loadBovinos} // Al terminar, recarga la tabla para ver el nuevo corral
      />
    </div>
  );
}