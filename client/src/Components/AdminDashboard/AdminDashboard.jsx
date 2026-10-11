import StatsGrid from "./StatsGrid";
import QuickActions from "./QuickActions";
import Analytics from "./Analytics";
import StaffSchedule from "./StaffSchedule";
import SystemAlerts from "./SystemAlerts";
import MockData from "../../data/MockData";
import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import AsyncContent from "../common/AsyncContent";

function AdminDashboard() {
  const stats = useApi(() => api.getAdminStats());
  // No backend for these yet
  const staffSchedule = MockData.staffSchedule;
  const systemAlerts = MockData.systemAlerts;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
          Admin Dashboard
        </h1>
      </div>
      <AsyncContent loading={stats.loading} error={stats.error}>
        <StatsGrid statsData={stats.data ?? {}} />
      </AsyncContent>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 grid gap-6">
          <QuickActions />
          <Analytics />
        </div>
        <div className="space-y-6">
          <StaffSchedule staffSchedule={staffSchedule} />
          <SystemAlerts systemAlerts={systemAlerts} />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
