import { useState } from "react";
import { api, listAll } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { formatTime, labelFor } from "../../utils/format";
import AsyncContent from "../common/AsyncContent";
import { Card } from "../common/Card";
import { FilterSelect } from "../common/FormField";
import StatusBadge from "../common/StatusBadge";

// Who is on duty or on leave right now (GET /shifts over [now, now + 1 min)). System admins pick
// the facility, because the shift list needs one (§5.4).
function StaffSchedule() {
  const { isSystemAdmin } = useAuth();
  const [facilityId, setFacilityId] = useState("");
  const facilities = useApi(
    () => (isSystemAdmin ? listAll(api.listFacilities) : Promise.resolve([])),
    [isSystemAdmin]
  );
  const chosen = facilityId || facilities.data?.[0]?.id;
  const shifts = useApi(() => {
    if (isSystemAdmin && !chosen) return Promise.resolve({ data: [] });
    const now = Date.now();
    return api.listShifts({
      from: new Date(now).toISOString(),
      to: new Date(now + 60e3).toISOString(),
      facilityId: isSystemAdmin ? chosen : undefined,
      limit: 100,
    });
  }, [chosen]);
  const current = (shifts.data?.data ?? []).filter(
    (s) => s.status === "scheduled"
  );

  return (
    <Card title="Staff Schedule" titleSize="lg">
      {isSystemAdmin && (facilities.data ?? []).length > 1 && (
        <FilterSelect
          label="Facility"
          value={chosen ?? ""}
          onChange={setFacilityId}
          className="mb-4"
          options={facilities.data.map((f) => ({ value: f.id, label: f.name }))}
        />
      )}
      <AsyncContent
        loading={shifts.loading}
        error={shifts.error ?? facilities.error}
        empty={current.length === 0}
        emptyText="Nobody is rostered right now."
      >
        <div className="space-y-4">
          {current.map((shift) => (
            <div
              key={shift.id}
              className="flex items-center justify-between p-3 bg-surface rounded-lg"
            >
              <div>
                <p className="font-poppins text-sm font-semibold text-primary">
                  {shift.staffName}
                </p>
                <p className="font-poppins text-xs text-ink">
                  {labelFor(shift.staffRole)} · {labelFor(shift.type)} ·{" "}
                  {formatTime(shift.start)}–{formatTime(shift.end)}
                </p>
              </div>
              <StatusBadge
                status={shift.type === "leave" ? "on leave" : "on duty"}
              >
                {shift.type === "leave" ? "On leave" : "On duty"}
              </StatusBadge>
            </div>
          ))}
        </div>
      </AsyncContent>
    </Card>
  );
}

export default StaffSchedule;
