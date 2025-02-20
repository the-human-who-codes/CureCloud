import { mockAppointments } from "../../data/MockData";
import AppointmentCard from "./AppointmentCard";

const UpcomingAppointmentsCard = () => {
  return (
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
  );
};

export default UpcomingAppointmentsCard;
