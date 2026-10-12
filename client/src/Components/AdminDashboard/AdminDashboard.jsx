import {
  faUserMd,
  faUserNurse,
  faUsers,
  faUserClock,
  faCalendarCheck,
  faBed,
  faHospitalUser,
  faFileMedical,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Analytics from "./Analytics";
import StaffSchedule from "./StaffSchedule";
import SystemAlerts from "./SystemAlerts";
import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import AsyncContent from "../common/AsyncContent";
import { Card } from "../common/Card";
import { PageHeader, PageShell } from "../common/PageShell";
import { StatCard } from "../common/StatCard";
import { ActionTiles } from "../common/QuickActions";

const QUICK_ACTIONS = [
  {
    name: "Pending Approvals",
    icon: faUserClock,
    to: "/admin/user-management?status=pending",
  },
  { name: "Patients", icon: faHospitalUser, to: "/admin/patients" },
  { name: "Reports", icon: faFileMedical, to: "/admin/reports" },
  { name: "System Settings", icon: faCog, to: "/admin/system-settings" },
];

function AdminDashboard() {
  const dashboard = useApi(() => api.getDashboard());
  const c = dashboard.data?.counters;

  return (
    <PageShell>
      <PageHeader title="Admin Dashboard" />
      <AsyncContent loading={dashboard.loading} error={dashboard.error}>
        {c && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <StatCard label="Doctors" value={c.doctors} icon={faUserMd} />
            <StatCard label="Nurses" value={c.nurses} icon={faUserNurse} />
            <StatCard label="Patients" value={c.patients} icon={faUsers} />
            <StatCard
              label="Pending Staff"
              value={c.pendingStaff}
              icon={faUserClock}
              tone={c.pendingStaff ? "warning" : "primary"}
            />
            <StatCard
              label="Upcoming Appointments"
              value={c.upcomingAppointments}
              icon={faCalendarCheck}
            />
            <StatCard
              label="Admitted"
              value={c.admittedPatients}
              icon={faBed}
            />
          </div>
        )}
      </AsyncContent>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 grid gap-6 content-start">
          <Card title="Quick Actions">
            <ActionTiles actions={QUICK_ACTIONS} />
          </Card>
          <Analytics />
        </div>
        <div className="space-y-6">
          <StaffSchedule />
          <SystemAlerts />
        </div>
      </div>
    </PageShell>
  );
}

export default AdminDashboard;
