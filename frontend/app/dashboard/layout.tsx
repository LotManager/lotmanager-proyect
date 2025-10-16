import React from "react";
import PanelDashboard from "../../src/components/dashboard/panelDashboard";

export const metadata = {
  title: "Dashboard - Feedlot System",
};

export default function DashboardLayout({ children,}: {children: React.ReactNode; }) { 
  return (
    <div className="flex">
      {/* Panel lateral fijo */}
      <PanelDashboard />

      {/* Contenido principal */}
      <main className="ml-72 flex-1 bg-slate-50 min-h-screen p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}


