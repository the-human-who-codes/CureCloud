import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import {
  addDays,
  formatDate,
  formatTime,
  labelFor,
  sastInstant,
  todaySast,
} from "../../utils/format";
import AsyncContent from "../common/AsyncContent";
import { Card, SectionTitle } from "../common/Card";
import StatusBadge from "../common/StatusBadge";

// The signed-in staff member's shifts for the next 7 days (GET /shifts?staffId=me).
const ScheduleOverview = () => {
  const shifts = useApi(() =>
    api.listShifts({
      staffId: "me",
      from: sastInstant(todaySast()),
      to: sastInstant(addDays(todaySast(), 7)),
      limit: 50,
    })
  );
  const upcoming = (shifts.data?.data ?? []).filter(
    (s) => s.status === "scheduled"
  );
  return (
    <Card>
      <SectionTitle spacing="lg">
        <FontAwesomeIcon icon={faClock} className="mr-2" />
        Schedule Overview
      </SectionTitle>
      <AsyncContent
        {...shifts}
        empty={upcoming.length === 0}
        emptyText="No shifts rostered in the next 7 days."
      >
        <ul className="space-y-3">
          {upcoming.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between p-3 bg-surface rounded-lg"
            >
              <div>
                <p className="font-poppins text-primary">
                  {formatDate(s.start)}
                </p>
                <p className="font-poppins text-sm text-ink">
                  {formatTime(s.start)}–{formatTime(s.end)}
                </p>
              </div>
              <StatusBadge status={s.type}>{labelFor(s.type)}</StatusBadge>
            </li>
          ))}
        </ul>
      </AsyncContent>
    </Card>
  );
};

export default ScheduleOverview;
