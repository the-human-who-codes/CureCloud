import { useState } from "react";

import MockData from "../data/MockData";
import AppointmentsTable from "../Components/Appointments/AppointmentsTable";
import AppointmentsFilters from "../Components/Appointments/AppointmentsFilters";
import AppointmentsHeader from "../Components/Appointments/AppointmentsHeader";

function AppointmentsPage() {
  const { appointments, patients, doctors } = MockData;
  const [selectedDateRange, setSelectedDateRange] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCalendarView, setIsCalendarView] = useState(true);

  const enrichedAppointments = appointments.map((appointment) => ({
    ...appointment,
    patientName: patients.find((p) => p.id === appointment.patientId)?.name,
    patientImage: patients.find((p) => p.id === appointment.patientId)?.image,
    doctorName: doctors.find((d) => d.id === appointment.doctorId)?.name,
  }));

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <AppointmentsHeader />
        <AppointmentsFilters
          {...{
            selectedDateRange,
            setSelectedDateRange,
            selectedStatus,
            setSelectedStatus,
            isCalendarView,
            setIsCalendarView,
          }}
        />
        {isCalendarView ? (
          <div>Calendar View Coming Soon</div>
        ) : (
          <AppointmentsTable appointments={enrichedAppointments} />
        )}
      </div>
    </div>
  );
}
export default AppointmentsPage;
