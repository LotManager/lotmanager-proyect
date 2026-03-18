"use client"

// src/components/bovinos/PesajeDialog.tsx
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Stack, CircularProgress, Typography
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { pesajeSchema, PesajeFormValues } from "@/src/lib/schemas/pesaje.schema"
import { registrarPesaje } from "@/src/services/pesaje"
import { useNotification } from "@/src/contexts/NotificationContext"

type Props = {
  open: boolean
  onClose: () => void
  bovinoId: number | null
  caravana?: number
  onSuccess: () => void
}

export function PesajeDialog({ open, onClose, bovinoId, caravana, onSuccess }: Props) {
  const { notify } = useNotification()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PesajeFormValues>({
    resolver: zodResolver(pesajeSchema) as any,
    defaultValues: {
      pesoActual: undefined,
      fecha: new Date().toISOString().split("T")[0],
    },
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = async (values: PesajeFormValues) => {
    if (!bovinoId) return
    try {
      await registrarPesaje({
        bovinoId,
        pesoActual: values.pesoActual,
        fecha: new Date(values.fecha).toISOString(),
      })
      // Snackbar verde en lugar de alert()
      notify("Pesaje registrado correctamente", "success")
      onSuccess()
      handleClose()
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al registrar pesaje"
      // Snackbar rojo en lugar de alert(`Error: ...`)
      notify(message, "error")
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Registrar pesaje
        {caravana && (
          <Typography variant="subtitle2" color="text.secondary" component="span" display="block">
            Bovino #{caravana}
          </Typography>
        )}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Controller
            name="pesoActual"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nuevo peso (kg)"
                type="number"
                fullWidth
                autoFocus
                error={!!errors.pesoActual}
                helperText={errors.pesoActual?.message}
                InputProps={{ endAdornment: <span className="text-gray-500">kg</span> }}
              />
            )}
          />
          <Controller
            name="fecha"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Fecha de pesaje"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.fecha}
                helperText={errors.fecha?.message}
              />
            )}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">Cancelar</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : "Guardar peso"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}