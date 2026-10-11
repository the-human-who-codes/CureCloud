import {
  faUserMd,
  faUsers,
  faCalendarCheck,
  faChartPie,
  faFileMedical,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Analytics from "./Analytics";
import StaffSchedule from "./StaffSchedule";
import SystemAlerts from "./SystemAlerts";
import MockData from "../../data/MockData";
import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import AsyncContent from "../common/AsyncContent";
import { Card } from "../common/Card";
import { PageHeader } from "../common/PageShell";
import { StatGrid } from "../common/StatCard";
import { ActionTiles } from "../common/QuickActions";

const statIcon = (key) =>
  key.includes("Doctors")
    ? faUserMd
    : key.includes("Patients")
    ? faUsers
    : key.includes("Appointments")
    ? faCalendarCheck
    : faChartPie;

const QUICK_ACTIONS = [
  { name: "Add New Doctor", icon: faUserMd },
  { name: "Add New Patient", icon: faUsers },
  { name: "Generate Reports", icon: faFileMedical },
  { name: "System Settings", icon: faCog },
];

function AdminDashboard() {
  const stats = useApi(() => api.getAdminStats());
  // No backend for these yet
  const staffSchedule = MockData.staffSchedule;
  const systemAlerts = MockData.systemAlerts;

  return (
    <>
      <PageHeader title="Admin Dashboard" />
      <AsyncContent loading={stats.loading} error={stats.error}>
        <StatGrid stats={stats.data ?? {}} icons={statIcon} />
      </AsyncContent>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 grid gap-6">
          <Card title="Quick Actions">
            <ActionTiles actions={QUICK_ACTIONS} />
          </Card>
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
