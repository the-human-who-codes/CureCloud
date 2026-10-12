import {
  faTasks,
  faPills,
  faExclamationTriangle,
  faHospitalUser,
} from "@fortawesome/free-solid-svg-icons";
import AssignedPatientsSection from "./AssignedPatientsSection";
import TodayTasksSection from "./TodayTasksSection";
import ShiftInfoSection from "./ShiftInfoSection";
import QuickActionsSection from "./QuickActionsSection";
import RecentAlertsSection from "./RecentAlertsSection";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { addDays, longDate, sastInstant, todaySast } from "../../utils/format";
import AsyncContent from "../common/AsyncContent";
import { PageHeader, PageShell } from "../common/PageShell";
import { StatCard } from "../common/StatCard";

function NurseDashboard() {
  const { user } = useAuth();
  const dashboard = useApi(() => api.getDashboard());
  const patients = useApi(() => api.listPatients({ limit: 10 }));
  const tasks = useApi(() =>
    api.listCareTasks({
      assigneeId: "me",
      status: "open,in-progress",
      dueBefore: sastInstant(addDays(todaySast(), 1)),
      limit: 20,
    })
  );
  const current = useApi(() => api.getCurrentShift());
  const counters = dashboard.data?.counters;

  return (
    <PageShell>
      <PageHeader
        title={`Welcome back, ${user?.name ?? ""}`}
        subtitle={longDate()}
      />
      <AsyncContent loading={dashboard.loading} error={dashboard.error}>
        {counters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Patients Under Care"
              value={counters.patientsUnderCare}
              icon={faHospitalUser}
            />
            <StatCard
              label="Tasks Due Today"
              value={counters.tasksDueToday}
              icon={faTasks}
            />
            <StatCard
              label="Medications Due Now"
              value={counters.medicationsDueNow}
              icon={faPills}
              tone={counters.medicationsDueNow ? "warning" : "primary"}
            />
            <StatCard
              label="Critical Patients"
              value={counters.criticalPatients}
              icon={faExclamationTriangle}
              tone={counters.criticalPatients ? "danger" : "primary"}
            />
          </div>
        )}
      </AsyncContent>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <AssignedPatientsSection patients={patients} />
          <TodayTasksSection tasks={tasks} />
          <ShiftInfoSection current={current} />
        </div>
        <div className="space-y-8">
          <QuickActionsSection />
          <RecentAlertsSection alerts={dashboard.data?.alerts ?? []} />
        </div>
      </div>
    </PageShell>
  );
}

export default NurseDashboard;
