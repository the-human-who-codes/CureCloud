import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import AsyncContent from "../common/AsyncContent";
import AppointmentCard from "./AppointmentCard";

const UpcomingAppointmentsCard = () => {
  const appointments = useApi(() => api.listAppointments({ upcoming: "true" }));
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Upcoming Appointments
      </h2>
      <div className="space-y-4">
        <AsyncContent
          {...appointments}
          empty={appointments.data?.appointments.length === 0}
          emptyText="No upcoming appointments."
        >
          {appointments.data?.appointments.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} />
          ))}
        </AsyncContent>
      </div>
    </div>
  );
};

export default UpcomingAppointmentsCard;
