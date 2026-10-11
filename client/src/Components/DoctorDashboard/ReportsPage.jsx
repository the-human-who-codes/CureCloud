import PropTypes from "prop-types";
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
import { PageHeader, PageShell } from "../common/PageShell";
import TableHead from "../common/TableHead";
import StatusBadge from "../common/StatusBadge";
import { Button, IconButton } from "../common/Button";

const ICON_COLOURS = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  yellow: "bg-yellow-100 text-yellow-600",
};

// White panel with a title and an overflow menu button.
function ReportPanel({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-line">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-poppins font-semibold text-primary">{title}</h3>
        <IconButton icon={faEllipsisH} />
      </div>
      {children}
    </div>
  );
}

ReportPanel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Label, value and a horizontal bar filled to `percent`.
function ProgressRow({ label, value, percent }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="font-poppins text-sm text-ink">{label}</span>
        <span className="font-poppins text-sm font-medium">{value}</span>
      </div>
      <div className="h-2 bg-surface rounded-full">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}

ProgressRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percent: PropTypes.number.isRequired,
};

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
    <PageShell>
      <PageHeader
        title="Reports & Analytics"
        subtitle="View detailed insights and statistics"
        actions={
          <Button
            icon={faDownload}
            onClick={() => setIsExporting(true)}
            disabled={isExporting}
          >
            {isExporting ? "Exporting..." : "Export Report"}
          </Button>
        }
      />

      <div className="bg-white rounded-xl p-4 shadow-sm border border-line mb-6">
        <div className="flex items-center justify-between overflow-auto">
          <div className="flex items-center gap-4">
            <select
              className="px-4 py-2 bg-surface rounded-lg border border-line focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="px-4 py-2 bg-surface rounded-lg border border-line focus:ring-2 focus:ring-primary focus:border-transparent"
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
            <button className="px-4 py-2 text-ink hover:bg-surface rounded-lg">
              <FontAwesomeIcon icon={faFilter} />
              More Filters
            </button>
            <button className="px-4 py-2 text-ink hover:bg-surface rounded-lg">
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
            className="bg-white rounded-xl p-6 border border-line"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  ICON_COLOURS[card.color]
                }`}
              >
                <FontAwesomeIcon className="text-xl" icon={card.icon} />
              </div>
              <StatusBadge tone="success" size="sm">
                {card.change}
              </StatusBadge>
            </div>
            <h3 className="font-poppins text-ink mb-1">{card.title}</h3>
            <p className="font-poppins text-2xl font-bold text-primary">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ReportPanel title="Patient Demographics">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-poppins text-sm text-ink mb-4">
                Gender Distribution
              </h4>
              {mockData.patientMetrics.genderDistribution.map((item) => (
                <ProgressRow
                  key={item.gender}
                  label={item.gender}
                  value={`${item.percentage}%`}
                  percent={item.percentage}
                />
              ))}
            </div>
            <div>
              <h4 className="font-poppins text-sm text-ink mb-4">
                Age Distribution
              </h4>
              {mockData.patientMetrics.ageGroups.map((item) => (
                <ProgressRow
                  key={item.group}
                  label={item.group}
                  value={item.count}
                  percent={(item.count / mockData.overview.totalPatients) * 100}
                />
              ))}
            </div>
          </div>
        </ReportPanel>

        <ReportPanel title="Appointment Analytics">
          <div className="space-y-6">
            <div>
              <h4 className="font-poppins text-sm text-ink mb-4">
                Appointment Status
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {mockData.appointmentMetrics.status.map((item, index) => (
                  <div
                    key={index}
                    className="bg-surface rounded-lg p-4 text-center"
                  >
                    <p className="font-poppins text-2xl font-bold text-primary mb-1">
                      {item.count}
                    </p>
                    <p className="font-poppins text-sm text-ink">
                      {item.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-poppins text-sm text-ink mb-4">Peak Hours</h4>
              <div className="flex items-end gap-2 h-32">
                {mockData.appointmentMetrics.peakHours.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-primary rounded-t-lg transition-all duration-300"
                      style={{ height: `${(item.count / 100) * 100}%` }}
                    ></div>
                    <p className="font-poppins text-xs text-ink mt-2">
                      {item.hour}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ReportPanel>
      </div>

      <ReportPanel title="Department Performance">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHead
              columns={[
                "Department",
                "Patients",
                "Appointments",
                "Revenue",
                "Satisfaction",
              ]}
            />
            <tbody>
              {mockData.departmentMetrics.map((dept, index) => (
                <tr key={index} className="border-t border-line">
                  <td className="px-6 py-4">
                    <p className="font-poppins font-medium text-primary">
                      {dept.department}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-poppins text-ink">
                    {dept.patients}
                  </td>
                  <td className="px-6 py-4 font-poppins text-ink">
                    {dept.appointments}
                  </td>
                  <td className="px-6 py-4 font-poppins text-ink">
                    ${dept.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FontAwesomeIcon
                            key={star}
                            icon={faStar}
                            className={`${
                              star <= dept.satisfaction
                                ? "text-yellow-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-poppins text-sm text-ink">
                        {dept.satisfaction}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReportPanel>
    </PageShell>
  );
}

export default ReportsAndAnalytics;
