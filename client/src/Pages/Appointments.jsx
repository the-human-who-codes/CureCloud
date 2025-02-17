import { useState } from "react";
import Header1 from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { MockData } from "../data/MockData";

function Appointments() {
  const { appointments, patients, doctors } = MockData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCalendarView, setIsCalendarView] = useState(true);

  const enrichedAppointments = appointments.map((appointment) => {
    const patient = patients.find((p) => p.id === appointment.patientId);
    const doctor = doctors.find((d) => d.id === appointment.doctorId);
    return {
      ...appointment,
      patientName: patient?.name,
      patientImage: patient?.image,
      doctorName: doctor?.name,
    };
  });

  const filteredAppointments = enrichedAppointments.filter((appointment) => {
    const matchesStatus =
      selectedStatus === "all" || appointment.status === selectedStatus;
    const matchesDate =
      selectedDateRange === "all" ||
      (() => {
        const appointmentDate = new Date(appointment.date);
        const today = new Date();
        let weekFromNow, monthFromNow;

        switch (selectedDateRange) {
          case "today":
            return appointmentDate.toDateString() === today.toDateString();
          case "week":
            weekFromNow = new Date(today);
            weekFromNow.setDate(today.getDate() + 7);
            return appointmentDate <= weekFromNow && appointmentDate >= today;
          case "month":
            monthFromNow = new Date(today);
            monthFromNow.setMonth(today.getMonth() + 1);
            return appointmentDate <= monthFromNow && appointmentDate >= today;
          default:
            return true;
        }
      })();
    return matchesStatus && matchesDate;
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <Sidebar activePage="Appointments" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header1 onSearch={handleSearch} notificationCount={3} />

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                Appointments
              </h1>
              <button className="px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins hover:bg-[#1a3baf] transition-colors duration-200">
                <i className="fas fa-plus mr-2"></i>Schedule Appointment
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6 mb-8">
              <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsCalendarView(true)}
                    className={`px-4 py-2 rounded-lg font-poppins ${
                      isCalendarView
                        ? "bg-[#2c4ecf] text-white"
                        : "bg-[#f8faff] text-[#4a5568]"
                    }`}
                  >
                    <i className="fas fa-calendar-alt mr-2"></i>Calendar
                  </button>
                  <button
                    onClick={() => setIsCalendarView(false)}
                    className={`px-4 py-2 rounded-lg font-poppins ${
                      !isCalendarView
                        ? "bg-[#2c4ecf] text-white"
                        : "bg-[#f8faff] text-[#4a5568]"
                    }`}
                  >
                    <i className="fas fa-list mr-2"></i>List
                  </button>
                </div>

                <div className="flex gap-4">
                  <select
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                    className="px-4 py-2 bg-[#f8faff] border border-[#e1e8ff] rounded-lg font-poppins text-[#4a5568]"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="week">Next 7 Days</option>
                    <option value="month">Next 30 Days</option>
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 bg-[#f8faff] border border-[#e1e8ff] rounded-lg font-poppins text-[#4a5568]"
                  >
                    <option value="all">All Status</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {isCalendarView ? (
                <div className="min-h-[600px] bg-[#f8faff] rounded-lg p-4">
                  <div className="text-center font-poppins text-[#4a5568]">
                    Calendar View Coming Soon
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#f8faff]">
                      <tr>
                        <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                          Patient
                        </th>
                        <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                          Doctor
                        </th>
                        <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                          Date & Time
                        </th>
                        <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                          Type
                        </th>
                        <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment) => (
                        <tr
                          key={appointment.id}
                          className="border-t border-[#e1e8ff]"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <img
                                src={appointment.patientImage}
                                alt={appointment.patientName}
                                className="w-8 h-8 rounded-full mr-3"
                              />
                              <span className="font-poppins text-[#4a5568]">
                                {appointment.patientName}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-poppins text-[#4a5568]">
                            {appointment.doctorName}
                          </td>
                          <td className="px-6 py-4 font-poppins text-[#4a5568]">
                            {appointment.date} {appointment.time}
                          </td>
                          <td className="px-6 py-4 font-poppins text-[#4a5568]">
                            {appointment.type}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-poppins ${
                                appointment.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : appointment.status === "Scheduled"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
