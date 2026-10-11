import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faNotesMedical,
  faEye,
  faPills,
  faClipboardCheck,
  faFileMedical,
  faCommentMedical,
} from "@fortawesome/free-solid-svg-icons";
import { PageHeader, PageShell } from "../common/PageShell";
import StatusBadge from "../common/StatusBadge";
import { Card } from "../common/Card";
import InitialsAvatar from "../common/InitialsAvatar";

function MyPatients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const mockPatients = [
    {
      id: 1,
      name: "Sarah Johnson",
      photo: "/patient1.png",
      room: "201A",
      vitals: {
        temperature: "98.6°F",
        bloodPressure: "120/80",
        heartRate: "72 bpm",
      },
      status: "stable",
      lastMedication: "2025-02-20T08:30:00",
      nextCheck: "2025-02-20T14:30:00",
    },
    {
      id: 2,
      name: "Michael Chen",
      photo: "/patient2.png",
      room: "205B",
      vitals: {
        temperature: "99.2°F",
        bloodPressure: "135/85",
        heartRate: "88 bpm",
      },
      status: "needs-attention",
      lastMedication: "2025-02-20T09:15:00",
      nextCheck: "2025-02-20T13:15:00",
    },
    {
      id: 3,
      name: "Emily Brown",
      photo: "/patient3.png",
      room: "210A",
      vitals: {
        temperature: "101.3°F",
        bloodPressure: "145/95",
        heartRate: "96 bpm",
      },
      status: "critical",
      lastMedication: "2025-02-20T10:00:00",
      nextCheck: "2025-02-20T12:00:00",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      type: "medication",
      patient: "Sarah Johnson",
      time: "14:30",
      priority: "normal",
      description: "Administer 500mg Acetaminophen",
    },
    {
      id: 2,
      type: "check",
      patient: "Michael Chen",
      time: "13:15",
      priority: "high",
      description: "Blood pressure check",
    },
    {
      id: 3,
      type: "medication",
      patient: "Emily Brown",
      time: "12:00",
      priority: "urgent",
      description: "IV Antibiotics",
    },
  ];

  const recentUpdates = [
    {
      id: 1,
      type: "vitals",
      patient: "Emily Brown",
      time: "10:15 AM",
      description: "Temperature increased to 101.3°F",
    },
    {
      id: 2,
      type: "order",
      patient: "Michael Chen",
      time: "09:45 AM",
      description: "New medication order from Dr. Wilson",
    },
    {
      id: 3,
      type: "note",
      patient: "Sarah Johnson",
      time: "09:30 AM",
      description: "Patient reports improved mobility",
    },
  ];

  return (
    <PageShell>
      <PageHeader
        title="My Patients"
        subtitle={<>Managing {mockPatients.length} active patients</>}
        actions={
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search patients..."
              className="px-4 py-2 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="stable">Stable</option>
              <option value="needs-attention">Needs Attention</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockPatients.map((patient) => (
          <div
            key={patient.id}
            className={`bg-white rounded-xl p-6 shadow-sm border-2 ${
              patient.status === "stable"
                ? "border-green-500"
                : patient.status === "needs-attention"
                ? "border-yellow-500"
                : "border-red-500"
            }`}
          >
            <div className="flex items-center mb-4">
              <InitialsAvatar name={patient.name} className="m-3" />
              <div>
                <h3 className="font-poppins text-lg font-semibold text-primary">
                  {patient.name}
                </h3>
                <p className="font-poppins text-sm text-ink">
                  Room {patient.room}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="font-poppins text-sm text-ink">Temp</p>
                <p className="font-poppins font-semibold">
                  {patient.vitals.temperature}
                </p>
              </div>
              <div className="text-center">
                <p className="font-poppins text-sm text-ink">BP</p>
                <p className="font-poppins font-semibold">
                  {patient.vitals.bloodPressure}
                </p>
              </div>
              <div className="text-center">
                <p className="font-poppins text-sm text-ink">HR</p>
                <p className="font-poppins font-semibold">
                  {patient.vitals.heartRate}
                </p>
              </div>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <p className="font-poppins text-ink">
                Last Med:{" "}
                {new Date(patient.lastMedication).toLocaleTimeString()}
              </p>
              <p className="font-poppins text-ink">
                Next Check: {new Date(patient.nextCheck).toLocaleTimeString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-surface text-primary rounded-lg font-poppins hover:bg-line">
                <FontAwesomeIcon icon={faHeartbeat} className="mr-2" />
                Update Vitals
              </button>
              <button className="flex-1 px-3 py-2 bg-surface text-primary rounded-lg font-poppins hover:bg-line">
                <FontAwesomeIcon icon={faNotesMedical} className="mr-2" />
                Add Notes
              </button>
              <button className="flex-1 px-3 py-2 bg-surface text-primary rounded-lg font-poppins hover:bg-line">
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Upcoming Tasks">
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-surface rounded-lg"
              >
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={
                      task.type === "medication" ? faPills : faClipboardCheck
                    }
                    className={`text-primary text-xl mr-4`}
                  />
                  <div>
                    <p className="font-poppins font-semibold">{task.patient}</p>
                    <p className="font-poppins text-sm text-ink">
                      {task.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-poppins font-semibold">{task.time}</p>
                  <StatusBadge status={task.priority} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Updates">
          <div className="space-y-4">
            {recentUpdates.map((update) => (
              <div
                key={update.id}
                className="flex items-center p-4 bg-surface rounded-lg"
              >
                <FontAwesomeIcon
                  icon={
                    update.type === "vitals"
                      ? faHeartbeat
                      : update.type === "order"
                      ? faFileMedical
                      : faCommentMedical
                  }
                  className={`text-primary text-xl mr-4`}
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-poppins font-semibold">
                      {update.patient}
                    </p>
                    <p className="font-poppins text-sm text-ink">
                      {update.time}
                    </p>
                  </div>
                  <p className="font-poppins text-sm text-ink">
                    {update.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

export default MyPatients;
