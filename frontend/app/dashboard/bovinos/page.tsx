"use client";

import { useEffect, useState } from "react";
import { Bovino, getBovinos } from "@/src/services/bovino";
import { AddButton } from "@/src/components/ui/buttons";
import { AnimalFilters } from "../../../src/components/bovinos/BovinoFilters";
import { AnimalTable } from "../../../src/components/bovinos/BovinoTable";

export default function AnimalsManagementPage() {
  const [bovinos, setBovinos] = useState<Bovino[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Este hook se ejecuta una sola vez cuando el componente se monta.
  useEffect(() => {
    // Función para cargar los datos desde la API.
    const fetchBovinos = async () => {
      try {
        const data = await getBovinos();
        setBovinos(data); // Guardamos los datos en el estado.
      } catch (error) {
        console.error("Error en la página al cargar bovinos:", error);
        // Aquí podríamos mostrar un toast de error al usuario.
      } finally {
        setLoading(false); // Ocultamos el indicador de carga, incluso si hubo un error.
      }
    };

    fetchBovinos();
  }, []); // El array vacío asegura que se ejecute solo una vez.

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Gestión de Animales</h1>
        <AddButton label="Registrar Animal" onClick={() => { /* Lógica para abrir modal */ }} />
      </div>

      <AnimalFilters />

      {/* ✅ Le pasamos la lista de bovinos y el estado de carga a la tabla. */}
      <AnimalTable bovinos={bovinos} loading={loading} />
    </div>
  );
}