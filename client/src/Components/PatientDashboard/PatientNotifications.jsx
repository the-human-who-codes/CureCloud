import PropTypes from "prop-types";
import NotificationCard from "./NotificationCard";

const PatientNotifications = ({ notifications }) => {
  return (
    <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Notifications
      </h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

PatientNotifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PatientNotifications;
