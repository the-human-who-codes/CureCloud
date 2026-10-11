import StatsCard from "./StatsCard";
import QuickActions from "./QuickActions";
import AppointmentsTable from "./AppointmentsTable";
import PatientsSection from "./PatientsSection";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { todaySast } from "../../utils/format";
import { toPatientCard } from "../../utils/patients";
import AsyncContent from "../common/AsyncContent";
import {
  faUsers,
  faCalendarCheck,
  faFileMedical,
  faPrescription,
} from "@fortawesome/free-solid-svg-icons";

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

  // const handleSearch = (term) => {
  //   setSearchTerm(term);
  // };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                Welcome back, {user?.name}
              </h1>
              <p className="font-poppins text-[#4a5568]">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <AsyncContent loading={loading} error={error}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(data.stats).map(([key, value]) => (
                <StatsCard
                  key={key}
                  title={key.replace(/([A-Z])/g, " $1").trim()}
                  value={value}
                  icon={
                    key === "totalPatients"
                      ? faUsers
                      : key === "todayAppointments"
                      ? faCalendarCheck
                      : key === "pendingReports"
                      ? faFileMedical
                      : faPrescription
                  }
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <PatientsSection patients={data.patients} />
              <QuickActions />
            </div>

            <AppointmentsTable appointments={data.appointments} />
          </AsyncContent>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
