import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faUsers,
  faCalendarCheck,
  faChartPie,
  faFileMedical,
  faCog,
  faExclamationTriangle,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { MockData } from "../data/MockData";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(statsData).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-poppins text-[#4a5568] text-sm">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                        {value}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#f8faff] flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={
                          key.includes("Doctors")
                            ? faUserMd
                            : key.includes("Patients")
                            ? faUsers
                            : key.includes("Appointments")
                            ? faCalendarCheck
                            : faChartPie
                        }
                        className="text-[#2c4ecf] text-xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 grid gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      "Add New Doctor",
                      "Add New Patient",
                      "Generate Reports",
                      "System Settings",
                    ].map((action) => (
                      <button
                        key={action}
                        className="p-4 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200 flex flex-col items-center"
                      >
                        <FontAwesomeIcon
                          icon={
                            action.includes("Doctor")
                              ? faUserMd
                              : action.includes("Patient")
                              ? faUsers
                              : action.includes("Reports")
                              ? faFileMedical
                              : faCog
                          }
                          className="mb-2 text-xl"
                        />
                        <span className="text-sm text-center">{action}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                    <h2 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                      Patient Demographics
                    </h2>
                    <div className="h-[200px] bg-[#f8faff] rounded-lg"></div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                    <h2 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                      Appointment Distribution
                    </h2>
                    <div className="h-[200px] bg-[#f8faff] rounded-lg"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                  <h2 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                    Staff Schedule
                  </h2>
                  <div className="space-y-4">
                    {staffSchedule.map((staff, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-[#f8faff] rounded-lg"
                      >
                        <div>
                          <p className="font-poppins text-sm font-semibold text-[#2c4ecf]">
                            {staff.doctor}
                          </p>
                          <p className="font-poppins text-xs text-[#4a5568]">
                            {staff.shift} Shift
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-poppins ${
                            staff.status === "On Duty"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {staff.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                  <h2 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                    System Alerts
                  </h2>
                  <div className="space-y-4">
                    {systemAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-[#f8faff] rounded-lg"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            alert.type === "warning"
                              ? "bg-yellow-100 text-yellow-800"
                              : alert.type === "error"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={
                              alert.type === "warning"
                                ? faExclamationTriangle
                                : alert.type === "error"
                                ? faExclamationCircle
                                : faCheckCircle
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-poppins text-sm text-[#4a5568]">
                            {alert.message}
                          </p>
                          <p className="font-poppins text-xs text-[#4a5568] opacity-75">
                            {alert.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                <h2 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                  Revenue Analytics
                </h2>
                <div className="h-[200px] bg-[#f8faff] rounded-lg"></div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                <h2 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                  Resource Utilization
                </h2>
                <div className="h-[200px] bg-[#f8faff] rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
