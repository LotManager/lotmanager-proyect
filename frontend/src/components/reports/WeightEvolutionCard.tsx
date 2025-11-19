"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const weightData = [
  { month: "Ene", lote1: 410, lote2: 395, lote3: 420 },
  { month: "Feb", lote1: 430, lote2: 405, lote3: 438 },
  { month: "Mar", lote1: 455, lote2: 420, lote3: 446 },
  { month: "Abr", lote1: 470, lote2: 455, lote3: 452 },
  { month: "May", lote1: 465, lote2: 470, lote3: 460 },
  { month: "Jun", lote1: 490, lote2: 480, lote3: 455 },
  { month: "Jul", lote1: 510, lote2: 495, lote3: 470 },
  { month: "Ago", lote1: 505, lote2: 510, lote3: 490 },
  { month: "Sep", lote1: 520, lote2: 515, lote3: 485 },
  { month: "Oct", lote1: 540, lote2: 495, lote3: 500 },
  { month: "Nov", lote1: 550, lote2: 505, lote3: 520 },
  { month: "Dic", lote1: 560, lote2: 530, lote3: 510 },
];

const lotColors = {
  lote1: "#3F51B5", // Indigo
  lote2: "#009688", // Teal
  lote3: "#F57C00", // Orange
};


export const WeightEvolutionCard: React.FC = () => {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Evolución de Peso por Lote" />
      <CardContent>
        <Box sx={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightData} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                stroke={theme.palette.text.secondary}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke={theme.palette.text.secondary}
                tickFormatter={(value) => `${value} kg`}
              />
              <Tooltip
                formatter={(value: number) => [`${value} kg`, "Peso promedio"]}
                labelFormatter={(label) => `Mes: ${label}`}
              />
              <Legend />

                <Line
                type="monotone"
                dataKey="lote1"
                name="Lote 1"
                stroke={lotColors.lote1}
                strokeWidth={2}
                dot={{ r: 3 }}
                />

                <Line
                type="monotone"
                dataKey="lote2"
                name="Lote 2"
                stroke={lotColors.lote2}
                strokeWidth={2}
                dot={{ r: 3 }}
                />

                <Line
                type="monotone"
                dataKey="lote3"
                name="Lote 3"
                stroke={lotColors.lote3}
                strokeWidth={2}
                dot={{ r: 3 }}
                />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
          Valores representativos. Podés conectar estos datos a tu API de historial de pesajes por
          lote.
        </Typography>
      </CardContent>
    </Card>
  );
};
