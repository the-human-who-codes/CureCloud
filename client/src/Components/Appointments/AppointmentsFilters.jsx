import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faList } from "@fortawesome/free-solid-svg-icons";

function AppointmentsFilters({
  selectedDateRange,
  setSelectedDateRange,
  selectedStatus,
  setSelectedStatus,
  isCalendarView,
  setIsCalendarView,
}) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
      <div className="flex gap-4">
        <button
          onClick={() => setIsCalendarView(true)}
          className={`px-4 py-2 rounded-lg font-poppins ${
            isCalendarView ? "bg-primary text-white" : "bg-surface text-ink"
          }`}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
          Calendar
        </button>
        <button
          onClick={() => setIsCalendarView(false)}
          className={`px-4 py-2 rounded-lg font-poppins ${
            !isCalendarView ? "bg-primary text-white" : "bg-surface text-ink"
          }`}
        >
          <FontAwesomeIcon icon={faList} className="mr-2" />
          List
        </button>
      </div>

      <div className="flex gap-4">
        <select
          value={selectedDateRange}
          onChange={(e) => setSelectedDateRange(e.target.value)}
          className="px-4 py-2 bg-surface border border-line rounded-lg font-poppins text-ink"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="week">Next 7 Days</option>
          <option value="month">Next 30 Days</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 bg-surface border border-line rounded-lg font-poppins text-ink"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
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
