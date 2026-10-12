import PropTypes from "prop-types";
import { formatDateTime, labelFor } from "../../utils/format";
import StatusBadge from "../common/StatusBadge";

const AppointmentCard = ({ appointment, children }) => (
  <div className="p-3 bg-surface rounded-lg">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-poppins font-medium text-primary">
          {labelFor(appointment.type)} with {appointment.doctorName}
        </p>
        <p className="font-poppins text-sm text-ink">
          {formatDateTime(appointment.start)} · {appointment.durationMinutes}{" "}
          min
        </p>
        {appointment.cancellationReason && (
          <p className="font-poppins text-xs text-ink">
            Cancelled: {appointment.cancellationReason}
          </p>
        )}
      </div>
      <StatusBadge status={appointment.status} />
    </div>
    {children && <div className="mt-3">{children}</div>}
  </div>
);

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    type: PropTypes.string.isRequired,
    doctorName: PropTypes.string,
    start: PropTypes.string.isRequired,
    durationMinutes: PropTypes.number,
    status: PropTypes.string.isRequired,
    cancellationReason: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

export default AppointmentCard;
