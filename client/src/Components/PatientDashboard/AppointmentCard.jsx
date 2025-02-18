// AppointmentCard.jsx
import PropTypes from "prop-types";

const AppointmentCard = ({ appointment }) => (
  <div className="flex items-center justify-between p-3 bg-[#f8faff] rounded-lg">
    <div>
      <p className="font-poppins font-medium text-[#2c4ecf]">
        {appointment.type}
      </p>
      <p className="font-poppins text-sm text-[#4a5568]">
        {appointment.date} {appointment.time}
      </p>
    </div>
    <span
      className={`px-3 py-1 rounded-full text-xs font-poppins ${
        appointment.status === "Scheduled"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {appointment.status}
    </span>
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
