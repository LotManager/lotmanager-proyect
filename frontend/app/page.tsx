// app/dashboard/page.tsx
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import WeightEvolutionChart from '@/components/dashboard/WeightEvolutionChart';

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Principal</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <WeightEvolutionChart />
                    {/* Otros componentes del dashboard */}
                </div>
            </div>
        </DashboardLayout>
    );
}