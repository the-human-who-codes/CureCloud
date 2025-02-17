"use client";
import { useState, useEffect } from "react";
import "prop-types/prop-types";
function NurseDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTask, setActiveTask] = useState(null);
  const [timer, setTimer] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const quickStats = dashboardData?.stats || {
    patientsUnderCare: 0,
    tasksForToday: 0,
    upcomingMedications: 0,
    criticalAlerts: 0,
  };

  const assignedPatients = dashboardData?.patients || [];
  const todaysTasks = dashboardData?.tasks || [];
  const shiftInfo = dashboardData?.shiftInfo || {
    currentShift: "",
    handoverNotes: "",
    teamMembers: [],
  };
  const upcomingMedications = dashboardData?.medications || [];
  const recentAlerts = dashboardData?.alerts || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;
    if (activeTask) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTask]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/get-dashboard-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDashboardData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        setError("Could not load dashboard data");
        setLoading(false);
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8faff]">
        <div className="text-[#2c4ecf] text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8faff]">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                  Nurse Dashboard
                </h1>
                <p className="font-poppins text-[#4a5568]">
                  {currentTime.toLocaleTimeString()} - {shiftInfo.currentShift}
                </p>
              </div>
              {activeTask && (
                <div className="bg-[#2c4ecf] text-white px-4 py-2 rounded-lg font-poppins">
                  <p className="text-sm">Current Task: {activeTask}</p>
                  <p className="text-xl font-bold">{formatTimer(timer)}</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(quickStats).map(([key, value]) => (
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
                          key === "patientsUnderCare"
                            ? "fa-hospital-user"
                            : key === "tasksForToday"
                            ? "fa-tasks"
                            : key === "upcomingMedications"
                            ? "fa-pills"
                            : "fa-exclamation-triangle"
                        } text-[#2c4ecf] text-xl`}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <AssignedPatientsSection patients={assignedPatients} />
                <TodayTasksSection
                  tasks={todaysTasks}
                  setActiveTask={setActiveTask}
                  setTimer={setTimer}
                />
                <ShiftInfoSection shiftInfo={shiftInfo} />
              </div>

              <div className="space-y-8">
                <QuickActionsSection />
                <RecentAlertsSection alerts={recentAlerts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const AssignedPatientsSection = ({ patients }) => {
  AssignedPatientsSection.propTypes = {
    patients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        room: PropTypes.string.isRequired,
        vitals: PropTypes.shape({
          bp: PropTypes.string.isRequired,
          hr: PropTypes.string.isRequired,
        }).isRequired,
        nextMed: PropTypes.string.isRequired,
        priority: PropTypes.oneOf(["Critical", "Stable", "Moderate"])
          .isRequired,
      })
    ).isRequired,
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Assigned Patients
      </h2>
      <div className="grid gap-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="flex items-center justify-between p-4 bg-[#f8faff] rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={patient.image}
                alt={patient.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-poppins font-medium text-[#2c4ecf]">
                  {patient.name}
                </p>
                <p className="font-poppins text-sm text-[#4a5568]">
                  Room {patient.room}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-sm">
                <p className="font-poppins text-[#4a5568]">
                  BP: {patient.vitals.bp}
                </p>
                <p className="font-poppins text-[#4a5568]">
                  HR: {patient.vitals.hr}
                </p>
              </div>
              <div className="text-sm">
                <p className="font-poppins text-[#4a5568]">
                  Next Med: {patient.nextMed}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-poppins ${
                    patient.priority === "Critical"
                      ? "bg-red-100 text-red-800"
                      : patient.priority === "Stable"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {patient.priority}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-[#2c4ecf] hover:bg-[#e1e8ff] rounded-lg">
                  <i className="fas fa-eye"></i>
                </button>
                <button className="p-2 text-[#2c4ecf] hover:bg-[#e1e8ff] rounded-lg">
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import PropTypes from "prop-types";

const TodayTasksSection = ({ tasks, setActiveTask, setTimer }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
    <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
      Today&apos;s Tasks
    </h2>
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 bg-[#f8faff] rounded-lg"
        >
          <div className="flex items-center">
            <p className="font-poppins text-[#2c4ecf]">{task.name}</p>
          </div>
          <button
            className="px-4 py-2 text-white bg-[#2c4ecf] rounded-lg"
            onClick={() => {
              setActiveTask(task.name);
              setTimer(0);
            }}
          >
            Start Task
          </button>
        </div>
      ))}
    </div>
  </div>
);

TodayTasksSection.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setActiveTask: PropTypes.func.isRequired,
  setTimer: PropTypes.func.isRequired,
};

const ShiftInfoSection = ({ shiftInfo }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
    <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
      Shift Information
    </h2>
    <p className="font-poppins text-[#4a5568]">{shiftInfo.handoverNotes}</p>
    <div className="mt-4">
      <h3 className="font-poppins text-sm font-semibold text-[#2c4ecf]">
        Team Members
      </h3>
      <ul className="list-disc pl-5">
        {shiftInfo.teamMembers.map((member, idx) => (
          <li key={idx} className="font-poppins text-[#4a5568]">
            {member}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

ShiftInfoSection.propTypes = {
  shiftInfo: PropTypes.shape({
    handoverNotes: PropTypes.string.isRequired,
    teamMembers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const QuickActionsSection = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
    <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
      Quick Actions
    </h2>
    <div className="space-y-4">
      <button className="w-full px-4 py-2 text-white bg-[#2c4ecf] rounded-lg">
        Record Vitals
      </button>
      <button className="w-full px-4 py-2 text-white bg-[#2c4ecf] rounded-lg">
        Administer Medication
      </button>
      <button className="w-full px-4 py-2 text-white bg-[#2c4ecf] rounded-lg">
        Call for Help
      </button>
    </div>
  </div>
);

const RecentAlertsSection = ({ alerts }) => {
  RecentAlertsSection.propTypes = {
    alerts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        level: PropTypes.oneOf(["Critical", "Warning", "Normal"]).isRequired,
      })
    ).isRequired,
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Recent Alerts
      </h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-4 bg-[#f8faff] rounded-lg"
          >
            <p className="font-poppins text-[#2c4ecf]">{alert.message}</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-poppins ${
                alert.level === "Critical"
                  ? "bg-red-100 text-red-800"
                  : alert.level === "Warning"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {alert.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NurseDashboard;
