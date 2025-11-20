"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card, CardContent, CardHeader, Chip, Divider, Typography,
  Button, LinearProgress, Alert, Stack, Box
} from "@mui/material";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

// ✅ Importamos solo lo que necesitamos
import { getCorralDetalle, CorralDetalle } from "@/src/services/corral";
import { SuministroHistory } from "@/src/components/corrales/SuministroHistory";

export default function CorralDetailPage() {
  const router = useRouter();
  const params = useParams();
  const idCorral = Number(params?.id);

  const [loading, setLoading] = useState(true);
  const [corral, setCorral] = useState<CorralDetalle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idCorral) return;

    setLoading(true);
    setError(null);

    // ✅ UNA SOLA LLAMADA AL BACKEND
    getCorralDetalle(idCorral)
      .then((data) => {
        setCorral(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

  }, [idCorral]);

  if (loading) return <div className="p-6"><LinearProgress /></div>;
  if (error) return <div className="p-6"><Alert severity="error">{error}</Alert></div>;
  if (!corral) return <div className="p-6"><Alert severity="info">Corral no encontrado</Alert></div>;

  // Cálculos visuales simples
  const ocupacion = Math.round((corral.bovinosCount / corral.capacidadMaxima) * 100);
  
  // Color de ocupación
  let colorOcupacion: "default" | "primary" | "warning" | "error" = "default";
  if (ocupacion > 100) colorOcupacion = "error";
  else if (ocupacion > 85) colorOcupacion = "warning";
  else if (ocupacion > 0) colorOcupacion = "primary";

  return (
    <Box className="space-y-6 p-6">
      {/* --- HEADER --- */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Button 
            variant="text" 
            startIcon={<FaArrowLeft />} 
            onClick={() => router.push("/dashboard/corrales")}
          >
            Volver
          </Button>
          <Typography variant="h4" fontWeight={700} className="text-slate-800">
            Corral #{corral.numero}
          </Typography>
          <Chip
            label={corral.tipo === "ENGORDE" ? "Engorde" : "Enfermería"}
            color={corral.tipo === "ENGORDE" ? "primary" : "error"}
            size="small"
            className="font-bold"
          />
        </Stack>
        
        {/* Podrías agregar un botón para editar el corral acá */}
      </Stack>

      {/* --- RESUMEN GENERAL --- */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        
        {/* Tarjeta Ocupación */}
        <Card sx={{ flex: 1 }} elevation={2}>
          <CardHeader title="Ocupación" subheader={`Capacidad: ${corral.capacidadMaxima}`} />
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight={700}>{corral.bovinosCount} bovinos</Typography>
              <Chip label={`${ocupacion}%`} color={colorOcupacion} />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Peso total en corral: <strong>{corral.pesoTotal.toLocaleString()} kg</strong>
            </Typography>
          </CardContent>
        </Card>

        {/* Tarjeta Dieta */}
        <Card sx={{ flex: 1 }} elevation={2}>
          <CardHeader title="Alimentación Actual" />
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                label={corral.nombreAlimentacion}
                color={corral.nombreAlimentacion !== "Sin Dieta Asignada" ? "success" : "default"}
                variant={corral.nombreAlimentacion !== "Sin Dieta Asignada" ? "filled" : "outlined"}
              />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Consumo promedio (últimos 30 días): <strong>{corral.consumoDiario.toLocaleString()} kg/día</strong>
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* --- MÉTRICAS DE RENDIMIENTO --- */}
      <Typography variant="h6" fontWeight={600} className="text-slate-700 mt-4">
        Métricas de Rendimiento (Promedio General)
      </Typography>
      
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        
        {/* Tarjeta GMD */}
        <Card sx={{ flex: 1 }} elevation={2}>
          <CardHeader 
            title="Ganancia Media Diaria (GMD)" 
            subheader="Promedio de todos los animales" 
          />
          <CardContent>
            <Typography variant="h3" fontWeight={800} color="primary.main">
              {corral.gmdKgDia.toFixed(3)} <span className="text-lg text-slate-500 font-normal">kg/día</span>
            </Typography>
          </CardContent>
        </Card>

        {/* Tarjeta Eficiencia */}
        <Card sx={{ flex: 1 }} elevation={2}>
          <CardHeader 
            title="Eficiencia de Conversión" 
            subheader="Últimos 30 días (Kg ganados / Kg alimento)" 
          />
          <CardContent>
            <Typography variant="h3" fontWeight={800} color="secondary.main">
              {corral.relacionPesoConsumo.toFixed(3)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Por cada 1 kg de alimento, se ganan {corral.relacionPesoConsumo} kg de peso.
            </Typography>
          </CardContent>
        </Card>

      </Stack>
      {/* --- HISTORIAL DE SUMINISTROS --- */}
      <SuministroHistory suministros={corral.historialSuministros} />
    </Box>
  );
}