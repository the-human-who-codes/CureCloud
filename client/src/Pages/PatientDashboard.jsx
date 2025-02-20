"use client";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faPrescriptionBottle,
  faFileMedical,
  faCommentMedical,
} from "@fortawesome/free-solid-svg-icons";
import { MockData } from "../data/MockData";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";
import QuickActionButton from "../Components/PatientDashboard/QuickActionButton";
import AppointmentCard from "../Components/PatientDashboard/AppointmentCard";
import PrescriptionsCard from "../Components/PatientDashboard/PrescriptionsCard";
import NotificationCard from "../Components/PatientDashboard/NotificationCard";
import HealthStatsCard from "../Components/PatientDashboard/HealthStatsCard";

function PatientDashBoard() {
  const mockAppointments = MockData.mockAppointments;

  const mockPrescriptions = MockData.mockPrescriptions;

  const healthStats = MockData.healthStats;

  const notifications = MockData.notifications;

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <Sidebar userRole="patient" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
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
                <HealthStatsCard key={key} statKey={key} value={value} />
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
                        <AppointmentCard key={apt.id} appointment={apt} />
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                    <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                      Current Prescriptions
                    </h2>
                    <div className="space-y-4">
                      {mockPrescriptions.map((prescription) => (
                        <PrescriptionsCard
                          key={prescription.id}
                          prescription={prescription}
                        />
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
                      <QuickActionButton key={action.name} action={action} />
                    ))}
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                  <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
                    Notifications
                  </h2>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                      />
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
