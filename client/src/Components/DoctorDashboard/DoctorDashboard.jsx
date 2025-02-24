import StatsCard from "./StatsCard";
import QuickActions from "./QuickActions";
import AppointmentsTable from "./AppointmentsTable";
import PatientsSection from "./PatientsSection";
import MockData from "../../data/MockData";
import {
  faUsers,
  faCalendarCheck,
  faFileMedical,
  faPrescription,
} from "@fortawesome/free-solid-svg-icons";

function DoctorDashboard() {
  // const [searchTerm, setSearchTerm] = useState("");
  const mockStats = {
    totalPatients: 1234,
    todayAppointments: 45,
    pendingReports: 12,
    activePrescriptions: 89,
  };
  const mockPatients = MockData.patients;
  const mockAppointments = MockData.appointments;

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
                Welcome back, Dr. Connor
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.entries(mockStats).map(([key, value]) => (
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
            <PatientsSection patients={mockPatients} />
            <QuickActions />
          </div>

          <AppointmentsTable appointments={mockAppointments} />
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
