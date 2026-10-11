import PropTypes from "prop-types";
import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import AsyncContent from "../common/AsyncContent";
import { Card } from "../common/Card";
import AppointmentCard from "./AppointmentCard";

// Card listing a useApi() result of appointments.
export function UpcomingAppointmentsList({ appointments }) {
  return (
    <Card title="Upcoming Appointments">
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
    </Card>
  );
}

UpcomingAppointmentsList.propTypes = {
  appointments: PropTypes.object.isRequired,
};

const UpcomingAppointmentsCard = () => {
  const appointments = useApi(() => api.listAppointments({ upcoming: "true" }));
  return <UpcomingAppointmentsList appointments={appointments} />;
};

export default UpcomingAppointmentsCard;
