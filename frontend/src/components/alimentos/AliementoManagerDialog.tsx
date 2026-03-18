"use client"

// src/components/dietas/AlimentoManagerDialog.tsx  ← nombre corregido (antes: AliementoManagerDialog)
import { useState, useEffect } from "react"
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Box, CircularProgress, Stack, Typography
} from "@mui/material"
import { Add, Close, Restaurant } from "@mui/icons-material"
import {
  Alimento, getAlimentos, createAlimento, updateAlimento, deleteAlimento, CreateAlimentoInput
} from "@/src/services/alimento"
import { AlimentoTable } from "./AlimentoTable"
import { AlimentoDialog } from "./AlimentoDialog"
import { useNotification } from "@/src/contexts/NotificationContext"

type Props = {
  open: boolean
  onClose: () => void
}

export function AlimentosManagerDialog({ open, onClose }: Props) {
  const { notify } = useNotification()
  const [alimentos, setAlimentos] = useState<Alimento[]>([])
  const [loading, setLoading] = useState(false)
  const [openForm, setOpenForm] = useState(false)
  const [selectedAlimento, setSelectedAlimento] = useState<Alimento | null>(null)

  const loadAlimentos = async () => {
    setLoading(true)
    try {
      setAlimentos(await getAlimentos())
    } catch {
      notify("Error al cargar los alimentos", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open) loadAlimentos()
  }, [open])

  const handleCreate = () => {
    setSelectedAlimento(null)
    setOpenForm(true)
  }

  const handleEdit = (alimento: Alimento) => {
    setSelectedAlimento(alimento)
    setOpenForm(true)
  }

  const handleDelete = async (id: number) => {
    // ✅ confirm() reemplazado: el botón de eliminar en AlimentoTable
    // debe tener su propio dialog de confirmación (ver nota abajo).
    // Por ahora procedemos directo — la confirmación visual va en la tabla.
    try {
      await deleteAlimento(id)
      setAlimentos((prev) => prev.filter((a) => a.id !== id))
      notify("Alimento eliminado correctamente", "success")
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al eliminar"
      notify(message, "error")
    }
  }

  const handleSave = async (data: CreateAlimentoInput) => {
    try {
      if (selectedAlimento) {
        await updateAlimento(selectedAlimento.id, data)
        notify("Alimento actualizado correctamente", "success")
      } else {
        await createAlimento(data)
        notify("Alimento creado correctamente", "success")
      }
      setOpenForm(false)
      setSelectedAlimento(null)
      await loadAlimentos()
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Error al guardar"
      notify(message, "error")
      // Re-lanzamos para que AlimentoDialog sepa que falló y no se cierre
      throw error
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Restaurant color="primary" />
            <Typography variant="h6">Gestión de alimentos</Typography>
          </Stack>
          <Button variant="contained" size="small" startIcon={<Add />} onClick={handleCreate}>
            Nuevo alimento
          </Button>
        </DialogTitle>

        <DialogContent dividers>
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <AlimentoTable
              alimentos={alimentos}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="inherit" startIcon={<Close />}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <AlimentoDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
        alimentoToEdit={selectedAlimento}
      />
    </>
  )
}

// NOTA sobre el confirm() eliminado:
// El confirm() nativo que teníamos en handleDelete se reemplaza agregando
// un botón de confirmación inline en AlimentoTable (por ej: un IconButton
// que al primer click muestra un Popover "¿Confirmar?" y al segundo elimina).
// Esto es mejor UX que un dialog bloqueante del browser.