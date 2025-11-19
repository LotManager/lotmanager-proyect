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

const CORRALES = [1, 2, 3, 4, 5];

export const CorralEfficiencyCard: React.FC = () => {
  return (
    <Card>
      <CardHeader title="Eficiencia por Corral" />
      <CardContent>
        <Stack spacing={2}>
          {CORRALES.map((corral) => {
            const eficiencia = 60 + corral * 8;
            const gmd = 1.6 + corral * 0.1;

            return (
              <Stack
                key={corral}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
              >
                <Typography>Corral {corral}</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ width: 80 }}>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(eficiencia, 100)}
                      sx={{
                        borderRadius: 999,
                        height: 6,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" fontWeight="medium">
                    {gmd.toFixed(1)} kg/día
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