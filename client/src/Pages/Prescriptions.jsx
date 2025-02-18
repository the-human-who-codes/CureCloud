import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header/Header";
import { MockData } from "../data/MockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserInjured,
  faTasks,
  faPills,
  faHeartbeat,
  faFileMedical,
  faSyncAlt,
  faBell,
  faNotesMedical,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

function Prescriptions() {
  const { patients, doctors } = MockData;
  const [searchTerm, setSearchTerm] = useState("");

  const nurseStats = {
    activePatients: 12,
    pendingTasks: 8,
    medicationsDue: 5,
    criticalCases: 2,
  };

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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <Sidebar activePage="Nurse Dashboard" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onSearch={handleSearch}
          notificationCount={5}
          userName="Nurse Sarah"
          userImage="/default-avatar.png"
        />

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
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
                  <FontAwesomeIcon
                    icon={
                      key === "activePatients"
                        ? faUserInjured
                        : key === "pendingTasks"
                        ? faTasks
                        : key === "medicationsDue"
                        ? faPills
                        : faHeartbeat
                    }
                    className={`text-2xl mb-4 ${
                      key === "activePatients"
                        ? "text-[#2c4ecf]"
                        : key === "pendingTasks"
                        ? "text-yellow-600"
                        : key === "medicationsDue"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  />
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

            <div className="flex flex-col lg:flex-row gap-6 mb-8">
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
                            <td className="px-6 py-4">
                              <button className="text-[#2c4ecf] hover:text-[#1a3baf] mr-3">
                                <FontAwesomeIcon icon={faFileMedical} />
                              </button>
                              <button className="text-[#2c4ecf] hover:text-[#1a3baf]">
                                <FontAwesomeIcon icon={faPills} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3">
                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff]">
                  <div className="px-6 py-4 border-b border-[#e1e8ff] flex justify-between items-center">
                    <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf]">
                      Upcoming Tasks
                    </h2>
                    <span className="font-poppins text-sm text-[#4a5568]">
                      {getCurrentTime()}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {upcomingTasks.map((task, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-16 font-poppins text-sm text-[#4a5568]">
                            {task.time}
                          </div>
                          <div
                            className={`flex-grow pl-4 ml-4 border-l-2 ${
                              task.type === "medication"
                                ? "border-blue-400"
                                : task.type === "vitals"
                                ? "border-green-400"
                                : "border-yellow-400"
                            }`}
                          >
                            <p className="font-poppins font-medium text-[#4a5568]">
                              {task.patient}
                            </p>
                            <p className="font-poppins text-sm text-[#718096]">
                              {task.action}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf]">
                  Recent Updates
                </h2>
                <button className="text-[#2c4ecf]">
                  <FontAwesomeIcon icon={faSyncAlt} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="bg-[#f8faff] p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FontAwesomeIcon
                        icon={
                          update.type === "vitals"
                            ? faHeartbeat
                            : update.type === "medication"
                            ? faPills
                            : update.type === "order"
                            ? faFileMedical
                            : faBell
                        }
                        className={
                          update.type === "vitals"
                            ? "text-blue-500 mr-3"
                            : update.type === "medication"
                            ? "text-green-500 mr-3"
                            : update.type === "order"
                            ? "text-yellow-500 mr-3"
                            : "text-red-500 mr-3"
                        }
                      />
                      <span className="font-poppins text-sm text-[#4a5568]">
                        {update.time}
                      </span>
                    </div>
                    <p className="font-poppins font-medium text-[#4a5568] mb-1">
                      {update.patient}
                    </p>
                    <p className="font-poppins text-sm text-[#718096]">
                      {update.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fixed bottom-6 right-6 flex flex-col gap-4 md:flex-row">
              <button className="bg-[#2c4ecf] text-white rounded-full w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-2 flex items-center justify-center shadow-lg hover:bg-[#1a3baf]">
                <FontAwesomeIcon icon={faFileMedical} className="md:mr-2" />
                <span className="hidden md:inline font-poppins">
                  Record Vitals
                </span>
              </button>
              <button className="bg-green-500 text-white rounded-full w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-2 flex items-center justify-center shadow-lg hover:bg-green-600">
                <FontAwesomeIcon icon={faPills} className="md:mr-2" />
                <span className="hidden md:inline font-poppins">
                  Give Medication
                </span>
              </button>
              <button className="bg-yellow-500 text-white rounded-full w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-2 flex items-center justify-center shadow-lg hover:bg-yellow-600">
                <FontAwesomeIcon icon={faNotesMedical} className="md:mr-2" />
                <span className="hidden md:inline font-poppins">Add Notes</span>
              </button>
              <button className="bg-red-500 text-white rounded-full w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-2 flex items-center justify-center shadow-lg hover:bg-red-600">
                <FontAwesomeIcon icon={faPhone} className="md:mr-2" />
                <span className="hidden md:inline font-poppins">
                  Call Doctor
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prescriptions;
