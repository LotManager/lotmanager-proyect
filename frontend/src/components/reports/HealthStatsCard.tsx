"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { HealthStatsCardProps } from "@/src/types/reportes";

export const HealthStatsCard: React.FC<HealthStatsCardProps> = ({ data }) => {
  const healthStats = [
    { label: "Animales sanos", value: `${data.sanosPercentage}%`, color: "primary.main" },
    { label: "En tratamiento", value: `${data.enTratamientoPercentage}%`, color: "warning.main" },
    { label: "Casos críticos", value: `${data.criticosPercentage}%`, color: "error.main" },
    { label: "Mortalidad (mes)", value: `${data.mortalidadPercentage}%`, color: "error.main" },
  ];

  return (
    <Card>
      <CardHeader title="Estadísticas de Sanidad" />
      <CardContent>
        <Stack spacing={2}>
          {healthStats.map((item) => (
            <Stack
              key={item.label}
              direction="row"
              justifyContent="space-between"
            >
              <Typography>{item.label}</Typography>
              <Typography fontWeight="bold" sx={{ color: item.color }}>
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};