import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"

type Props = {
  form: { numero: string; capacidadMaxima: string; tipoCorral: string }
  setForm: (f: any) => void
}

export function CorralForm({ form, setForm }: Props) {
  return (
    <>
      <TextField
        label="Número"
        fullWidth
        margin="normal"
        value={form.numero}
        onChange={(e) => setForm({ ...form, numero: e.target.value })}
      />
      <TextField
        label="Capacidad"
        fullWidth
        margin="normal"
        value={form.capacidadMaxima}
        onChange={(e) => setForm({ ...form, capacidadMaxima: e.target.value })}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="tipo-corral-label">Tipo de Corral</InputLabel>
        <Select
          labelId="tipo-corral-label"
          value={form.tipoCorral}
          label="Tipo de Corral"
          onChange={(e) => setForm({ ...form, tipoCorral: e.target.value })}
        >
          <MenuItem value="ENGORDE">Engorde</MenuItem>
          <MenuItem value="ENFERMA">Enferma</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}