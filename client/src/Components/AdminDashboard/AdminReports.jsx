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
import { PageHeader, PageShell } from "../common/PageShell";
import TableHead from "../common/TableHead";
import StatusBadge from "../common/StatusBadge";
import { StatGrid } from "../common/StatCard";
import { Button, IconButton } from "../common/Button";
import { Card, SectionTitle } from "../common/Card";

const STAT_ICONS = {
  totalReports: faFileAlt,
  pendingReports: faClock,
  completedToday: faCheckCircle,
  sharedReports: faShareAlt,
};

function AdminReports() {
  const [selectedDateRange, setSelectedDateRange] = useState("week");
  const [selectedReportType, setSelectedReportType] = useState("all");

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
    <PageShell>
      <PageHeader
        title="Reports Dashboard"
        subtitle="Generate and manage hospital reports and analytics"
        centered
        actions={<Button icon={faFileMedical}>Generate New Report</Button>}
      />

      <StatGrid stats={mockReportStats} icons={STAT_ICONS} />

      <div className="mb-8">
        <SectionTitle>Report Templates</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-line hover:border-primary transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
                  <FontAwesomeIcon
                    className="text-primary text-xl"
                    icon={template.icon}
                  />
                </div>
                <div>
                  <h3 className="font-poppins text-lg font-semibold text-primary">
                    {template.name}
                  </h3>
                  <p className="font-poppins text-sm text-ink mt-1">
                    {template.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card padded={false}>
        <div className="p-6 border-b border-line">
          <div className="flex justify-between items-center">
            <SectionTitle className="">Recent Reports</SectionTitle>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins text-sm"
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins text-sm"
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
          <TableHead
            columns={[
              "Report Name",
              "Type",
              "Generated By",
              "Date",
              "Status",
              "Downloads",
              "Actions",
            ]}
          />
          <tbody>
            {mockRecentReports.map((report) => (
              <tr key={report.id} className="border-t border-line">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="text-ink mr-2"
                    />
                    <div>
                      <p className="font-poppins text-primary font-semibold">
                        {report.name}
                      </p>
                      <p className="font-poppins text-xs text-ink">
                        {report.size}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-poppins text-ink">
                  {report.type}
                </td>
                <td className="px-6 py-4 font-poppins text-ink">
                  {report.generatedBy}
                </td>
                <td className="px-6 py-4 font-poppins text-ink">
                  {new Date(report.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={report.status} />
                </td>
                <td className="px-6 py-4 font-poppins text-ink">
                  {report.downloads}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <IconButton
                      icon={faDownload}
                      title="Download"
                      disabled={report.status !== "completed"}
                    />
                    <IconButton icon={faShareAlt} title="Share" />
                    <IconButton icon={faTrash} title="Delete" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </PageShell>
  );
}

export default AdminReports;
