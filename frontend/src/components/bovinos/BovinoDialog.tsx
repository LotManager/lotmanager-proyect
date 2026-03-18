import { useEffect, useState } from "react"
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Stack, MenuItem, Alert,
  FormControl, InputLabel, Select, CircularProgress, FormHelperText
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bovinoSchema, BovinoFormValues } from "@/src/lib/schemas/BovinoSchema"
import { CreateBovinoInput, Bovino } from "@/src/services/bovino"
import { getRazas, Raza } from "@/src/services/raza"
import { getCorrales, Corral } from "@/src/services/corral"

type Props = {
  open: boolean
  onClose: () => void
  onSave: (data: CreateBovinoInput) => Promise<void>
  bovinoToEdit?: Bovino | null
}

const defaultValues: BovinoFormValues = {
  caravana: 0,
  razaId: 0,
  corralId: 0,
  pesoIngreso: 0,
  ingreso: new Date().toISOString().split("T")[0],
  sexo: "MACHO",
  tipoBovino: "TERNERO",
  situacionBovino: "ENCORRAL",
  estadoSalud: "SANO",
}

export function BovinoDialog({ open, onClose, onSave, bovinoToEdit }: Props) {
  const [razas, setRazas] = useState<Raza[]>([])
  const [corrales, setCorrales] = useState<Corral[]>([])
  const [loadingData, setLoadingData] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BovinoFormValues>({
    resolver: zodResolver(bovinoSchema) as any,
    defaultValues,
  })

  // Cargar razas y corrales
  useEffect(() => {
    if (!open) return
    setLoadingData(true)
    Promise.all([getRazas(), getCorrales()])
      .then(([r, c]) => { setRazas(r); setCorrales(c) })
      .catch(console.error)
      .finally(() => setLoadingData(false))
  }, [open])

  // Pre-llenar con los campos disponibles en Bovino
  useEffect(() => {
    if (!open) return
    if (bovinoToEdit) {
      reset({
        ...defaultValues,
        caravana: bovinoToEdit.caravana,
        corralId: bovinoToEdit.corralId,
        estadoSalud: bovinoToEdit.estadoSalud,
      })
    } else {
      reset(defaultValues)
    }
  }, [open, bovinoToEdit, reset])

  const onSubmit = async (values: BovinoFormValues) => {
    await onSave({
      ...values,
      ingreso: new Date(values.ingreso).toISOString(),
    })
    onClose()
  }

  const title = bovinoToEdit
    ? `Editar bovino #${bovinoToEdit.caravana}`
    : "Registrar nuevo animal"

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {loadingData ? (
          <div className="flex justify-center p-4"><CircularProgress /></div>
        ) : (
          <Stack spacing={2} sx={{ mt: 1 }}>

            {bovinoToEdit && (
              <Alert severity="info">
                Completá los campos que no se pre-llenan automáticamente (raza, peso, sexo, categoría).
              </Alert>
            )}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="caravana"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Caravana"
                    type="number"
                    fullWidth
                    error={!!errors.caravana}
                    helperText={errors.caravana?.message}
                  />
                )}
              />
              <Controller
                name="pesoIngreso"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Peso de ingreso (kg)"
                    type="number"
                    fullWidth
                    error={!!errors.pesoIngreso}
                    helperText={errors.pesoIngreso?.message}
                  />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="razaId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.razaId}>
                    <InputLabel>Raza</InputLabel>
                    <Select {...field} label="Raza" value={field.value || ""}>
                      {razas.map((r) => (
                        <MenuItem key={r.id} value={r.id}>{r.nombre}</MenuItem>
                      ))}
                    </Select>
                    {errors.razaId && <FormHelperText>{errors.razaId.message}</FormHelperText>}
                  </FormControl>
                )}
              />
              <Controller
                name="corralId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.corralId}>
                    <InputLabel>Corral</InputLabel>
                    <Select {...field} label="Corral" value={field.value || ""}>
                      {corrales.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          Corral #{c.numero} ({c.tipo})
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.corralId && <FormHelperText>{errors.corralId.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="sexo"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.sexo}>
                    <InputLabel>Sexo</InputLabel>
                    <Select {...field} label="Sexo">
                      <MenuItem value="MACHO">Macho</MenuItem>
                      <MenuItem value="HEMBRA">Hembra</MenuItem>
                    </Select>
                    {errors.sexo && <FormHelperText>{errors.sexo.message}</FormHelperText>}
                  </FormControl>
                )}
              />
              <Controller
                name="tipoBovino"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.tipoBovino}>
                    <InputLabel>Categoría</InputLabel>
                    <Select {...field} label="Categoría">
                      <MenuItem value="TERNERO">Ternero</MenuItem>
                      <MenuItem value="NOVILLO">Novillo</MenuItem>
                      <MenuItem value="VAQUILLONA">Vaquillona</MenuItem>
                      <MenuItem value="DESCARTE">Descarte</MenuItem>
                    </Select>
                    {errors.tipoBovino && <FormHelperText>{errors.tipoBovino.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Stack>

            <Controller
              name="ingreso"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fecha de ingreso"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.ingreso}
                  helperText={errors.ingreso?.message}
                />
              )}
            />
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
          {isSubmitting ? <CircularProgress size={24} /> : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}