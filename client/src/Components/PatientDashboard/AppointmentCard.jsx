import PropTypes from "prop-types";
import StatusBadge from "../common/StatusBadge";

const AppointmentCard = ({ appointment }) => (
  <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
    <div>
      <p className="font-poppins font-medium text-primary">
        {appointment.type}
      </p>
      <p className="font-poppins text-sm text-ink">
        {appointment.date} {appointment.time}
      </p>
    </div>
    <StatusBadge status={appointment.status} />
  </div>
);

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default AppointmentCard;
