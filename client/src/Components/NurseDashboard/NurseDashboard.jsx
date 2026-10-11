import { useState, useEffect } from "react";
import QuickStats from "./QuickStats";
import AssignedPatientsSection from "./AssignedPatientsSection";
import TodayTasksSection from "./TodayTasksSection";
import ShiftInfoSection from "./ShiftInfoSection";
import QuickActionsSection from "./QuickActionsSection";
import RecentAlertsSection from "./RecentAlertsSection";
import MockData from "../../data/MockData";
import { api } from "../../api/client";
import { toPatientCard } from "../../utils/patients";

function NurseDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .listPatients({ limit: 100 })
      .then(({ patients }) => {
        const critical = patients.filter((p) => p.priority === "critical");
        setDashboardData({
          ...MockData, // tasks, medications and shift info have no backend yet
          stats: {
            ...MockData.stats,
            patientsUnderCare: patients.length,
            criticalAlerts: critical.length,
          },
          patients: patients.map(toPatientCard),
          alerts: critical.map((p) => ({
            id: p.id,
            message: `${p.name}${
              p.room ? ` (room ${p.room})` : ""
            } is in critical condition.`,
            level: "Critical",
          })),
        });
      })
      .catch((err) => setError(`Could not load dashboard data: ${err.message}`))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (error) return <div className="error-screen">{error}</div>;

  return (
    <div className="flex min-h-fit bg-[#f8faff]">
      <div className="flex-1 px-6 py-8">
        <div className="max-w-[1920px] mx-auto">
          <QuickStats stats={dashboardData?.stats} />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <AssignedPatientsSection patients={dashboardData?.patients} />
              <TodayTasksSection tasks={dashboardData?.tasks} />
              <ShiftInfoSection shiftInfo={dashboardData?.shiftInfo} />
            </div>
            <div className="space-y-8">
              <QuickActionsSection />
              <RecentAlertsSection alerts={dashboardData?.alerts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NurseDashboard;
