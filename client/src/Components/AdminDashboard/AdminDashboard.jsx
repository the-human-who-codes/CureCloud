import StatsGrid from "./StatsGrid";
import QuickActions from "./QuickActions";
import Analytics from "./Analytics";
import StaffSchedule from "./StaffSchedule";
import SystemAlerts from "./SystemAlerts";
import MockData from "../../data/MockData";

function AdminDashboard() {
  const statsData = MockData.adminStats;
  const staffSchedule = MockData.staffSchedule;
  const systemAlerts = MockData.systemAlerts;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
          Admin Dashboard
        </h1>
      </div>
      <StatsGrid statsData={statsData} />
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
