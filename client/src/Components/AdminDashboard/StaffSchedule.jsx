import PropTypes from "prop-types";
import { Card } from "../common/Card";
import StatusBadge from "../common/StatusBadge";

function StaffSchedule({ staffSchedule }) {
  return (
    <Card title="Staff Schedule" titleSize="lg">
      <div className="space-y-4">
        {staffSchedule.map((staff, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-surface rounded-lg"
          >
            <div>
              <p className="font-poppins text-sm font-semibold text-primary">
                {staff.doctor}
              </p>
              <p className="font-poppins text-xs text-ink">
                {staff.shift} Shift
              </p>
            </div>
            <StatusBadge status={staff.status} />
          </div>
        ))}
      </div>
    </Card>
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
