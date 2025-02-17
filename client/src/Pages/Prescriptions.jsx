"use client";
import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header/Header";

// Main Prescription Component
function Prescription() {
  // Example data (mock data to represent patients and doctors)
  const { patients, doctors } = MockData();

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Nurse statistics such as active patients, pending tasks, medications due, and critical cases
  const nurseStats = {
    activePatients: 12,
    pendingTasks: 8,
    medicationsDue: 5,
    criticalCases: 2,
  };

  // List of assigned patients with their details like name, room, vitals, etc.
  const assignedPatients = [
    {
      id: "P1001",
      name: "John Smith",
      image: "/patient1.png",
      roomNumber: "201",
      lastVitals: { temp: "98.6°F", bp: "120/80", pulse: "72" },
      status: "Stable",
      nextAction: "Medication at 2:00 PM",
    },
    {
      id: "P1002",
      name: "Mary Johnson",
      image: "/patient2.png",
      roomNumber: "205",
      lastVitals: { temp: "99.1°F", bp: "130/85", pulse: "80" },
      status: "Critical",
      nextAction: "Check vitals in 30 mins",
    },
    {
      id: "P1003",
      name: "Robert Davis",
      image: "/patient3.png",
      roomNumber: "210",
      lastVitals: { temp: "98.2°F", bp: "118/75", pulse: "68" },
      status: "Stable",
      nextAction: "Doctor round at 3:00 PM",
    },
  ];

  // Upcoming tasks list with time, patient name, task action, priority, and type
  const upcomingTasks = [
    {
      time: "2:00 PM",
      patient: "John Smith",
      action: "Administer Pain Medication",
      priority: "Normal",
      type: "medication",
    },
    {
      time: "2:30 PM",
      patient: "Mary Johnson",
      action: "Check Vital Signs",
      priority: "High",
      type: "vitals",
    },
    {
      time: "3:00 PM",
      patient: "Robert Davis",
      action: "Assist Doctor Round",
      priority: "Normal",
      type: "doctor",
    },
  ];

  // Recent updates with time, patient, and update details
  const recentUpdates = [
    {
      type: "vitals",
      patient: "John Smith",
      time: "1:45 PM",
      detail: "BP: 120/80, Temp: 98.6°F",
    },
    {
      type: "medication",
      patient: "Mary Johnson",
      time: "1:30 PM",
      detail: "Administered Pain Medication",
    },
    {
      type: "order",
      patient: "Robert Davis",
      time: "1:15 PM",
      detail: "New diet order from Dr. Wilson",
    },
    {
      type: "request",
      patient: "James Smith",
      time: "1:00 PM",
      detail: "Requested pain assessment",
    },
  ];

  // Function to handle search term input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Function to get the current time in HH:MM format
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <Sidebar activePage="Nurse Dashboard" /> {/* Sidebar for navigation */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with search functionality and user info */}
        <Header
          onSearch={handleSearch}
          notificationCount={5}
          userName="Nurse Sarah"
          userImage="/default-avatar.png"
        />

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            {/* Displaying Nurse Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(nurseStats).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white p-6 rounded-xl shadow-sm border border-[#e1e8ff] relative overflow-hidden"
                >
                  <div
                    className={`w-16 h-16 rounded-full absolute -right-4 -top-4 opacity-50 ${
                      key === "activePatients"
                        ? "bg-blue-100"
                        : key === "pendingTasks"
                        ? "bg-yellow-100"
                        : key === "medicationsDue"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  />
                  <i
                    className={`fas ${
                      key === "activePatients"
                        ? "fa-user-injured text-[#2c4ecf]"
                        : key === "pendingTasks"
                        ? "fa-tasks text-yellow-600"
                        : key === "medicationsDue"
                        ? "fa-pills text-green-600"
                        : "fa-heartbeat text-red-600"
                    } text-2xl mb-4`}
                  ></i>
                  <h3 className="font-poppins text-lg font-semibold text-[#4a5568]">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </h3>
                  <p
                    className={`font-poppins text-2xl font-bold ${
                      key === "activePatients"
                        ? "text-[#2c4ecf]"
                        : key === "pendingTasks"
                        ? "text-yellow-600"
                        : key === "medicationsDue"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              {/* Current Patients Table */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#e1e8ff]">
                    <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf]">
                      Current Patients
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#f8faff]">
                        <tr>
                          <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                            Patient
                          </th>
                          <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                            Room
                          </th>
                          <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                            Last Vitals
                          </th>
                          <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                            Status
                          </th>
                          <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                            Next Due
                          </th>
                          <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignedPatients.map((patient) => (
                          <tr
                            key={patient.id}
                            className="border-t border-[#e1e8ff]"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <img
                                  src={patient.image}
                                  alt={patient.name}
                                  className="w-8 h-8 rounded-full mr-3"
                                />
                                <span className="font-poppins text-[#4a5568]">
                                  {patient.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-poppins text-[#4a5568]">
                              {patient.roomNumber}
                            </td>
                            <td className="px-6 py-4 font-poppins text-[#4a5568]">
                              {patient.lastVitals.temp}°C,{" "}
                              {patient.lastVitals.bp}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-poppins ${
                                  patient.status === "Critical"
                                    ? "bg-red-100 text-red-800"
                                    : patient.status === "Stable"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {patient.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-poppins text-[#4a5568]">
                              {patient.nextAction}
                            </td>
                            <td className="px-6 py-4 font-poppins text-[#2c4ecf] text-sm">
                              <button className="underline">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Upcoming Tasks Section */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#e1e8ff]">
                    <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf]">
                      Upcoming Tasks
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <ul className="divide-y divide-[#e1e8ff]">
                      {upcomingTasks.map((task, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center py-4 px-6"
                        >
                          <div>
                            <p className="font-poppins text-sm text-[#4a5568]">
                              {task.patient} - {task.action}
                            </p>
                            <p className="font-poppins text-xs text-[#4a5568]">
                              {task.time}
                            </p>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-poppins ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {task.priority}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Updates Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e1e8ff]">
                <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf]">
                  Recent Updates
                </h2>
              </div>
              <div className="overflow-x-auto">
                <ul className="divide-y divide-[#e1e8ff]">
                  {recentUpdates.map((update, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-4 px-6"
                    >
                      <div>
                        <p className="font-poppins text-sm text-[#4a5568]">
                          {update.patient} - {update.detail}
                        </p>
                        <p className="font-poppins text-xs text-[#4a5568]">
                          {update.time}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-poppins ${
                          update.type === "medication"
                            ? "bg-green-100 text-green-800"
                            : update.type === "vitals"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {update.type.charAt(0).toUpperCase() +
                          update.type.slice(1)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data function
function MockData() {
  return {
    patients: [
      // Add patient data here
    ],
    doctors: [
      // Add doctor data here
    ],
  };
}

export default Prescription;
