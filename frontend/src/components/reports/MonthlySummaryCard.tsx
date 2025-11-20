"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { MonthlySummaryCardProps } from "@/src/types/reportes";

export const MonthlySummaryCard: React.FC<MonthlySummaryCardProps> = ({ data }) => {
  const summaryItems = [
    { label: "Peso promedio inicial", value: `${data.pesoPromedioInicial} kg` },
    { label: "Peso promedio actual", value: `${data.pesoPromedioActual} kg`, highlight: true },
    { label: "Ganancia total", value: `${data.gananciaTotal} kg`, highlight: true },
    { label: "GMD promedio", value: `${data.gmdPromedio} kg/día`, highlight: true },
  ];

  return (
    <Card>
      <CardHeader title="Resumen Mensual" />
      <CardContent>
        <Stack spacing={2}>
          {summaryItems.map((item) => (
            <Stack
              key={item.label}
              direction="row"
              justifyContent="space-between"
            >
              <Typography>{item.label}</Typography>
              <Typography
                fontWeight="bold"
                sx={item.highlight ? { color: "primary.main" } : undefined}
              >
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};