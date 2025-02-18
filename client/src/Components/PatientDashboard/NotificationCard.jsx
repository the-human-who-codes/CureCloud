// NotificationCard.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPrescriptionBottle,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const NotificationCard = ({ notification }) => (
  <div
    className={`p-4 rounded-lg ${
      notification.priority === "high" ? "bg-red-50" : "bg-yellow-50"
    }`}
  >
    <div className="flex items-start">
      <FontAwesomeIcon
        icon={
          notification.type === "appointment"
            ? faCalendarAlt
            : faPrescriptionBottle
        }
        className="text-[#2c4ecf] mt-1 mr-3"
      />
      <p className="font-poppins text-sm text-[#4a5568]">
        {notification.message}
      </p>
    </div>
  </div>
);

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    priority: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotificationCard;
