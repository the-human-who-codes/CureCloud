"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFilter,
  faShare,
  faEllipsisH,
  faStar,
  faUsers,
  faCalendarCheck,
  faChartLine,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";

function ReportsAndAnalytics() {
  const [dateRange, setDateRange] = useState("week");
  const [reportType, setReportType] = useState("overview");
  const [isExporting, setIsExporting] = useState(false);

  const mockData = {
    overview: {
      totalPatients: 1248,
      activePatients: 856,
      newPatients: 124,
      avgDailyPatients: 45,
      patientGrowth: 12.5,
      totalAppointments: 892,
      completedAppointments: 745,
      cancelledAppointments: 147,
      revenue: 156789,
      revenueGrowth: 8.3,
    },
    patientMetrics: {
      genderDistribution: [
        { gender: "Male", count: 584, percentage: 46.8 },
        { gender: "Female", count: 652, percentage: 52.2 },
        { gender: "Other", count: 12, percentage: 1 },
      ],
      ageGroups: [
        { group: "0-17", count: 156 },
        { group: "18-30", count: 287 },
        { group: "31-50", count: 425 },
        { group: "51-70", count: 298 },
        { group: "71+", count: 82 },
      ],
      conditions: [
        { name: "Hypertension", count: 245 },
        { name: "Diabetes", count: 198 },
        { name: "Heart Disease", count: 156 },
        { name: "Respiratory", count: 134 },
        { name: "Arthritis", count: 112 },
      ],
    },
    departmentMetrics: [
      {
        department: "Cardiology",
        patients: 286,
        appointments: 312,
        revenue: 45600,
        satisfaction: 4.5,
      },
      {
        department: "Pediatrics",
        patients: 198,
        appointments: 245,
        revenue: 32400,
        satisfaction: 4.8,
      },
      {
        department: "Orthopedics",
        patients: 167,
        appointments: 198,
        revenue: 38900,
        satisfaction: 4.3,
      },
      {
        department: "Neurology",
        patients: 145,
        appointments: 167,
        revenue: 41200,
        satisfaction: 4.6,
      },
    ],
    appointmentMetrics: {
      daily: [45, 52, 49, 48, 51, 43, 47],
      status: [
        { status: "Completed", count: 745 },
        { status: "Cancelled", count: 147 },
        { status: "No Show", count: 68 },
      ],
      peakHours: [
        { hour: "9-10", count: 78 },
        { hour: "10-11", count: 92 },
        { hour: "11-12", count: 86 },
        { hour: "14-15", count: 74 },
        { hour: "15-16", count: 68 },
      ],
    },
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <></>

      <div className="flex-1 flex flex-col overflow-hidden">
        <></>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                  Reports & Analytics
                </h1>
                <p className="font-poppins text-[#4a5568]">
                  View detailed insights and statistics
                </p>
              </div>
              <button
                className={`px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins font-semibold hover:bg-[#2341b0] transition-colors duration-200 flex items-center gap-2 ${
                  isExporting ? "opacity-75 cursor-not-allowed" : ""
                }`}
                onClick={() => setIsExporting(true)}
                disabled={isExporting}
              >
                <FontAwesomeIcon icon={faDownload} />

                {isExporting ? "Exporting..." : "Export Report"}
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e1e8ff] mb-6">
              <div className="flex items-center justify-between overflow-auto">
                <div className="flex items-center gap-4">
                  <select
                    className="px-4 py-2 bg-[#f8faff] rounded-lg border border-[#e1e8ff] focus:ring-2 focus:ring-[#2c4ecf] focus:border-transparent"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                  <select
                    className="px-4 py-2 bg-[#f8faff] rounded-lg border border-[#e1e8ff] focus:ring-2 focus:ring-[#2c4ecf] focus:border-transparent"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="overview">Overview</option>
                    <option value="patients">Patient Analytics</option>
                    <option value="appointments">Appointment Analytics</option>
                    <option value="departments">Department Performance</option>
                    <option value="financial">Financial Reports</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
                    <FontAwesomeIcon icon={faFilter} />
                    More Filters
                  </button>
                  <button className="px-4 py-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
                    <FontAwesomeIcon icon={faShare} />
                    Share
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                {
                  title: "Total Patients",
                  value: mockData.overview.totalPatients,
                  change: "+12.5%",
                  icon: faUsers,
                  color: "blue",
                },
                {
                  title: "Appointments",
                  value: mockData.overview.totalAppointments,
                  change: "+8.2%",
                  icon: faCalendarCheck,
                  color: "green",
                },
                {
                  title: "Revenue",
                  value: `$${mockData.overview.revenue.toLocaleString()}`,
                  change: "+8.3%",
                  icon: faChartLine,
                  color: "purple",
                },
                {
                  title: "Patient Satisfaction",
                  value: "4.6",
                  change: "+0.3",
                  icon: faSmile,
                  color: "yellow",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-[#e1e8ff]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        card.color === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : card.color === "green"
                          ? "bg-green-100 text-green-600"
                          : card.color === "purple"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      <FontAwesomeIcon className={`text-xl`} icon={card.icon} />
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-poppins bg-green-100 text-green-800">
                      {card.change}
                    </span>
                  </div>
                  <h3 className="font-poppins text-[#4a5568] mb-1">
                    {card.title}
                  </h3>
                  <p className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-6 border border-[#e1e8ff]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-poppins font-semibold text-[#2c4ecf]">
                    Patient Demographics
                  </h3>
                  <button className="p-2 hover:bg-[#f8faff] rounded-lg text-[#4a5568]">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-poppins text-sm text-[#4a5568] mb-4">
                      Gender Distribution
                    </h4>
                    {mockData.patientMetrics.genderDistribution.map(
                      (item, index) => (
                        <div key={index} className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-poppins text-sm text-[#4a5568]">
                              {item.gender}
                            </span>
                            <span className="font-poppins text-sm font-medium">
                              {item.percentage}%
                            </span>
                          </div>
                          <div className="h-2 bg-[#f8faff] rounded-full">
                            <div
                              className="h-full bg-[#2c4ecf] rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div>
                    <h4 className="font-poppins text-sm text-[#4a5568] mb-4">
                      Age Distribution
                    </h4>
                    {mockData.patientMetrics.ageGroups.map((item, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-poppins text-sm text-[#4a5568]">
                            {item.group}
                          </span>
                          <span className="font-poppins text-sm font-medium">
                            {item.count}
                          </span>
                        </div>
                        <div className="h-2 bg-[#f8faff] rounded-full">
                          <div
                            className="h-full bg-[#2c4ecf] rounded-full"
                            style={{
                              width: `${
                                (item.count / mockData.overview.totalPatients) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[#e1e8ff]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-poppins font-semibold text-[#2c4ecf]">
                    Appointment Analytics
                  </h3>
                  <button className="p-2 hover:bg-[#f8faff] rounded-lg text-[#4a5568]">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-poppins text-sm text-[#4a5568] mb-4">
                      Appointment Status
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {mockData.appointmentMetrics.status.map((item, index) => (
                        <div
                          key={index}
                          className="bg-[#f8faff] rounded-lg p-4 text-center"
                        >
                          <p className="font-poppins text-2xl font-bold text-[#2c4ecf] mb-1">
                            {item.count}
                          </p>
                          <p className="font-poppins text-sm text-[#4a5568]">
                            {item.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-poppins text-sm text-[#4a5568] mb-4">
                      Peak Hours
                    </h4>
                    <div className="flex items-end gap-2 h-32">
                      {mockData.appointmentMetrics.peakHours.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex-1 flex flex-col items-center"
                          >
                            <div
                              className="w-full bg-[#2c4ecf] rounded-t-lg transition-all duration-300"
                              style={{ height: `${(item.count / 100) * 100}%` }}
                            ></div>
                            <p className="font-poppins text-xs text-[#4a5568] mt-2">
                              {item.hour}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#e1e8ff]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-poppins font-semibold text-[#2c4ecf]">
                  Department Performance
                </h3>
                <button className="p-2 hover:bg-[#f8faff] rounded-lg text-[#4a5568]">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f8faff]">
                    <tr>
                      <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                        Department
                      </th>
                      <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                        Patients
                      </th>
                      <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                        Appointments
                      </th>
                      <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                        Revenue
                      </th>
                      <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                        Satisfaction
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.departmentMetrics.map((dept, index) => (
                      <tr key={index} className="border-t border-[#e1e8ff]">
                        <td className="px-6 py-4">
                          <p className="font-poppins font-medium text-[#2c4ecf]">
                            {dept.department}
                          </p>
                        </td>
                        <td className="px-6 py-4 font-poppins text-[#4a5568]">
                          {dept.patients}
                        </td>
                        <td className="px-6 py-4 font-poppins text-[#4a5568]">
                          {dept.appointments}
                        </td>
                        <td className="px-6 py-4 font-poppins text-[#4a5568]">
                          ${dept.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center text-yellow-400">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FontAwesomeIcon
                                  key={star}
                                  icon={faStar}
                                  className={`fas fa-star ${
                                    star <= dept.satisfaction
                                      ? "text-yellow-400"
                                      : "text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-poppins text-sm text-[#4a5568]">
                              {dept.satisfaction}
                            </span>
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
    </div>
  );
}

export default ReportsAndAnalytics;
