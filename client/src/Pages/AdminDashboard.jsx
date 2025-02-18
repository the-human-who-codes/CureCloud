import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";
import StatsGrid from "../Components/AdminDashboard/StatsGrid";
import QuickActions from "../Components/AdminDashboard/QuickActions";
import Analytics from "../Components/AdminDashboard/Analytics";
import StaffSchedule from "../Components/AdminDashboard/StaffSchedule";
import SystemAlerts from "../Components/AdminDashboard/SystemAlerts";
import { MockData } from "../data/MockData";

function AdminDashboard() {
  const statsData = MockData.adminStats;
  const staffSchedule = MockData.staffSchedule;
  const systemAlerts = MockData.systemAlerts;

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <Sidebar userRole="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
