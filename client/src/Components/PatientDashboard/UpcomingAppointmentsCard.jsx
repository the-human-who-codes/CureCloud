import { useState } from "react";
import PropTypes from "prop-types";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useApi, usePagedApi } from "../../hooks/useApi";
import AsyncContent, { LoadMore } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { PageHeader, PageShell } from "../common/PageShell";
import Tabs from "../common/Tabs";
import AppointmentActions from "../Appointments/AppointmentActions";
import BookingForm from "../Appointments/BookingForm";
import AppointmentCard from "./AppointmentCard";

// Card listing a useApi() result of appointments ({ data }), used on the patient dashboard.
export function UpcomingAppointmentsList({ appointments }) {
  return (
    <Card title="Upcoming Appointments">
      <div className="space-y-4">
        <AsyncContent
          {...appointments}
          empty={appointments.data?.data.length === 0}
          emptyText="No upcoming appointments."
        >
          {appointments.data?.data.map((apt) => (
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

// The patient's appointments page: upcoming and past tabs, booking, cancel and reschedule.
const UpcomingAppointmentsCard = () => {
  const [tab, setTab] = useState("upcoming");
  const [booking, setBooking] = useState(false);
  const settings = useApi(() => api.getSystemSettings());
  const appointments = usePagedApi(
    (cursor) => {
      const now = new Date().toISOString();
      return api.listAppointments({
        ...(tab === "upcoming" ? { from: now } : { to: now }),
        cursor,
      });
    },
    [tab]
  );

  const replace = (updated) =>
    appointments.setItems((items) =>
      items.map((a) => (a.id === updated.id ? updated : a))
    );

  return (
    <PageShell>
      <PageHeader
        title="My Appointments"
        actions={
          <Button icon={faCalendarPlus} onClick={() => setBooking(true)}>
            Book Appointment
          </Button>
        }
      />
      <Card padded={false}>
        <Tabs
          tabs={[
            { value: "upcoming", label: "Upcoming" },
            { value: "past", label: "Past" },
          ]}
          value={tab}
          onChange={setTab}
        />
        <div className="p-6 space-y-4">
          <AsyncContent
            loading={appointments.loading}
            error={appointments.error}
            empty={appointments.items.length === 0}
            emptyText={
              tab === "upcoming"
                ? "No upcoming appointments."
                : "No past appointments."
            }
          >
            {appointments.items.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt}>
                <AppointmentActions
                  appointment={apt}
                  settings={settings.data}
                  onChanged={replace}
                />
              </AppointmentCard>
            ))}
            <LoadMore {...appointments} />
          </AsyncContent>
        </div>
      </Card>
      {booking && (
        <BookingForm
          onClose={() => setBooking(false)}
          onSaved={() => appointments.reload()}
        />
      )}
    </PageShell>
  );
};

export default UpcomingAppointmentsCard;
