import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faExclamationCircle,
  faArrowUp,
  faMinus,
  faArrowDown,
  faTasks,
  faCheckCircle,
  faCheck,
  faClock,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { PageHeader, PageShell } from "../common/PageShell";
import StatusBadge from "../common/StatusBadge";
import { longDate, capitalize } from "../../utils/format";
import { StatGrid } from "../common/StatCard";
import { Button } from "../common/Button";
import { Card, SectionTitle } from "../common/Card";
import InitialsAvatar from "../common/InitialsAvatar";

const STAT_ICONS = {
  urgent: faExclamationCircle,
  high: faArrowUp,
  medium: faMinus,
  low: faArrowDown,
  total: faTasks,
};

function Tasks() {
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");

  const mockData = {
    todaySchedule: [
      {
        time: "14:30",
        count: 3,
        description: "Medication rounds",
      },
      {
        time: "15:00",
        count: 2,
        description: "Patient check-ups",
      },
      {
        time: "16:00",
        count: 4,
        description: "Vital signs monitoring",
      },
    ],
    taskSummary: {
      urgent: 3,
      high: 5,
      medium: 12,
      low: 8,
      total: 28,
      completed: 45,
    },
    tasks: {
      urgent: [
        {
          id: 1,
          patient: {
            name: "John Smith",
            photo: "/default-avatar.png",
            room: "201A",
            status: "critical",
          },
          type: "Medication",
          description: "Administer IV antibiotics",
          dueAt: "2024-01-20T14:30:00Z",
          priority: "urgent",
          created: "2024-01-20T12:00:00Z",
        },
      ],
      high: [
        {
          id: 4,
          patient: {
            name: "Sarah Johnson",
            photo: "/default-avatar.png",
            room: "105B",
            status: "needs_attention",
          },
          type: "Check-up",
          description: "Post-surgery vital check",
          dueAt: "2024-01-20T15:00:00Z",
          priority: "high",
          created: "2024-01-20T11:00:00Z",
        },
      ],
    },
    completedTasks: [
      {
        id: 20,
        patient: {
          name: "Emma Wilson",
          photo: "/default-avatar.png",
          room: "302C",
          status: "stable",
        },
        type: "Medication",
        description: "Morning medication round",
        completedAt: "2024-01-20T09:15:00Z",
        completedBy: "Nurse Anderson",
        notes: "Patient reported feeling better after medication",
      },
    ],
  };

  return (
    <PageShell>
      <PageHeader
        title="My Tasks"
        subtitle={longDate()}
        actions={<Button icon={faPlus}>Add New Task</Button>}
      />

      <StatGrid
        stats={mockData.taskSummary}
        icons={(key) => STAT_ICONS[key] ?? faCheckCircle}
        label={(key) => `${capitalize(key)} Tasks`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <SectionTitle className="">Active Tasks</SectionTitle>
              <div className="flex gap-4">
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-4 py-2 bg-surface border border-line rounded-lg font-poppins text-ink"
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="px-4 py-2 bg-surface border border-line rounded-lg font-poppins text-ink"
                >
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="week">This Week</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(mockData.tasks).map(([priority, tasks]) =>
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      priority === "urgent"
                        ? "border-l-red-500"
                        : priority === "high"
                        ? "border-l-orange-500"
                        : priority === "medium"
                        ? "border-l-yellow-500"
                        : "border-l-blue-500"
                    } bg-surface`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <InitialsAvatar
                          name={task.patient.name}
                          className="m-3"
                        />
                        <div>
                          <h3 className="font-poppins font-semibold text-primary">
                            {task.patient.name}
                          </h3>
                          <p className="font-poppins text-sm text-ink">
                            Room {task.patient.room}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-poppins text-sm text-ink">
                          {new Date(task.dueAt).toLocaleTimeString()}
                        </p>
                        <StatusBadge status={task.patient.status} />
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="font-poppins text-ink">
                        {task.description}
                      </p>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="font-poppins text-sm text-ink">
                        {task.type}
                      </span>
                      <div className="flex gap-2">
                        <button className="p-2 text-ink hover:bg-white rounded-lg transition-colors duration-200">
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button className="p-2 text-ink hover:bg-white rounded-lg transition-colors duration-200">
                          <FontAwesomeIcon icon={faClock} />
                        </button>
                        <button className="p-2 text-ink hover:bg-white rounded-lg transition-colors duration-200">
                          <FontAwesomeIcon icon={faEllipsisH} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card title="Today's Schedule" className="mb-8">
            <div className="space-y-4">
              {mockData.todaySchedule.map((schedule, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-surface rounded-lg"
                >
                  <div className="w-16 text-center">
                    <p className="font-poppins font-semibold text-primary">
                      {schedule.time}
                    </p>
                  </div>
                  <div className="flex-1 ml-4">
                    <p className="font-poppins text-ink">
                      {schedule.description}
                    </p>
                    <p className="font-poppins text-sm text-ink">
                      {schedule.count} tasks
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Recently Completed">
            <div className="space-y-4">
              {mockData.completedTasks.map((task) => (
                <div key={task.id} className="p-3 bg-surface rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <InitialsAvatar
                        name={task.patient.name}
                        className="mr-2"
                      />
                      <div>
                        <p className="font-poppins text-sm font-semibold text-primary">
                          {task.patient.name}
                        </p>
                        <p className="font-poppins text-xs text-ink">
                          {task.type}
                        </p>
                      </div>
                    </div>
                    <p className="font-poppins text-xs text-ink">
                      {new Date(task.completedAt).toLocaleTimeString()}
                    </p>
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

export default Tasks;
