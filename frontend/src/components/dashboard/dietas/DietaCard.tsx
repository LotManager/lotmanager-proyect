"use client";

import React, { useState } from "react";
import { Box, Card, CardContent, CardActions, Button, Stack, Typography, TextField } from "@mui/material";
import { CiWheat } from "react-icons/ci";
import { Collapse, Chip } from '@mui/material';

export type Dieta = {
  id: string | number;
  nombre: string;
  descripcion?: string;
  corrales?: Array<{ id: string | number; nombre: string } | string>;
};

type Props = {
  dieta: Dieta;
  // onEdit can receive updated partial object: (id, updated?) => void
  onEdit?: (id: string | number, updated?: Partial<Dieta> | null) => void;
  onView?: (id: string | number) => void;
};

export default function DietaCard({ dieta, onEdit, onView }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState<{ nombre: string; descripcion: string; corrales: string[] }>({
    nombre: dieta.nombre ?? '',
    descripcion: dieta.descripcion ?? '',
    corrales: (dieta.corrales ?? []).map((c) => (typeof c === 'string' ? c : (c as any).nombre ?? String((c as any).id))),
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Card sx={{ borderRadius: 2, maxWidth: 420 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box sx={{ flex: 1 }}>
            <CiWheat className="w-6 h-6 text-[var(--color-secondary)]" />
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'success.main' }}>
              {dieta.nombre}
            </Typography>
            {/* {dieta.descripcion && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {dieta.descripcion}
              </Typography>
            )} */}
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={() => onEdit && onEdit(dieta.id)}
            size="small"
            color="primary"
            aria-label={`Editar dieta ${dieta.nombre}`}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowDetails((s) => !s)}
            size="small"
            color="inherit"
            aria-label={`Ver dieta ${dieta.nombre}`}
          >
            {showDetails ? 'Ocultar' : 'Ver'}
          </Button>
        </Stack>
      </CardActions>
      <Collapse in={showDetails} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Descripción</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 1 }}>
            {dieta.descripcion ?? 'Sin descripción'}
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>Corrales</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            {(dieta.corrales ?? []).map((c, idx) => (
              <Chip key={`${typeof c === 'string' ? c : (c as any).id}-${idx}`} label={typeof c === 'string' ? c : (c as any).nombre ?? String((c as any).id)} size="small" />
            ))}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
 