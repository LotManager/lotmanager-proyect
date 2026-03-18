"use client"

// src/components/bovinos/MovimientoDialog.tsx
import { useEffect, useState } from "react"
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Stack, MenuItem, FormControl, InputLabel, Select,
  CircularProgress, Typography, FormHelperText
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { movimientoSchema, MovimientoFormValues } from "@/src/lib/schemas/MovimientoSchema"
import { getCorrales, Corral } from "@/src/services/corral"
import { crearMovimiento } from "@/src/services/movimiento"
import { Bovino } from "@/src/services/bovino"
import { useNotification } from "@/src/contexts/NotificationContext"

type Props = {
  open: boolean
  onClose: () => void
  bovino: Bovino | null
  onSuccess: () => void
}

export function MovimientoDialog({ open, onClose, bovino, onSuccess }: Props) {
  const { notify } = useNotification()
  const [corrales, setCorrales] = useState<Corral[]>([])
  const [loadingData, setLoadingData] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MovimientoFormValues>({
    resolver: zodResolver(movimientoSchema) as any,
    defaultValues: { corralDestinoId: 0, motivo: "CAMBIO" },
  })

  useEffect(() => {
    if (!open) return
    setLoadingData(true)
    getCorrales()
      .then(setCorrales)
      .catch(() => notify("Error al cargar corrales", "error"))
      .finally(() => setLoadingData(false))
  }, [open])

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = async (values: MovimientoFormValues) => {
    if (!bovino) return
    try {
      await crearMovimiento({
        bovinoId: bovino.id,
        corralOrigenId: bovino.corralId,
        corralDestinoId: values.corralDestinoId,
        motivo: values.motivo,
      })
      notify("Movimiento registrado correctamente", "success")
      onSuccess()
      handleClose()
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al registrar movimiento"
      notify(message, "error")
    }
  }

  if (!bovino) return null

  const corralesDestino = corrales.filter((c) => c.id !== bovino.corralId)

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Mover bovino
        <Typography variant="subtitle2" color="text.secondary" component="span" display="block">
          Caravana #{bovino.caravana} — Actualmente en {bovino.nombreCorral}
        </Typography>
      </DialogTitle>

      <DialogContent>
        {loadingData ? (
          <div className="flex justify-center py-6"><CircularProgress size={28} /></div>
        ) : (
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Controller
              name="corralDestinoId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.corralDestinoId}>
                  <InputLabel>Corral de destino</InputLabel>
                  <Select {...field} label="Corral de destino" value={field.value || ""}>
                    {corralesDestino.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        Corral #{c.numero} ({c.tipo}) — Cap: {c.capacidadMaxima}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.corralDestinoId && (
                    <FormHelperText>{errors.corralDestinoId.message}</FormHelperText>
                  )}
                  {corralesDestino.length === 0 && (
                    <FormHelperText>No hay otros corrales disponibles</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="motivo"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.motivo}>
                  <InputLabel>Motivo</InputLabel>
                  <Select {...field} label="Motivo">
                    <MenuItem value="CAMBIO">Cambio de etapa / rutina</MenuItem>
                    <MenuItem value="ENFERMEDAD">Enfermedad / aislamiento</MenuItem>
                  </Select>
                  {errors.motivo && (
                    <FormHelperText>{errors.motivo.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">Cancelar</Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="warning"
          disabled={isSubmitting || loadingData || corralesDestino.length === 0}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Confirmar movimiento"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}