"use client";

import React, { useEffect, useState } from "react";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import { ReportsHeader } from "@/src/components/reports/ReportsHeader"; 
import { CorralEfficiencyCard } from "@/src/components/reports/CorralEficiencyCard";
import { HealthStatsCard } from "@/src/components/reports/HealthStatsCard";
import { MonthlySummaryCard } from "@/src/components/reports/MonthlySummaryCard";
import { WeightEvolutionCard } from "@/src/components/reports/WeightEvolutionCard";
import { 
  getCorralEfficiency, 
  getHealthStats, 
  getMonthlySummary, 
  getWeightEvolution 
} from "@/src/services/reportes";
import { 
  CorralEfficiencyItem, 
  HealthStatsData, 
  MonthlySummaryData, 
  WeightEvolutionDataPoint, 
  WeightEvolutionSeries 
} from "@/src/types/reportes";

export default function Reports(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [corralData, setCorralData] = useState<CorralEfficiencyItem[]>([]);
    const [healthData, setHealthData] = useState<HealthStatsData | null>(null);
    const [summaryData, setSummaryData] = useState<MonthlySummaryData | null>(null);
    const [weightData, setWeightData] = useState<WeightEvolutionDataPoint[]>([]);
    const [weightSeries, setWeightSeries] = useState<WeightEvolutionSeries[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [corralRes, healthRes, summaryRes, weightRes] = await Promise.all([
                    getCorralEfficiency(),
                    getHealthStats(),
                    getMonthlySummary(),
                    getWeightEvolution()
                ]);

                setCorralData(corralRes);
                setHealthData(healthRes);
                setSummaryData(summaryRes);
                setWeightData(weightRes.data);
                setWeightSeries(weightRes.series);
            } catch (err) {
                console.error(err);
                setError("Error al cargar los datos de reportes.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ p: 3 }}>
                <Stack spacing={3}>
                    <ReportsHeader />

                    <Box
                    sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(3, minmax(0, 1fr))",
                        },
                    }}
                    >
                        <CorralEfficiencyCard data={corralData} />
                        {healthData && <HealthStatsCard data={healthData} />}
                        {summaryData && <MonthlySummaryCard data={summaryData} />}
                    </Box>

                    <WeightEvolutionCard data={weightData} series={weightSeries} />
                </Stack>
            </Box>
        </>
    );
}