// frontend/src/components/corrales/CambiarDietaDialog.tsx
"use client"

import { useEffect, useState } from "react"
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, FormControl, InputLabel, Select, MenuItem
} from "@mui/material"
import { Dieta, getDietas } from "@/src/services/corral"

type Props = {
  open: boolean
  onClose: () => void
  onSave: (idDieta: number | null) => void
  currentDietaId: number | null
}

export function CambiarDietaDialog({ open, onClose, onSave, currentDietaId }: Props) {
  const [dietas, setDietas] = useState<Dieta[]>([])
  const [selected, setSelected] = useState<number | "">(currentDietaId ?? "")

  useEffect(() => {
    getDietas().then(setDietas).catch(console.error)
  }, [])

  useEffect(() => {
    // cuando cambia el corral actual, sincronizamos selección
    setSelected(currentDietaId ?? "")
  }, [currentDietaId])

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Cambiar dieta</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="dieta-label">Dieta</InputLabel>
          <Select
            labelId="dieta-label"
            value={selected}
            label="Dieta"
            onChange={(e) => setSelected(e.target.value as number)}
          >
            <MenuItem value="">Sin dieta</MenuItem>
            {dietas.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={() => {
            onSave(selected === "" ? null : (selected as number))
            onClose()
          }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}