import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { iconForNotification } from "../../utils/notifications";

const NotificationCard = ({ notification }) => (
  <div
    className={`p-4 rounded-lg ${
      notification.priority === "important" ? "bg-yellow-50" : "bg-surface"
    }`}
  >
    <div className="flex items-start">
      <FontAwesomeIcon
        icon={iconForNotification(notification.type)}
        className="text-primary mt-1 mr-3"
      />
      <div>
        <p className="font-poppins text-sm font-medium text-primary">
          {notification.title}
        </p>
        <p className="font-poppins text-sm text-ink">
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
