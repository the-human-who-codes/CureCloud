/* eslint-disable no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar";
import QuickStats from "./QuickStats";
import AssignedPatientsSection from "./AssignedPatientsSection";
import TodayTasksSection from "./TodayTasksSection";
import ShiftInfoSection from "./ShiftInfoSection";
import QuickActionsSection from "./QuickActionsSection";
import RecentAlertsSection from "./RecentAlertsSection";
import { MockData } from "../../data/MockData";

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
      setError("Could not load dashboard data\nerro:" + err);
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (error) return <div className="error-screen">{error}</div>;

  return (
    <div className="flex h-screen bg-[#f8faff]">
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
  );
}

export default NurseDashboard;
