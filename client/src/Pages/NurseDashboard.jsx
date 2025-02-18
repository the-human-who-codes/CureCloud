"use client";
import { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";
import QuickStats from "../Components/NurseDashboard/QuickStats";
import AssignedPatientsSection from "../Components/NurseDashboard/AssignedPatientsSection";
import TodayTasksSection from "../Components/NurseDashboard/TodayTasksSection";
import ShiftInfoSection from "../Components/NurseDashboard/ShiftInfoSection";
import QuickActionsSection from "../Components/NurseDashboard/QuickActionsSection";
import RecentAlertsSection from "../Components/NurseDashboard/RecentAlertsSection";
import { MockData } from "../data/MockData";

function NurseDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTask, setActiveTask] = useState(null);
  const [timer, setTimer] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    try {
      setDashboardData(MockData);
      setLoading(false);
    } catch (err) {
      setError("Could not load dashboard data");
      setLoading(false);
    }
  }, []);

  const handleSearch = (term) => setSearchTerm(term);
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (error) return <div className="error-screen">{error}</div>;

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <Sidebar userRole="nurse" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSearch={handleSearch} />
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <QuickStats stats={dashboardData?.stats} />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <AssignedPatientsSection patients={dashboardData?.patients} />
                <TodayTasksSection
                  tasks={dashboardData?.tasks}
                  setActiveTask={setActiveTask}
                  setTimer={setTimer}
                />
                <ShiftInfoSection shiftInfo={dashboardData?.shiftInfo} />
              </div>
              <div className="space-y-8">
                <QuickActionsSection />
                <RecentAlertsSection alerts={dashboardData?.alerts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NurseDashboard;
