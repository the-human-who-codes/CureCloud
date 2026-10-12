import { useNavigate } from "react-router-dom";
import {
  faUsers,
  faCalendarCheck,
  faCalendarDay,
  faFileMedical,
  faPrescription,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import PatientsSection from "./PatientsSection";
import AppointmentsTable from "../Appointments/AppointmentsTable";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { longDate } from "../../utils/format";
import { toPatientCard } from "../../utils/patients";
import AsyncContent from "../common/AsyncContent";
import { Card, Section } from "../common/Card";
import { PageHeader, PageShell } from "../common/PageShell";
import { StatCard } from "../common/StatCard";
import { ActionList } from "../common/QuickActions";

const QUICK_ACTIONS = [
  {
    name: "Add New Patient",
    icon: faUsers,
    to: "/doctor/patient-records?new=1",
  },
  {
    name: "Schedule Appointment",
    icon: faCalendarCheck,
    to: "/doctor/appointments",
  },
  {
    name: "New Prescription",
    icon: faPrescription,
    to: "/doctor/prescriptions?new=1",
  },
  { name: "Reports", icon: faChartBar, to: "/doctor/reports" },
];

function DoctorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dashboard = useApi(() => api.getDashboard());
  const patients = useApi(() => api.listPatients({ limit: 6 }));
  const appointments = useApi(() =>
    api.listAppointments({
      from: new Date().toISOString(),
      status: "pending,confirmed,checked-in",
      limit: 10,
    })
  );
  const counters = dashboard.data?.counters;

  return (
    <PageShell>
      <PageHeader
        title={`Welcome back, ${user?.name ?? ""}`}
        subtitle={longDate()}
      />

      <AsyncContent loading={dashboard.loading} error={dashboard.error}>
        {counters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <StatCard
              label="My Patients"
              value={counters.patients}
              icon={faUsers}
            />
            <StatCard
              label="Appointments Today"
              value={counters.appointmentsToday}
              icon={faCalendarDay}
            />
            <StatCard
              label="Pending Requests"
              value={counters.pendingAppointments}
              icon={faCalendarCheck}
              tone={counters.pendingAppointments ? "warning" : "primary"}
            />
            <StatCard
              label="Draft Records"
              value={counters.preliminaryRecords}
              icon={faFileMedical}
            />
            <StatCard
              label="Active Prescriptions"
              value={counters.activePrescriptions}
              icon={faPrescription}
            />
          </div>
        )}
      </AsyncContent>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <AsyncContent
          {...patients}
          empty={patients.data?.data.length === 0}
          emptyText="No patients on your care team yet."
        >
          <PatientsSection
            patients={(patients.data?.data ?? []).map(toPatientCard)}
            onView={(id) => navigate(`/doctor/patient-records?patient=${id}`)}
          />
        </AsyncContent>
        <Section title="Quick Actions">
          <Card>
            <ActionList actions={QUICK_ACTIONS} />
          </Card>
        </Section>
      </div>

      <Section title="Upcoming Appointments">
        <Card padded={false}>
          <AsyncContent
            {...appointments}
            empty={appointments.data?.data.length === 0}
            emptyText="No upcoming appointments."
          >
            <AppointmentsTable
              appointments={appointments.data?.data ?? []}
              showDoctor={false}
            />
          </AsyncContent>
        </Card>
      </Section>
    </PageShell>
  );
}

export default DoctorDashboard;
