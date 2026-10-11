import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarAlt,
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { PageHeader, PageShell } from "../common/PageShell";
import StatusBadge from "../common/StatusBadge";
import { StatGrid } from "../common/StatCard";
import { longDate } from "../../utils/format";
import { Card } from "../common/Card";

const STAT_ICONS = {
  dueNow: faClock,
  upcoming: faCalendarAlt,
  completed: faCheckCircle,
  alerts: faExclamationTriangle,
};

const STAT_TONES = {
  dueNow: "danger",
  completed: "success",
  alerts: "warning",
};

function Medications() {
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

  const { dueNow, upcoming, completed, alerts } = mockData.medicationSummary;
  const summaryStats = { dueNow, upcoming, completed, alerts };

  return (
    <PageShell>
      <PageHeader
        title="Medication Administration"
        subtitle={longDate()}
        actions={
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 bg-surface border border-line rounded-lg font-poppins text-ink"
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="week">This Week</option>
          </select>
        }
      />

      <StatGrid stats={summaryStats} icons={STAT_ICONS} tones={STAT_TONES} />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Card className="mb-8">
            <div className="flex gap-4 mb-6">
              {Object.keys(mockData.scheduleGroups).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-poppins ${
                    selectedPeriod === period
                      ? "bg-primary text-white"
                      : "bg-surface text-ink"
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
                    className="bg-surface rounded-lg p-4 border border-line"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <img
                          src={med.patient.photo}
                          alt={med.patient.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-poppins font-semibold text-primary">
                            {med.patient.name}
                          </p>
                          <p className="font-poppins text-sm text-ink">
                            Room {med.patient.room}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={med.status}>{med.time}</StatusBadge>
                    </div>
                    <div className="mb-3">
                      <p className="font-poppins font-semibold text-ink">
                        {med.medication} - {med.dosage}
                      </p>
                      <p className="font-poppins text-sm text-ink">
                        {med.route} | {med.instructions}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-primary text-white rounded font-poppins text-sm">
                        Mark Given
                      </button>
                      <button className="px-3 py-1 bg-surface text-ink border border-line rounded font-poppins text-sm">
                        Reschedule
                      </button>
                      <button className="px-3 py-1 bg-surface text-ink border border-line rounded font-poppins text-sm">
                        Details
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </Card>
        </div>

        <div className="lg:w-[400px] space-y-8">
          <Card title="Active Alerts">
            <div className="space-y-4">
              {mockData.alerts.map((alert, index) => (
                <div
                  key={index}
                  className="bg-surface rounded-lg p-4 border border-line"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className={
                        alert.severity === "high"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }
                    />
                    <span className="font-poppins font-semibold text-ink">
                      {alert.patient}
                    </span>
                  </div>
                  <p className="font-poppins text-sm text-ink mb-2">
                    {alert.description}
                  </p>
                  <p className="font-poppins text-sm text-primary">
                    Action: {alert.action}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Recent Administrations">
            <div className="space-y-4">
              {mockData.recentAdministrations.map((admin) => (
                <div
                  key={admin.id}
                  className="bg-surface rounded-lg p-4 border border-line"
                >
                  <p className="font-poppins font-semibold text-ink">
                    {admin.patient}
                  </p>
                  <p className="font-poppins text-sm text-ink">
                    {admin.medication} {admin.dosage}
                  </p>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="font-poppins text-ink">
                      {new Date(admin.givenAt).toLocaleTimeString()}
                    </span>
                    <span className="font-poppins text-primary">
                      {admin.givenBy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

export default Medications;
