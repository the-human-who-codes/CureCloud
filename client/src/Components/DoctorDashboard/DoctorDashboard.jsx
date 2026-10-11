import {
  faUsers,
  faCalendarCheck,
  faFileMedical,
  faPrescription,
} from "@fortawesome/free-solid-svg-icons";
import PatientsSection from "./PatientsSection";
import AppointmentsTable from "../Appointments/AppointmentsTable";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { longDate, todaySast } from "../../utils/format";
import { toPatientCard } from "../../utils/patients";
import AsyncContent from "../common/AsyncContent";
import { Card, Section } from "../common/Card";
import { PageHeader, PageShell } from "../common/PageShell";
import { StatGrid } from "../common/StatCard";
import { ActionList } from "../common/QuickActions";

const STAT_ICONS = {
  totalPatients: faUsers,
  todayAppointments: faCalendarCheck,
  pendingReports: faFileMedical,
  activePrescriptions: faPrescription,
};

const QUICK_ACTIONS = [
  { name: "Add New Patient", icon: faUsers },
  { name: "Schedule Appointment", icon: faCalendarCheck },
  { name: "Create Prescription", icon: faPrescription },
  { name: "Generate Report", icon: faFileMedical },
];

function DoctorDashboard() {
  const { user } = useAuth();
  const { data, error, loading } = useApi(async () => {
    const [patients, appointments, prescriptions, records] = await Promise.all([
      api.listPatients({ limit: 100 }),
      api.listAppointments({ upcoming: "true", limit: 100 }),
      api.listPrescriptions({ status: "active", limit: 100 }),
      api.listMedicalRecords({ limit: 100 }),
    ]);
    const today = todaySast();
    return {
      stats: {
        totalPatients: patients.patients.length,
        todayAppointments: appointments.appointments.filter(
          (a) => a.date === today
        ).length,
        pendingReports: records.medicalRecords.filter(
          (r) => r.status === "preliminary"
        ).length,
        activePrescriptions: prescriptions.prescriptions.length,
      },
      patients: patients.patients.slice(0, 6).map(toPatientCard),
      appointments: appointments.appointments.filter(
        (a) => a.status !== "cancelled"
      ),
    };
  });

  return (
    <PageShell>
      <PageHeader
        title={`Welcome back, ${user?.name ?? ""}`}
        subtitle={longDate()}
      />

      <AsyncContent loading={loading} error={error}>
        <StatGrid stats={data?.stats ?? {}} icons={STAT_ICONS} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <PatientsSection patients={data?.patients ?? []} />
          <Section title="Quick Actions">
            <Card>
              <ActionList actions={QUICK_ACTIONS} />
            </Card>
          </Section>
        </div>

        <Section title="Upcoming Appointments">
          <Card padded={false}>
            <AppointmentsTable
              appointments={data?.appointments ?? []}
              showDoctor={false}
            />
          </Card>
        </Section>
      </AsyncContent>
    </PageShell>
  );
}

export default DoctorDashboard;
