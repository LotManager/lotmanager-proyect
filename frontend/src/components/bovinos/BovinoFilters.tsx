import { useEffect, useState } from "react";
import { Paper, TextField, Select, MenuItem, FormControl, InputLabel, Stack, Button } from "@mui/material";
import { getCorrales, Corral } from "@/src/services/corral";
import { FilterListOff } from "@mui/icons-material";

// Definimos la forma de nuestros filtros
export type FilterState = {
  caravana: string;
  minPeso: string;
  maxPeso: string;
  corralId: string; // Usamos string para manejar el "todos" más fácil
};

type Props = {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
};

export function AnimalFilters({ filters, onChange }: Props) {
  const [corrales, setCorrales] = useState<Corral[]>([]);

  // Cargamos los corrales para el Select
  useEffect(() => {
    getCorrales().then(setCorrales).catch(console.error);
  }, []);

  const handleChange = (field: keyof FilterState, value: string) => {
    onChange({ ...filters, [field]: value });
  };

  const handleClear = () => {
    onChange({ caravana: "", minPeso: "", maxPeso: "", corralId: "" });
  };

  return (
    <Paper elevation={2} className="p-4">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <h2 className="text-lg font-semibold text-slate-700">Filtros y Búsqueda</h2>
        {(filters.caravana || filters.minPeso || filters.maxPeso || filters.corralId) && (
          <Button startIcon={<FilterListOff />} size="small" onClick={handleClear} color="inherit">
            Limpiar Filtros
          </Button>
        )}
      </Stack>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Buscador por Caravana */}
        <TextField 
          label="Buscar por Caravana..." 
          variant="outlined" 
          size="small" 
          value={filters.caravana}
          onChange={(e) => handleChange("caravana", e.target.value)}
        />

        {/* Rango de Peso */}
        <TextField 
          label="Peso mín (kg)" 
          type="number" 
          variant="outlined" 
          size="small" 
          value={filters.minPeso}
          onChange={(e) => handleChange("minPeso", e.target.value)}
        />
        <TextField 
          label="Peso máx (kg)" 
          type="number" 
          variant="outlined" 
          size="small" 
          value={filters.maxPeso}
          onChange={(e) => handleChange("maxPeso", e.target.value)}
        />
        
        {/* Select de Corral */}
        <FormControl fullWidth size="small">
          <InputLabel>Corral</InputLabel>
          <Select 
            label="Corral" 
            value={filters.corralId}
            onChange={(e) => handleChange("corralId", e.target.value)}
          >
            <MenuItem value=""><em>Todos los corrales</em></MenuItem>
            {corrales.map((c) => (
              <MenuItem key={c.id} value={c.id.toString()}>
                Corral #{c.numero} ({c.tipo})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Paper>
  );
}