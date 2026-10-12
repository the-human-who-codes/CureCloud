import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { iconForNotification } from "../../utils/notifications";

function NotificationIcon({ type, priority }) {
  const important = priority === "important";
  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        important ? "bg-yellow-100" : "bg-blue-100"
      }`}
    >
      <FontAwesomeIcon
        icon={iconForNotification(type)}
        className={important ? "text-yellow-600" : "text-primary"}
      />
    </div>
  );
}

NotificationIcon.propTypes = {
  type: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
};

export default NotificationIcon;
