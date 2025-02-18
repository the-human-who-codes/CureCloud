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
            isCalendarView
              ? "bg-[#2c4ecf] text-white"
              : "bg-[#f8faff] text-[#4a5568]"
          }`}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
          Calendar
        </button>
        <button
          onClick={() => setIsCalendarView(false)}
          className={`px-4 py-2 rounded-lg font-poppins ${
            !isCalendarView
              ? "bg-[#2c4ecf] text-white"
              : "bg-[#f8faff] text-[#4a5568]"
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
          className="px-4 py-2 bg-[#f8faff] border border-[#e1e8ff] rounded-lg font-poppins text-[#4a5568]"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="week">Next 7 Days</option>
          <option value="month">Next 30 Days</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 bg-[#f8faff] border border-[#e1e8ff] rounded-lg font-poppins text-[#4a5568]"
        >
          <option value="all">All Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
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
