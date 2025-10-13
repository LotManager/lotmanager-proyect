// src/components/animales/AnimalFilters.tsx

import { Button, Paper, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export function AnimalFilters() {
  return (
    <Paper elevation={2} className="p-4">
      <h2 className="text-lg font-semibold mb-4">Filtros y Búsqueda</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <TextField label="Buscar por ID..." variant="outlined" size="small" />
        <TextField label="Peso mínimo (kg)" type="number" variant="outlined" size="small" />
        <TextField label="Peso máximo (kg)" type="number" variant="outlined" size="small" />
        
        <FormControl fullWidth size="small">
          <InputLabel>Corral</InputLabel>
          <Select label="Corral" defaultValue="">
            <MenuItem value="">Todos los corrales</MenuItem>
            {/* Aquí necesitaremos cargar los corrales dinámicamente */}
            <MenuItem value={1}>Corral 1</MenuItem>
            <MenuItem value={2}>Corral 2</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" className="bg-green-700 hover:bg-green-800 h-full">
          Filtrar
        </Button>
      </div>
    </Paper>
  );
}