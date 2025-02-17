import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header/Header";
import PatientCard from "../Components/PatientCard/PatientCard";
import { MockData } from "../data/MockData";
// Import FontAwesome components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarCheck,
  faFileMedical,
  faPrescription,
} from "@fortawesome/free-solid-svg-icons";

function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const mockStats = {
    totalPatients: 1234,
    todayAppointments: 45,
    pendingReports: 12,
    activePrescriptions: 89,
  };
  const mockPatients = MockData.patients;
  const mockAppointments = MockData.appointments;
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <Sidebar activePage="Dashboard" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onSearch={handleSearch}
          notificationCount={3}
          userName="Dr. Connor"
          userImage="../assets/default-avatar.svg"
        />

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
                          key === "totalPatients"
                            ? faUsers
                            : key === "todayAppointments"
                            ? faCalendarCheck
                            : key === "pendingReports"
                            ? faFileMedical
                            : faPrescription
                        }
                        className="text-[#2c4ecf] text-xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                  Recent Patients
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockPatients.map((patient) => (
                    <PatientCard
                      key={patient.patientId}
                      {...patient}
                      onView={() => {}}
                      onEdit={() => {}}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                  Quick Actions
                </h2>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                  <div className="space-y-4">
                    {[
                      "Add New Patient",
                      "Schedule Appointment",
                      "Create Prescription",
                      "Generate Report",
                    ].map((action) => (
                      <button
                        key={action}
                        className="w-full px-4 py-3 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200 flex items-center"
                      >
                        <FontAwesomeIcon
                          icon={
                            action.includes("Patient")
                              ? faUsers
                              : action.includes("Appointment")
                              ? faCalendarCheck
                              : action.includes("Prescription")
                              ? faPrescription
                              : faFileMedical
                          }
                          className="mr-2"
                        />
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                Upcoming Appointments
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#f8faff]">
                    <tr>
                      <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                        Patient Name
                      </th>
                      <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                        Time
                      </th>
                      <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                        Type
                      </th>
                      <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAppointments.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="border-t border-[#e1e8ff]"
                      >
                        <td className="px-6 py-4 font-poppins text-[#4a5568]">
                          {appointment.patientName}
                        </td>
                        <td className="px-6 py-4 font-poppins text-[#4a5568]">
                          {appointment.time}
                        </td>
                        <td className="px-6 py-4 font-poppins text-[#4a5568]">
                          {appointment.type}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-poppins ${
                              appointment.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
