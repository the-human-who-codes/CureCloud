import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { api } from "../api/client";
import { useAuth } from "../auth/AuthProvider";
import { useApi, usePagedApi } from "../hooks/useApi";
import { addDays, sastInstant, todaySast } from "../utils/format";
import AsyncContent, { LoadMore } from "../Components/common/AsyncContent";
import { Button } from "../Components/common/Button";
import { Card } from "../Components/common/Card";
import { PageHeader, PageShell } from "../Components/common/PageShell";
import AppointmentsTable from "../Components/Appointments/AppointmentsTable";
import AppointmentsFilters from "../Components/Appointments/AppointmentsFilters";
import BookingForm from "../Components/Appointments/BookingForm";

// Date range select -> the API's half-open [from, to) window.
function rangeQuery(range) {
  const now = new Date().toISOString();
  const today = todaySast();
  switch (range) {
    case "upcoming":
      return { from: now };
    case "today":
      return { from: sastInstant(today), to: sastInstant(addDays(today, 1)) };
    case "week":
      return { from: now, to: sastInstant(addDays(today, 8)) };
    case "month":
      return { from: now, to: sastInstant(addDays(today, 31)) };
    case "past":
      return { to: now };
    default:
      return {};
  }
}

function AppointmentsPage() {
  const { can } = useAuth();
  const [selectedDateRange, setSelectedDateRange] = useState("upcoming");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCalendarView, setIsCalendarView] = useState(false);
  const [booking, setBooking] = useState(false);
  const settings = useApi(() => api.getSystemSettings());

  const appointments = usePagedApi(
    (cursor) =>
      api.listAppointments({
        ...rangeQuery(selectedDateRange),
        status: selectedStatus === "all" ? undefined : selectedStatus,
        cursor,
      }),
    [selectedDateRange, selectedStatus]
  );

  const replace = (updated) =>
    appointments.setItems((items) =>
      items.map((a) => (a.id === updated.id ? updated : a))
    );

  return (
    <PageShell>
      <PageHeader
        title="Appointments"
        actions={
          can("appointment:create") && (
            <Button icon={faPlus} onClick={() => setBooking(true)}>
              Schedule Appointment
            </Button>
          )
        }
      />
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
        <Card>
          <p className="font-poppins text-ink">
            Calendar view is coming soon. Use the list view for now.
          </p>
        </Card>
      ) : (
        <AsyncContent
          loading={appointments.loading}
          error={appointments.error}
          empty={appointments.items.length === 0}
          emptyText="No appointments match these filters."
        >
          <Card padded={false}>
            <AppointmentsTable
              appointments={appointments.items}
              settings={settings.data}
              onChanged={replace}
            />
            <LoadMore {...appointments} />
          </Card>
        </AsyncContent>
      )}
      {booking && (
        <BookingForm
          onClose={() => setBooking(false)}
          onSaved={() => appointments.reload()}
        />
      )}
    </PageShell>
  );
}

export default AppointmentsPage;
