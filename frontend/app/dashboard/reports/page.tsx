"use client";

// export const metadata = {
//   title: "Reportes - Feedlot System",
// };


import React from "react";
import { Box, Stack } from "@mui/material";
import { ReportsHeader } from "@/src/components/reports/ReportsHeader"; 
import { CorralEfficiencyCard } from "@/src/components/reports/CorralEficiencyCard";
import { HealthStatsCard } from "@/src/components/reports/HealthStatsCard";
import { MonthlySummaryCard } from "@/src/components/reports/MonthlySummaryCard";
import { WeightEvolutionCard } from "@/src/components/reports/WeightEvolutionCard";



export default function Reports(){
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
                        <CorralEfficiencyCard />
                        <HealthStatsCard />
                        <MonthlySummaryCard />
                    </Box>

                    <WeightEvolutionCard />
                </Stack>
            </Box>
        </>
    );
}