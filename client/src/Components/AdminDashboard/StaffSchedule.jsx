import PropTypes from "prop-types";

function StaffSchedule({ staffSchedule }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
      <h2 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
        Staff Schedule
      </h2>
      <div className="space-y-4">
        {staffSchedule.map((staff, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-[#f8faff] rounded-lg"
          >
            <div>
              <p className="font-poppins text-sm font-semibold text-[#2c4ecf]">
                {staff.doctor}
              </p>
              <p className="font-poppins text-xs text-[#4a5568]">
                {staff.shift} Shift
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-poppins ${
                staff.status === "On Duty"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {staff.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

StaffSchedule.propTypes = {
  staffSchedule: PropTypes.arrayOf(
    PropTypes.shape({
      doctor: PropTypes.string.isRequired,
      shift: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default StaffSchedule;
