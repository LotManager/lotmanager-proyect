import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Stack,
  Box,
  Chip,
  Button
} from "@mui/material";
import { Edit, Delete, Spa, Fastfood, LocalFireDepartment } from "@mui/icons-material";
import { Dieta } from "@/src/services/dieta";

type Props = {
  dieta: Dieta;
  onEdit?: (dieta: Dieta) => void;
  onDelete?: (dieta: Dieta) => void;
};

export function DietaCard({ dieta, onEdit, onDelete }: Props) {
  
  const detalles = dieta.detallesDieta || [];
  const totalKg = detalles.reduce((acc, d) => acc + d.proporcionKg, 0);

  // Placeholder nutricional
  const infoNutricional = { proteina: "18%", energia: "2.8 Mcal/kg" };

  return (
    <Card 
      elevation={2} 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2, 
        border: '1px solid #e2e8f0' 
      }}
    >
      <CardHeader
        disableTypography
        title={
          <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
            <Spa sx={{ color: 'success.main', fontSize: 20 }} />
            <Typography variant="h6" fontWeight="bold" color="text.primary" lineHeight={1.2}>
              {dieta.nombre}
            </Typography>
          </Stack>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            {dieta.descripcion || "Sin descripción."}
          </Typography>
        }
        sx={{ pb: 1 }}
      />
      
      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
        

        <Divider />

        <Typography variant="subtitle2" fontWeight="bold" color="text.primary" sx={{ mt: 2 }} gutterBottom>
          Ingredientes ({totalKg.toFixed(2)} kg base):
        </Typography>
        
        <Stack spacing={0.5} mb={2} sx={{ maxHeight: 120, overflowY: 'auto' }}>
          {detalles.slice(0, 5).map((d, index) => (
            <Stack key={index} direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                • {d.alimento?.nombre || `Ingrediente #${d.alimentoId}`}
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {d.proporcionKg.toFixed(2)} kg
              </Typography>
            </Stack>
          ))}
          {detalles.length === 0 && (
              <Typography variant="body2" color="text.disabled" fontStyle="italic">
                  Sin ingredientes definidos.
              </Typography>
          )}
        </Stack>

        <Divider />

        {/* --- ACCIONES DE GESTIÓN --- */}
        <Box sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            {onEdit && (
                <Button 
                    variant="outlined" size="small"
                    startIcon={<Edit />}
                    onClick={() => onEdit(dieta)}
                >
                    Editar
                </Button>
            )}
            
            {onDelete && (
                <Button 
                    variant="outlined" size="small" color="error"
                    startIcon={<Delete />}
                    onClick={() => onDelete(dieta)}
                >
                   Borrar
                </Button>
            )}
          </Stack>
        </Box>

      </CardContent>
    </Card>
  );
}