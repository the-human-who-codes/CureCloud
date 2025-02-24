"use client";
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
    <div className="flex h-screen bg-[#f8faff]">
      <></>

      <div className="flex-1 flex flex-col overflow-hidden">
        <></>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                  My Tasks
                </h1>
                <p className="font-poppins text-[#4a5568]">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <button className="px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins hover:bg-[#1a3baf] transition-colors duration-200">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add New Task
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(mockData.taskSummary).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-poppins text-[#4a5568] text-sm">
                        {key.charAt(0).toUpperCase() + key.slice(1)} Tasks
                      </p>
                      <p className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                        {value}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#f8faff] flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={
                          key === "urgent"
                            ? faExclamationCircle
                            : key === "high"
                            ? faArrowUp
                            : key === "medium"
                            ? faMinus
                            : key === "low"
                            ? faArrowDown
                            : key === "total"
                            ? faTasks
                            : faCheckCircle
                        }
                        className="text-[#2c4ecf] text-xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf]">
                      Active Tasks
                    </h2>
                    <div className="flex gap-4">
                      <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="px-4 py-2 bg-[#f8faff] border border-[#e1e8ff] rounded-lg font-poppins text-[#4a5568]"
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
                        className="px-4 py-2 bg-[#f8faff] border border-[#e1e8ff] rounded-lg font-poppins text-[#4a5568]"
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
                          } bg-[#f8faff]`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img
                                src={task.patient.photo}
                                alt={task.patient.name}
                                className="w-10 h-10 rounded-full mr-4"
                              />
                              <div>
                                <h3 className="font-poppins font-semibold text-[#2c4ecf]">
                                  {task.patient.name}
                                </h3>
                                <p className="font-poppins text-sm text-[#4a5568]">
                                  Room {task.patient.room}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-poppins text-sm text-[#4a5568]">
                                {new Date(task.dueAt).toLocaleTimeString()}
                              </p>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-poppins ${
                                  task.patient.status === "critical"
                                    ? "bg-red-100 text-red-800"
                                    : task.patient.status === "needs_attention"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {task.patient.status
                                  .replace("_", " ")
                                  .charAt(0)
                                  .toUpperCase() + task.patient.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="font-poppins text-[#4a5568]">
                              {task.description}
                            </p>
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <span className="font-poppins text-sm text-[#4a5568]">
                              {task.type}
                            </span>
                            <div className="flex gap-2">
                              <button className="p-2 text-[#4a5568] hover:bg-white rounded-lg transition-colors duration-200">
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                              <button className="p-2 text-[#4a5568] hover:bg-white rounded-lg transition-colors duration-200">
                                <FontAwesomeIcon icon={faClock} />
                              </button>
                              <button className="p-2 text-[#4a5568] hover:bg-white rounded-lg transition-colors duration-200">
                                <FontAwesomeIcon icon={faEllipsisH} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6 mb-8">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                    Today&apos;s Schedule
                  </h2>
                  <div className="space-y-4">
                    {mockData.todaySchedule.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-[#f8faff] rounded-lg"
                      >
                        <div className="w-16 text-center">
                          <p className="font-poppins font-semibold text-[#2c4ecf]">
                            {schedule.time}
                          </p>
                        </div>
                        <div className="flex-1 ml-4">
                          <p className="font-poppins text-[#4a5568]">
                            {schedule.description}
                          </p>
                          <p className="font-poppins text-sm text-[#4a5568]">
                            {schedule.count} tasks
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                    Recently Completed
                  </h2>
                  <div className="space-y-4">
                    {mockData.completedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-[#f8faff] rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={task.patient.photo}
                              alt={task.patient.name}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div>
                              <p className="font-poppins text-sm font-semibold text-[#2c4ecf]">
                                {task.patient.name}
                              </p>
                              <p className="font-poppins text-xs text-[#4a5568]">
                                {task.type}
                              </p>
                            </div>
                          </div>
                          <p className="font-poppins text-xs text-[#4a5568]">
                            {new Date(task.completedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
