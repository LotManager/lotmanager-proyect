import { useEffect, useState } from "react"
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Stack, MenuItem, FormControl, InputLabel, Select,
  CircularProgress, Divider, Typography, FormHelperText, IconButton
} from "@mui/material"
import { useForm, useFieldArray, Controller, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Delete, AddCircleOutline } from "@mui/icons-material"
import { dietaSchema, DietaFormValues } from "@/src/lib/schemas/dieta.schema"
import { getAlimentos, Alimento } from "@/src/services/alimento"
import { Dieta, CreateDietaInput } from "@/src/services/dieta"

type Props = {
  open: boolean
  onClose: () => void
  onSave: (data: CreateDietaInput) => Promise<void>
  dietaToEdit?: Dieta | null
}

const defaultValues: DietaFormValues = {
  nombre: "",
  descripcion: "",
  detalles: [{ alimentoId: 0, proporcionKg: 0 }],
}

export function DietaDialog({ open, onClose, onSave, dietaToEdit }: Props) {
  const [alimentos, setAlimentos] = useState<Alimento[]>([])
  const [loadingData, setLoadingData] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DietaFormValues>({
    resolver: zodResolver(dietaSchema) as any,
    defaultValues,
  })

  // useFieldArray maneja el array de ingredientes de forma limpia
  const { fields, append, remove } = useFieldArray({
    control,
    name: "detalles",
  })

  // Cargar alimentos disponibles
  useEffect(() => {
    if (!open) return
    setLoadingData(true)
    getAlimentos()
      .then(setAlimentos)
      .catch(console.error)
      .finally(() => setLoadingData(false))
  }, [open])

  // Pre-llenar al editar
  useEffect(() => {
    if (!open) return
    if (dietaToEdit) {
      const detallesRecibidos = dietaToEdit.detallesDieta || []
      reset({
        nombre: dietaToEdit.nombre,
        descripcion: dietaToEdit.descripcion || "",
        detalles: detallesRecibidos.length > 0
          ? detallesRecibidos.map((d) => ({
              alimentoId: d.alimentoId,
              proporcionKg: d.proporcionKg,
            }))
          : defaultValues.detalles,
      })
    } else {
      reset(defaultValues)
    }
  }, [open, dietaToEdit, reset])

  const onSubmit: SubmitHandler<DietaFormValues> = async (values) => {
    await onSave({
      nombre: values.nombre,
      descripcion: values.descripcion,
      detalles: values.detalles,
    })
    onClose()
  }

  // Total de mezcla calculado reactivamente
  const detallesWatched = watch("detalles")
  const totalMezcla = detallesWatched.reduce(
    (acc: number, d: {proporcionKg?: number | string}) => acc + Number(d.proporcionKg || 0), 0
  )

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{dietaToEdit ? "Editar dieta" : "Nueva dieta"}</DialogTitle>
      <DialogContent>
        {loadingData ? (
          <div className="flex justify-center p-4"><CircularProgress /></div>
        ) : (
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Controller
              name="nombre"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre de la dieta"
                  fullWidth
                  error={!!errors.nombre}
                  helperText={errors.nombre?.message}
                />
              )}
            />

            <Controller
              name="descripcion"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción (opcional)"
                  fullWidth
                  multiline
                  rows={2}
                  error={!!errors.descripcion}
                  helperText={errors.descripcion?.message}
                />
              )}
            />

            <Divider>Ingredientes</Divider>

            {/* Error del array completo (ej: "al menos un ingrediente", "ingrediente repetido") */}
            {errors.detalles?.root?.message && (
              <Typography color="error" variant="body2">
                {errors.detalles.root.message}
              </Typography>
            )}

            {fields.map((field, index) => (
              <Stack key={field.id} direction="row" spacing={2} alignItems="flex-start">
                <Controller
                  name={`detalles.${index}.alimentoId`}
                  control={control}
                  render={({ field: f }) => (
                    <FormControl fullWidth error={!!errors.detalles?.[index]?.alimentoId}>
                      <InputLabel>Ingrediente</InputLabel>
                      <Select {...f} label="Ingrediente" value={f.value || ""}>
                        {alimentos.map((al) => (
                          <MenuItem key={al.id} value={al.id}>
                            {al.nombre} ({al.tipo})
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.detalles?.[index]?.alimentoId && (
                        <FormHelperText>
                          {errors.detalles[index].alimentoId?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name={`detalles.${index}.proporcionKg`}
                  control={control}
                  render={({ field: f }) => (
                    <TextField
                      {...f}
                      label="Kg"
                      type="number"
                      sx={{ width: 150 }}
                      error={!!errors.detalles?.[index]?.proporcionKg}
                      helperText={errors.detalles?.[index]?.proporcionKg?.message}
                    />
                  )}
                />

                <IconButton
                  color="error"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  sx={{ mt: 1 }}
                >
                  <Delete />
                </IconButton>
              </Stack>
            ))}

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Button
                startIcon={<AddCircleOutline />}
                onClick={() => append({ alimentoId: 0, proporcionKg: 0 })}
              >
                Agregar ingrediente
              </Button>
              <Typography variant="subtitle1" fontWeight="bold">
                Total mezcla: {totalMezcla.toFixed(2)} kg
              </Typography>
            </Stack>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancelar</Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isSubmitting || loadingData}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Guardar receta"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}