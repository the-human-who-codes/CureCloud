"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faPrescriptionBottle,
  faFileMedical,
  faCommentMedical,
  faCalendarAlt,
  faHeart,
  faHeartbeat,
  faWeight,
  faTint,
} from "@fortawesome/free-solid-svg-icons";

function PatientDashBoard() {
  const mockAppointments = [
    {
      id: 1,
      type: "General Checkup",
      date: "2025-03-15",
      time: "10:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      type: "Follow-up",
      date: "2025-03-20",
      time: "2:30 PM",
      status: "Pending",
    },
    {
      id: 3,
      type: "Specialist Consult",
      date: "2025-03-25",
      time: "11:15 AM",
      status: "Scheduled",
    },
  ];

  const mockPrescriptions = [
    {
      id: 1,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      status: "Active",
    },
    {
      id: 2,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      status: "Active",
    },
    {
      id: 3,
      medication: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      status: "Active",
    },
  ];

  const healthStats = {
    bloodPressure: "120/80",
    heartRate: "72 bpm",
    weight: "68 kg",
    bloodSugar: "95 mg/dL",
  };

  const notifications = [
    {
      id: 1,
      type: "appointment",
      message: "Upcoming appointment with Dr. Wilson tomorrow at 10:00 AM",
      priority: "high",
    },
    {
      id: 2,
      type: "prescription",
      message: "Metformin prescription needs refill in 5 days",
      priority: "medium",
    },
  ];

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                  Welcome back, John Smith
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(healthStats).map(([key, value]) => (
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
                          key === "bloodPressure"
                            ? faHeart
                            : key === "heartRate"
                            ? faHeartbeat
                            : key === "weight"
                            ? faWeight
                            : faTint
                        }
                        className="text-[#2c4ecf] text-xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                    <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                      Upcoming Appointments
                    </h2>
                    <div className="space-y-4">
                      {mockAppointments.map((apt) => (
                        <div
                          key={apt.id}
                          className="flex items-center justify-between p-3 bg-[#f8faff] rounded-lg"
                        >
                          <div>
                            <p className="font-poppins font-medium text-[#2c4ecf]">
                              {apt.type}
                            </p>
                            <p className="font-poppins text-sm text-[#4a5568]">
                              {apt.date} {apt.time}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-poppins ${
                              apt.status === "Scheduled"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {apt.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                    <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                      Current Prescriptions
                    </h2>
                    <div className="space-y-4">
                      {mockPrescriptions.map((prescription) => (
                        <div
                          key={prescription.id}
                          className="p-3 bg-[#f8faff] rounded-lg"
                        >
                          <p className="font-poppins font-medium text-[#2c4ecf]">
                            {prescription.medication}
                          </p>
                          <p className="font-poppins text-sm text-[#4a5568]">
                            {prescription.dosage} - {prescription.frequency}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                  Quick Actions
                </h2>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                  <div className="space-y-4">
                    {[
                      {
                        name: "Book Appointment",
                        icon: faCalendarPlus,
                      },
                      {
                        name: "Request Prescription Refill",
                        icon: faPrescriptionBottle,
                      },
                      {
                        name: "View Medical Records",
                        icon: faFileMedical,
                      },
                      {
                        name: "Message Doctor",
                        icon: faCommentMedical,
                      },
                    ].map((action) => (
                      <button
                        key={action.name}
                        className="w-full px-4 py-3 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200 flex items-center"
                      >
                        <FontAwesomeIcon icon={action.icon} className="mr-2" />
                        {action.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                    Notifications
                  </h2>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg ${
                          notification.priority === "high"
                            ? "bg-red-50"
                            : "bg-yellow-50"
                        }`}
                      >
                        <div className="flex items-start">
                          <FontAwesomeIcon
                            icon={
                              notification.type === "appointment"
                                ? faCalendarAlt
                                : faPrescriptionBottle
                            }
                            className="text-[#2c4ecf] mt-1 mr-3"
                          />
                          <p className="font-poppins text-sm text-[#4a5568]">
                            {notification.message}
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

export default PatientDashBoard;
