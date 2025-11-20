"use client";

import React from "react";
import { Stack, Typography, Button } from "@mui/material";

export const ReportsHeader: React.FC = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Typography variant="h4" component="h1" fontWeight="bold">
        Reportes y Estadísticas
      </Typography>
    </Stack>
  );
};