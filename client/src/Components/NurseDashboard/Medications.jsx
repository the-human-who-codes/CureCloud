"use client";
import { useState } from "react";

function Medications() {
  //   const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [selectedPeriod, setSelectedPeriod] = useState("morning");

  const mockData = {
    medicationSummary: {
      dueNow: 4,
      upcoming: 8,
      completed: 16,
      total: 28,
      alerts: 2,
    },
    scheduleGroups: {
      morning: {
        label: "Morning (6AM - 12PM)",
        medications: [
          {
            id: 1,
            patient: {
              name: "John Smith",
              photo: "/default-avatar.png",
              room: "201A",
              status: "stable",
            },
            medication: "Lisinopril",
            dosage: "10mg",
            route: "Oral",
            time: "8:00 AM",
            instructions: "Take with food",
            status: "pending",
            priority: "high",
          },
        ],
      },
      afternoon: {
        label: "Afternoon (12PM - 6PM)",
        medications: [],
      },
      evening: {
        label: "Evening (6PM - 12AM)",
        medications: [],
      },
      night: {
        label: "Night (12AM - 6AM)",
        medications: [],
      },
    },
    alerts: [
      {
        type: "interaction",
        severity: "high",
        patient: "Sarah Johnson",
        description:
          "Potential interaction between Warfarin and new antibiotics",
        action: "Verify with physician",
      },
      {
        type: "allergy",
        severity: "high",
        patient: "Michael Brown",
        description: "Documented penicillin allergy",
        action: "Use alternative antibiotic",
      },
    ],
    recentAdministrations: [
      {
        id: 101,
        patient: "Emma Wilson",
        medication: "Metoprolol",
        dosage: "25mg",
        givenAt: "2024-01-20T08:15:00Z",
        givenBy: "Nurse Anderson",
        notes: "Patient reported no side effects",
      },
    ],
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <></>

      <div className="flex-1 flex flex-col overflow-hidden">
        <></>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                  Medication Administration
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
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 bg-[#f8faff] border border-[#e1e8ff] rounded-lg font-poppins text-[#4a5568]"
              >
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="week">This Week</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-poppins text-[#4a5568] text-sm">
                      Due Now
                    </p>
                    <p className="font-poppins text-2xl font-bold text-[#dc2626]">
                      {mockData.medicationSummary.dueNow}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <i className="fas fa-clock text-[#dc2626] text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-poppins text-[#4a5568] text-sm">
                      Upcoming
                    </p>
                    <p className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                      {mockData.medicationSummary.upcoming}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#f8faff] flex items-center justify-center">
                    <i className="fas fa-calendar-alt text-[#2c4ecf] text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-poppins text-[#4a5568] text-sm">
                      Completed
                    </p>
                    <p className="font-poppins text-2xl font-bold text-[#059669]">
                      {mockData.medicationSummary.completed}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                    <i className="fas fa-check-circle text-[#059669] text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-poppins text-[#4a5568] text-sm">
                      Alerts
                    </p>
                    <p className="font-poppins text-2xl font-bold text-[#eab308]">
                      {mockData.medicationSummary.alerts}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center">
                    <i className="fas fa-exclamation-triangle text-[#eab308] text-xl"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6 mb-8">
                  <div className="flex gap-4 mb-6">
                    {Object.keys(mockData.scheduleGroups).map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-4 py-2 rounded-lg font-poppins ${
                          selectedPeriod === period
                            ? "bg-[#2c4ecf] text-white"
                            : "bg-[#f8faff] text-[#4a5568]"
                        }`}
                      >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {mockData.scheduleGroups[selectedPeriod].medications.map(
                      (med) => (
                        <div
                          key={med.id}
                          className="bg-[#f8faff] rounded-lg p-4 border border-[#e1e8ff]"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <img
                                src={med.patient.photo}
                                alt={med.patient.name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <p className="font-poppins font-semibold text-[#2c4ecf]">
                                  {med.patient.name}
                                </p>
                                <p className="font-poppins text-sm text-[#4a5568]">
                                  Room {med.patient.room}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-poppins ${
                                med.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : med.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {med.time}
                            </span>
                          </div>
                          <div className="mb-3">
                            <p className="font-poppins font-semibold text-[#4a5568]">
                              {med.medication} - {med.dosage}
                            </p>
                            <p className="font-poppins text-sm text-[#4a5568]">
                              {med.route} | {med.instructions}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-[#2c4ecf] text-white rounded font-poppins text-sm">
                              Mark Given
                            </button>
                            <button className="px-3 py-1 bg-[#f8faff] text-[#4a5568] border border-[#e1e8ff] rounded font-poppins text-sm">
                              Reschedule
                            </button>
                            <button className="px-3 py-1 bg-[#f8faff] text-[#4a5568] border border-[#e1e8ff] rounded font-poppins text-sm">
                              Details
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:w-[400px] space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                    Active Alerts
                  </h2>
                  <div className="space-y-4">
                    {mockData.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className="bg-[#f8faff] rounded-lg p-4 border border-[#e1e8ff]"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <i
                            className={`fas fa-exclamation-triangle text-${
                              alert.severity === "high" ? "red" : "yellow"
                            }-500`}
                          ></i>
                          <span className="font-poppins font-semibold text-[#4a5568]">
                            {alert.patient}
                          </span>
                        </div>
                        <p className="font-poppins text-sm text-[#4a5568] mb-2">
                          {alert.description}
                        </p>
                        <p className="font-poppins text-sm text-[#2c4ecf]">
                          Action: {alert.action}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                    Recent Administrations
                  </h2>
                  <div className="space-y-4">
                    {mockData.recentAdministrations.map((admin) => (
                      <div
                        key={admin.id}
                        className="bg-[#f8faff] rounded-lg p-4 border border-[#e1e8ff]"
                      >
                        <p className="font-poppins font-semibold text-[#4a5568]">
                          {admin.patient}
                        </p>
                        <p className="font-poppins text-sm text-[#4a5568]">
                          {admin.medication} {admin.dosage}
                        </p>
                        <div className="flex justify-between items-center mt-2 text-sm">
                          <span className="font-poppins text-[#4a5568]">
                            {new Date(admin.givenAt).toLocaleTimeString()}
                          </span>
                          <span className="font-poppins text-[#2c4ecf]">
                            {admin.givenBy}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Medications;
