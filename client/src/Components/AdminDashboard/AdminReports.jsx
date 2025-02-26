/* eslint-disable no-unused-vars */
"use client";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxes,
  faChartBar,
  faChartLine,
  faCheckCircle,
  faClock,
  faDownload,
  faFileAlt,
  faFileMedical,
  faHospital,
  faShareAlt,
  faTrash,
  faUserInjured,
  faUserMd,
} from "@fortawesome/free-solid-svg-icons";

function AdminReports() {
  const [selectedDateRange, setSelectedDateRange] = useState("week");
  const [selectedReportType, setSelectedReportType] = useState("all");
  const [generatingReport, setGeneratingReport] = useState(false);
  //   const [searchTerm, setSearchTerm] = useState("");

  const mockReportStats = {
    totalReports: 156,
    pendingReports: 12,
    completedToday: 34,
    sharedReports: 89,
  };

  const mockRecentReports = [
    {
      id: "REP001",
      name: "Monthly Patient Statistics",
      type: "Patient Analytics",
      generatedBy: "Dr. Sarah Wilson",
      date: "2024-02-20T10:30:00",
      status: "completed",
      downloads: 45,
      size: "2.4 MB",
    },
    {
      id: "REP002",
      name: "Department Performance Q1",
      type: "Department Analytics",
      generatedBy: "Admin Mary Johnson",
      date: "2024-02-19T15:45:00",
      status: "completed",
      downloads: 32,
      size: "4.1 MB",
    },
    {
      id: "REP003",
      name: "Staff Attendance Report",
      type: "HR Analytics",
      generatedBy: "HR Manager Tom Brown",
      date: "2024-02-19T09:15:00",
      status: "pending",
      downloads: 0,
      size: "1.8 MB",
    },
    {
      id: "REP004",
      name: "Equipment Utilization",
      type: "Resource Analytics",
      generatedBy: "Dr. James Brown",
      date: "2024-02-18T16:20:00",
      status: "completed",
      downloads: 28,
      size: "3.2 MB",
    },
    {
      id: "REP005",
      name: "Financial Summary",
      type: "Financial Analytics",
      generatedBy: "Finance Dir. Emma Davis",
      date: "2024-02-18T14:30:00",
      status: "processing",
      downloads: 0,
      size: "5.6 MB",
    },
  ];

  const reportTemplates = [
    {
      id: "TEMP001",
      name: "Patient Statistics",
      description:
        "Comprehensive patient data analysis including demographics, admissions, and treatment outcomes",
      icon: faUserInjured,
    },
    {
      id: "TEMP002",
      name: "Department Performance",
      description:
        "Department-wise analysis of efficiency, resource utilization, and patient satisfaction",
      icon: faHospital,
    },
    {
      id: "TEMP003",
      name: "Staff Analytics",
      description:
        "Staff performance metrics, attendance patterns, and workload distribution",
      icon: faUserMd,
    },
    {
      id: "TEMP004",
      name: "Financial Report",
      description:
        "Revenue analysis, expense tracking, and budget utilization reports",
      icon: faChartLine,
    },
    {
      id: "TEMP005",
      name: "Resource Utilization",
      description:
        "Analysis of equipment usage, inventory levels, and resource allocation",
      icon: faBoxes,
    },
    {
      id: "TEMP006",
      name: "Quality Metrics",
      description:
        "Healthcare quality indicators, patient satisfaction scores, and compliance metrics",
      icon: faChartBar,
    },
  ];

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <></>

      <div className="flex-1 flex flex-col overflow-hidden">
        <></>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex  justify-between items-center text-center mb-8">
              <div className="flex-auto">
                <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                  Reports Dashboard
                </h1>
                <p className="font-poppins text-[#4a5568]">
                  Generate and manage hospital reports and analytics
                </p>
              </div>
              <button
                className="px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins font-semibold hover:bg-[#2341b0] transition-colors duration-200 flex items-center "
                onClick={() => setGeneratingReport(true)}
              >
                <FontAwesomeIcon icon={faFileMedical} className="fas mr-2" />
                Generate New Report
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(mockReportStats).map(([key, value]) => (
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
                          key === "totalReports"
                            ? faFileAlt
                            : key === "pendingReports"
                            ? faClock
                            : key === "completedToday"
                            ? faCheckCircle
                            : faShareAlt
                        }
                        className={`fas text-[#2c4ecf] text-xl`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                Report Templates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff] hover:border-[#2c4ecf] transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#f8faff] flex items-center justify-center">
                        <FontAwesomeIcon
                          className={`fas text-[#2c4ecf] text-xl`}
                          icon={template.icon}
                        />
                      </div>
                      <div>
                        <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf]">
                          {template.name}
                        </h3>
                        <p className="font-poppins text-sm text-[#4a5568] mt-1">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
              <div className="p-6 border-b border-[#e1e8ff]">
                <div className="flex justify-between items-center">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf]">
                    Recent Reports
                  </h2>
                  <div className="flex gap-4">
                    <select
                      className="px-4 py-2 rounded-lg border border-[#e1e8ff] focus:border-[#2c4ecf] focus:ring-1 focus:ring-[#2c4ecf] font-poppins text-sm"
                      value={selectedDateRange}
                      onChange={(e) => setSelectedDateRange(e.target.value)}
                    >
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">This Quarter</option>
                    </select>
                    <select
                      className="px-4 py-2 rounded-lg border border-[#e1e8ff] focus:border-[#2c4ecf] focus:ring-1 focus:ring-[#2c4ecf] font-poppins text-sm"
                      value={selectedReportType}
                      onChange={(e) => setSelectedReportType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="patient">Patient Analytics</option>
                      <option value="department">Department Analytics</option>
                      <option value="hr">HR Analytics</option>
                      <option value="financial">Financial Analytics</option>
                    </select>
                  </div>
                </div>
              </div>
              <table className="w-full">
                <thead className="bg-[#f8faff]">
                  <tr>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Report Name
                    </th>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Type
                    </th>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Generated By
                    </th>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Date
                    </th>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Status
                    </th>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Downloads
                    </th>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentReports.map((report) => (
                    <tr key={report.id} className="border-t border-[#e1e8ff]">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={faFileAlt}
                            className="fa text-[#4a5568] mr-2 "
                          />
                          <div>
                            <p className="font-poppins text-[#2c4ecf] font-semibold">
                              {report.name}
                            </p>
                            <p className="font-poppins text-xs text-[#4a5568]">
                              {report.size}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-poppins text-[#4a5568]">
                        {report.type}
                      </td>
                      <td className="px-6 py-4 font-poppins text-[#4a5568]">
                        {report.generatedBy}
                      </td>
                      <td className="px-6 py-4 font-poppins text-[#4a5568]">
                        {new Date(report.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-poppins ${
                            report.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : report.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {report.status.charAt(0).toUpperCase() +
                            report.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-poppins text-[#4a5568]">
                        {report.downloads}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg"
                            title="Download"
                            disabled={report.status !== "completed"}
                          >
                            <FontAwesomeIcon icon={faDownload} />
                          </button>
                          <button
                            className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg"
                            title="Share"
                          >
                            <FontAwesomeIcon icon={faShareAlt} />
                          </button>
                          <button
                            className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg"
                            title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
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
  );
}

export default AdminReports;
