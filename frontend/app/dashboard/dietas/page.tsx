"use client";

import React, { useEffect, useState } from "react";
import DietaCard from "@/src/components/dashboard/dietas/DietaCard";
import { listarDietas } from "@/src/services/dietaService";

export default function DietasPage() {
  const [dietas, setDietas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    listarDietas()
      .then((d) => {
        if (mounted) setDietas(d);
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError(String(err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dietas</h1>
      <p className="mt-4">Gestión de dietas para los animales (mapeado desde Alimentación).</p>

      {loading && <div className="mt-4">Cargando dietas...</div>}
      {error && <div className="mt-4 text-red-600">Error: {error}</div>}

      {!loading && !error && (
        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {dietas.length === 0 && <div>No hay dietas / alimentaciones</div>}
          {dietas.map((dt) => (
            <DietaCard key={dt.id} dieta={dt} />
          ))}
        </div>
      )}
    </div>
  );
}