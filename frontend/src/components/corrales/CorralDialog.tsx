import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"
import { CorralForm } from "./CorralForm"

type Props = {
  open: boolean
  onClose: () => void
  title: string
  form: { numero: string; capacidadMaxima: string; tipoCorral: string }
  setForm: (f: any) => void
  onSave: () => void
  saveLabel?: string
}

export function CorralDialog({
  open,
  onClose,
  title,
  form,
  setForm,
  onSave,
  saveLabel = "Guardar",
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <CorralForm form={form} setForm={setForm} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={onSave}>
          {saveLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}