import { useState } from "react";

import { api } from "../api/client";
import { useApi } from "../hooks/useApi";
import { todaySast } from "../utils/format";
import defaultAvatar from "../assets/default-avatar.svg";
import AsyncContent from "../Components/common/AsyncContent";
import AppointmentsTable from "../Components/Appointments/AppointmentsTable";
import AppointmentsFilters from "../Components/Appointments/AppointmentsFilters";
import AppointmentsHeader from "../Components/Appointments/AppointmentsHeader";

const RANGE_DAYS = { today: 0, week: 7, month: 30 };

function AppointmentsPage() {
  const [selectedDateRange, setSelectedDateRange] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCalendarView, setIsCalendarView] = useState(false);
  const { data, error, loading, reload } = useApi(() =>
    api.listAppointments({ limit: 100 })
  );

  const today = todaySast();
  const rangeEnd =
    selectedDateRange in RANGE_DAYS
      ? new Date(Date.parse(today) + RANGE_DAYS[selectedDateRange] * 86400e3)
          .toISOString()
          .slice(0, 10)
      : null;

  const appointments = (data?.appointments ?? [])
    .filter((a) => selectedStatus === "all" || a.status === selectedStatus)
    .filter((a) => !rangeEnd || (a.date >= today && a.date <= rangeEnd))
    .map((a) => ({ ...a, patientImage: defaultAvatar }));

  const updateStatus = async (id, status) => {
    await api.updateAppointment(id, { status });
    reload();
  };

  return (
    <div className="flex h-screen bg-surface">
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
          <AsyncContent
            loading={loading}
            error={error}
            empty={appointments.length === 0}
            emptyText="No appointments match these filters."
          >
            <AppointmentsTable
              appointments={appointments}
              onConfirm={(id) => updateStatus(id, "confirmed")}
              onCancel={(id) => updateStatus(id, "cancelled")}
            />
          </AsyncContent>
        )}
      </div>
    </div>
  );
}
export default AppointmentsPage;
