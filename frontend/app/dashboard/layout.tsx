import React from "react";
import PanelDashboard from "../../src/components/dashboard/panelDashboard";

export const metadata = {
  title: "Dashboard - Feedlot System",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <PanelDashboard />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
