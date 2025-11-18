/*
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Card, CardContent, CardHeader, Chip, Divider, Typography,
  Button, LinearProgress, Alert, Stack, Box
} from "@mui/material"
import { FaArrowLeft, FaEdit } from "react-icons/fa"
import { Corral, getCorralById, getBovinosCountByCorral, updateCorral } from "@/src/services/corral"
import { getCorralGmd, getCorralEficiencia } from "@/src/services/corralMetrics"
import { CambiarDietaDialog } from "@/src/components/corrales/CambiarDietaDialog"

type ViewModel = {
  corral: Corral
  bovinosCount: number
  gmdKgDia: number
  eficiencia: number
  pesoTotal: number
  consumoDiario: number
}

export default function CorralDetailPage() {
  const router = useRouter()
  const params = useParams()
  const idCorral = Number(params?.id)

  const [loading, setLoading] = useState(true)
  const [vm, setVm] = useState<ViewModel | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [openDieta, setOpenDieta] = useState(false)

  useEffect(() => {
    if (!idCorral) return
    setLoading(true)
    setError(null)

    Promise.all([
      getCorralById(idCorral),
      getBovinosCountByCorral(idCorral),
      getCorralGmd(idCorral),
      getCorralEficiencia(idCorral),
    ])
      .then(([corral, bovinosCount, gmdData, eficienciaData]) => {
        setVm({
          corral,
          bovinosCount,
          gmdKgDia: gmdData.gmd ?? 0,
          eficiencia: eficienciaData.eficiencia ?? 0,
          pesoTotal: eficienciaData.pesoTotal ?? 0,
          consumoDiario: eficienciaData.consumoDiario ?? 0,
        })
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [idCorral])

  const handleCambiarDieta = async (idDieta: number | null) => {
    if (!vm) return
    try {
      const actualizado = await updateCorral(vm.corral.id, { idAlimentacion: idDieta })
      setVm((prev) =>
        prev
          ? {
              ...prev,
              corral: {
                ...prev.corral,
                idAlimentacion: idDieta,
                // Si el backend devuelve nombre actualizado:
                nombreAlimentacion: actualizado.nombreAlimentacion ?? prev.corral.nombreAlimentacion
              }
            }
          : prev
      )
    } catch (e) {
      console.error(e)
      setError("Error al cambiar la dieta del corral")
    }
  }

  if (loading) return <div className="p-4"><LinearProgress /></div>
  if (error) return <div className="p-4"><Alert severity="error">{error}</Alert></div>
  if (!vm) return <div className="p-4"><Alert severity="info">Corral no encontrado</Alert></div>

  const ocupacion = Math.round((vm.bovinosCount / vm.corral.capacidadMaxima) * 100)
  return (
    <Box className="space-y-6">
*/
      {/* Header */}
      /*
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="text" startIcon={<FaArrowLeft />} onClick={() => router.push("/dashboard/corrales")}>
            Volver
          </Button>
          <Typography variant="h4" fontWeight={700}>
            Corral #{vm.corral.numero}
          </Typography>
          <Chip
            label={vm.corral.tipoCorral === "ENGORDE" ? "Engorde" : "Enferma"}
            color={vm.corral.tipoCorral === "ENGORDE" ? "primary" : "error"}
            size="small"
          />
        </Stack>
        <Button variant="outlined" startIcon={<FaEdit />}>
          Editar
        </Button>
      </Stack>
      {/* Resumen */
      /*
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Ocupación" subheader={`Capacidad: ${vm.corral.capacidadMaxima}`} />
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight={700}>{vm.bovinosCount} bovinos</Typography>
              <Chip label={`${ocupacion}%`} color={ocupacion > 85 ? "warning" : "default"} />
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Relación ocupación/capacidad del corral.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardHeader title="Dieta actual" />
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                label={vm.corral.nombreAlimentacion ?? "Sin dieta"}
                color={vm.corral.nombreAlimentacion ? "success" : "default"}
              />
              <Button size="small" onClick={() => setOpenDieta(true)}>
                Cambiar dieta
              </Button>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Nombre de la dieta asociada a la alimentación del corral.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardHeader title="Tipo de corral" />
          <CardContent>
            <Typography variant="h5" fontWeight={700}>
              {vm.corral.tipoCorral === "ENGORDE" ? "Engorde" : "Enferma"}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Clasificación operativa para gestión y reportes.
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Estadísticas */
      /*
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        <Card sx={{ flex: 1 }}>
          <CardHeader title="Ganancia media diaria (GMD)" subheader="Promedio actual" />
          <CardContent>
            <Typography variant="h3" fontWeight={800}>
              {vm.gmdKgDia.toFixed(2)} kg/día
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Promedio de ganancia por animal por día.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardHeader title="Eficiencia alimentaria" subheader="Relación peso/consumo" />
          <CardContent>
            <Typography variant="h3" fontWeight={800}>
              {vm.eficiencia.toFixed(2)}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Peso total: {vm.pesoTotal} kg — Consumo diario: {vm.consumoDiario} kg
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <CambiarDietaDialog
        open={openDieta}
        onClose={() => setOpenDieta(false)}
        onSave={handleCambiarDieta}
        currentDietaId={vm.corral.idAlimentacion}
      />
    </Box>
  )
}*/
