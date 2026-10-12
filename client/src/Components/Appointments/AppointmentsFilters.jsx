import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faList } from "@fortawesome/free-solid-svg-icons";
import { APPOINTMENT_STATUSES } from "../../utils/appointments";
import { labelFor } from "../../utils/format";
import { FilterSelect } from "../common/FormField";

const DATE_RANGES = [
  { value: "upcoming", label: "Upcoming" },
  { value: "today", label: "Today" },
  { value: "week", label: "Next 7 Days" },
  { value: "month", label: "Next 30 Days" },
  { value: "past", label: "Past" },
  { value: "all", label: "All Dates" },
];

function AppointmentsFilters({
  selectedDateRange,
  setSelectedDateRange,
  selectedStatus,
  setSelectedStatus,
  isCalendarView,
  setIsCalendarView,
}) {
  const toggle = (calendar, icon, label) => (
    <button
      type="button"
      onClick={() => setIsCalendarView(calendar)}
      className={`px-4 py-2 rounded-lg font-poppins ${
        isCalendarView === calendar
          ? "bg-primary text-white"
          : "bg-surface text-ink"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap gap-4 items-end justify-between mb-6">
      <div className="flex gap-4">
        {toggle(true, faCalendarAlt, "Calendar")}
        {toggle(false, faList, "List")}
      </div>

      <div className="flex gap-4">
        <FilterSelect
          label="Dates"
          value={selectedDateRange}
          onChange={setSelectedDateRange}
          options={DATE_RANGES}
        />
        <FilterSelect
          label="Status"
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={[
            { value: "all", label: "All Status" },
            ...APPOINTMENT_STATUSES.map((s) => ({
              value: s,
              label: labelFor(s),
            })),
          ]}
        />
      </div>
    </div>
  );
}

AppointmentsFilters.propTypes = {
  selectedDateRange: PropTypes.string.isRequired,
  setSelectedDateRange: PropTypes.func.isRequired,
  selectedStatus: PropTypes.string.isRequired,
  setSelectedStatus: PropTypes.func.isRequired,
  isCalendarView: PropTypes.bool.isRequired,
  setIsCalendarView: PropTypes.func.isRequired,
};

export default AppointmentsFilters;
