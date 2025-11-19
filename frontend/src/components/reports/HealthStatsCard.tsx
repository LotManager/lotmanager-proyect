"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const healthStats = [
  { label: "Animales sanos", value: "97.6%", color: "primary.main" },
  { label: "En tratamiento", value: "2.1%", color: "warning.main" },
  { label: "Casos críticos", value: "0.3%", color: "error.main" },
  { label: "Mortalidad (mes)", value: "0.1%", color: "error.main" },
];

export const HealthStatsCard: React.FC = () => {
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