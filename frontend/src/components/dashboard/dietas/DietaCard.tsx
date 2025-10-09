"use client";

import React from "react";
import { Box, Card, CardContent, CardActions, Button, Chip, Stack, Typography, SvgIcon } from "@mui/material";
import { GiWheat } from "react-icons/gi";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

export type Dieta = {
  id: string | number;
  nombre: string;
  descripcion?: string;
  corrales?: Array<{ id: string | number; nombre: string } | string>;
};

type Props = {
  dieta: Dieta;
  onEdit?: (id: string | number) => void;
  onView?: (id: string | number) => void;
};

export default function DietaCard({ dieta, onEdit, onView }: Props) {
  const corrales =
    dieta.corrales?.map((c) => (typeof c === "string" ? { id: c, nombre: c } : c)) || [];

  return (
    <Card sx={{ borderRadius: 2, maxWidth: 420 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box sx={{ color: 'success.dark', mt: 0.2 }} aria-hidden>
            <SvgIcon component={GiWheat as any} fontSize="small" />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'success.main' }}>
              {dieta.nombre}
            </Typography>
            {dieta.descripcion && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {dieta.descripcion}
              </Typography>
            )}
          </Box>
        </Stack>

        {/* <Box sx={{ mt: 2 }}>
          <Stack spacing={0.5}>
            <Typography variant="body2">
              <strong>Proteína:</strong> {dieta.proteina ?? '-'}%
            </Typography>
            <Typography variant="body2">
              <strong>Energía:</strong> {dieta.energia ?? '-'} Mcal/kg
            </Typography>
            <Typography variant="body2">
              <strong>Fibra:</strong> {dieta.fibra ?? '-'}%
            </Typography>
          </Stack>
        </Box> */}

        {corrales.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {corrales.map((c) => {
              const cc = typeof c === 'string' ? { id: c, nombre: String(c) } : (c as { id: string | number; nombre: string });
              return (
                <Chip
                  key={cc.id}
                  label={cc.nombre}
                  size="small"
                  color="success"
                  sx={{ borderRadius: '999px' }}
                />
              );
            })}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<SvgIcon component={AiOutlineEdit as any} />}
            onClick={() => onEdit && onEdit(dieta.id)}
            size="small"
            color="primary"
            aria-label={`Editar dieta ${dieta.nombre}`}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            startIcon={<SvgIcon component={AiOutlineEye as any} />}
            onClick={() => onView && onView(dieta.id)}
            size="small"
            color="inherit"
            aria-label={`Ver dieta ${dieta.nombre}`}
          >
            Ver
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
 