import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPrescriptionBottle,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const NotificationCard = ({ notification }) => (
  <div
    className={`p-4 rounded-lg ${
      notification.priority === "normal" ? "bg-yellow-50" : "bg-red-50"
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
      <div>
        <p className="font-poppins text-sm font-medium text-[#2c4ecf]">
          {notification.title}
        </p>
        <p className="font-poppins text-sm text-[#4a5568]">
          {notification.description}
        </p>
      </div>
    </div>
  </div>
);

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    priority: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default NotificationCard;
