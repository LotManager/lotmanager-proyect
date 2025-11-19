"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const summaryItems = [
  { label: "Peso promedio inicial", value: "420 kg" },
  { label: "Peso promedio actual", value: "485 kg", highlight: true },
  { label: "Ganancia total", value: "65 kg", highlight: true },
  { label: "GMD promedio", value: "1.8 kg/día", highlight: true },
];

export const MonthlySummaryCard: React.FC = () => {
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