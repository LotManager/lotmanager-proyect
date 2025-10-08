"use client";

import React from "react";
import { Card, CardContent, CardActions, Button, Chip, Stack, Typography } from "@mui/material";
import { GiWheat } from "react-icons/gi";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

export type Dieta = {
  id: string | number;
  nombre: string;
  descripcion?: string;
  proteina?: string | number;
  energia?: string | number;
  fibra?: string | number;
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
    <Card className="max-w-sm rounded-lg shadow-sm" sx={{ borderRadius: 2 }}>
      <CardContent>
        <div className="flex items-start gap-3">
          <div className="text-green-700 mt-1">
            <GiWheat size={22} />
          </div>
          <div>
            <Typography variant="h6" component="h3" className="font-semibold text-green-800">
              {dieta.nombre}
            </Typography>
            {dieta.descripcion && (
              <Typography variant="body2" color="text.secondary" className="mt-1 text-green-600">
                {dieta.descripcion}
              </Typography>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Stack spacing={0.5}>
            <Typography variant="body2">
              <strong>Proteína:</strong> {dieta.proteina ?? "-"}%
            </Typography>
            <Typography variant="body2">
              <strong>Energía:</strong> {dieta.energia ?? "-"} Mcal/kg
            </Typography>
            <Typography variant="body2">
              <strong>Fibra:</strong> {dieta.fibra ?? "-"}%
            </Typography>
          </Stack>
        </div>

        {corrales.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {corrales.map((c) => (
              <Chip
                key={(c as any).id}
                label={(c as any).nombre}
                size="small"
                color="success"
                className="rounded-full"
              />
            ))}
          </div>
        )}
      </CardContent>

      <CardActions className="px-4 pb-4">
        <div className="flex gap-2">
          <Button
            variant="outlined"
            startIcon={<AiOutlineEdit />}
            onClick={() => onEdit && onEdit(dieta.id)}
            size="small"
            color="inherit"
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            startIcon={<AiOutlineEye />}
            onClick={() => onView && onView(dieta.id)}
            size="small"
          >
            Ver
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
 