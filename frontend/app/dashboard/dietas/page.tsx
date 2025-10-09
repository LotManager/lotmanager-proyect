"use client";

import React, { useEffect, useState } from "react";
import DietaCard from "@/src/components/dashboard/dietas/DietaCard";
import { listarDietas, actualizarDieta } from "@/src/services/dietaService";

export default function DietasPage() {
  const [dietas, setDietas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    listarDietas()
      .then((data) => {
        if (mounted) setDietas(data);
      })
      .catch((err) => {
        console.error('listarDietas failed', err);
        if (mounted) setError(String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <div>

      {loading && <div className="mt-4">Cargando dietas...</div>}
      {error && <div className="mt-4 text-red-600">Error: {error}</div>}

      {!loading && !error && (
        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {dietas.length === 0 && <div>No hay dietas</div>}
          {dietas.map((dt) => (
            <DietaCard
              key={String(dt.id)}
              dieta={dt}
              onView={(id) => console.log('ver', id)}
              onEdit={async (id) => {
                try {
                  const nuevoNombre = window.prompt('Nuevo nombre para la dieta:', String(dt.nombre ?? ''));
                  if (!nuevoNombre) return; 
                  const updated = await actualizarDieta(id, { nombre: nuevoNombre });
                  setDietas((prev) => prev.map((p) => (String(p.id) === String(id) ? updated : p)));
                } catch (err) {
                  console.error('Error al actualizar dieta', err);
                  alert('No se pudo actualizar la dieta: ' + String(err));
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}