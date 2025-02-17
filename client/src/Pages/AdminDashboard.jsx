// import { useState } from "react";

function AdminDashboard() {
  //   const [searchTerm, setSearchTerm] = useState("");

  const statsData = {
    totalDoctors: 45,
    totalPatients: 1234,
    activeAppointments: 89,
    occupancyRate: "85%",
  };

  const staffSchedule = [
    { doctor: "Dr. James Wilson", shift: "Morning", status: "On Duty" },
    { doctor: "Dr. Maria Rodriguez", shift: "Evening", status: "On Leave" },
    { doctor: "Dr. David Kim", shift: "Night", status: "On Duty" },
  ];

  const systemAlerts = [
    {
      type: "warning",
      message: "System maintenance scheduled for tonight",
      time: "2 hours ago",
    },
    {
      type: "error",
      message: "Low medical supplies in Storage B",
      time: "4 hours ago",
    },
    {
      type: "success",
      message: "New doctor onboarding completed",
      time: "6 hours ago",
    },
  ];

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <></>

      <div className="flex-1 flex flex-col overflow-hidden">
        <></>

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
                      <i
                        className={`fas ${
                          key.includes("Doctors")
                            ? "fa-user-md"
                            : key.includes("Patients")
                            ? "fa-users"
                            : key.includes("Appointments")
                            ? "fa-calendar-check"
                            : "fa-chart-pie"
                        } text-[#2c4ecf] text-xl`}
                      ></i>
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
                        <i
                          className={`fas ${
                            action.includes("Doctor")
                              ? "fa-user-md"
                              : action.includes("Patient")
                              ? "fa-user-plus"
                              : action.includes("Reports")
                              ? "fa-file-medical"
                              : "fa-cog"
                          } mb-2 text-xl`}
                        ></i>
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
                          <i
                            className={`fas ${
                              alert.type === "warning"
                                ? "fa-exclamation-triangle"
                                : alert.type === "error"
                                ? "fa-exclamation-circle"
                                : "fa-check-circle"
                            }`}
                          ></i>
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
