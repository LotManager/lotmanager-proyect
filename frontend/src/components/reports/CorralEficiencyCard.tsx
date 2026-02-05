"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Box,
  LinearProgress,
} from "@mui/material";
import { CorralEfficiencyCardProps } from "@/src/types/reportes";

export const CorralEfficiencyCard: React.FC<CorralEfficiencyCardProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader title="Eficiencia por Corral" />
      <CardContent>
        <Stack spacing={2}>
          {data.map((item) => {
            return (
              <Stack
                key={item.corralId}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Typography>{item.nombre}</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ width: 80 }}>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(item.eficiencia, 100)}
                      sx={{
                        borderRadius: 999,
                        height: 6,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    {item.gmd.toFixed(1)} kg/día
                  </Typography>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};