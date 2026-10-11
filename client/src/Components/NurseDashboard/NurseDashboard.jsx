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
import MockData from "../../data/MockData";
import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import { toPatientCard } from "../../utils/patients";
import AsyncContent from "../common/AsyncContent";
import { PageShell } from "../common/PageShell";
import { StatGrid } from "../common/StatCard";

const STAT_ICONS = {
  patientsUnderCare: faHospitalUser,
  tasksForToday: faTasks,
  upcomingMedications: faPills,
  criticalAlerts: faExclamationTriangle,
};

function NurseDashboard() {
  const { data, error, loading } = useApi(async () => {
    const { patients } = await api.listPatients({ limit: 100 });
    const critical = patients.filter((p) => p.priority === "critical");
    return {
      // Tasks, medications and shift info have no backend yet.
      stats: {
        ...MockData.stats,
        patientsUnderCare: patients.length,
        criticalAlerts: critical.length,
      },
      tasks: MockData.tasks,
      shiftInfo: MockData.shiftInfo,
      patients: patients.map(toPatientCard),
      alerts: critical.map((p) => ({
        id: p.id,
        message: `${p.name}${
          p.room ? ` (room ${p.room})` : ""
        } is in critical condition.`,
        level: "Critical",
      })),
    };
  });

  return (
    <PageShell>
      <AsyncContent loading={loading} error={error}>
        {data && (
          <>
            <StatGrid stats={data.stats} icons={STAT_ICONS} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <AssignedPatientsSection patients={data.patients} />
                <TodayTasksSection tasks={data.tasks} />
                <ShiftInfoSection shiftInfo={data.shiftInfo} />
              </div>
              <div className="space-y-8">
                <QuickActionsSection />
                <RecentAlertsSection alerts={data.alerts} />
              </div>
            </div>
          </>
        )}
      </AsyncContent>
    </PageShell>
  );
}

export default NurseDashboard;
