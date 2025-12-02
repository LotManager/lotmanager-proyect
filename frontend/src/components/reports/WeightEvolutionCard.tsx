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
import { WeightEvolutionCardProps } from "@/src/types/reportes";

export const WeightEvolutionCard: React.FC<WeightEvolutionCardProps> = ({ data, series }) => {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Evolución de Peso por Lote" />
      <CardContent>
        <Box sx={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
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

              {series.map((s) => (
                <Line
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name}
                  stroke={s.color}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1 }}
        >
        </Typography>
      </CardContent>
    </Card>
  );
};
