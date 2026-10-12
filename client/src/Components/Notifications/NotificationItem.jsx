import PropTypes from "prop-types";
import { formatDateTime } from "../../utils/format";
import NotificationIcon from "./NotificationIcon";
import { Card } from "../common/Card";

// One notification. `onOpen` is set when the notification links to a page.
function NotificationItem({ notification, handleMarkAsRead, onOpen }) {
  return (
    <Card
      className={`${!notification.read ? "border-l-4" : ""} ${
        notification.priority === "important"
          ? "border-l-yellow-500"
          : "border-l-primary"
      }`}
    >
      <div className="flex items-start gap-4">
        <NotificationIcon
          priority={notification.priority}
          type={notification.type}
        />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                {onOpen ? (
                  <button
                    type="button"
                    onClick={onOpen}
                    className="font-poppins font-semibold text-primary hover:underline text-left"
                  >
                    {notification.title}
                  </button>
                ) : (
                  <h3 className="font-poppins font-semibold text-primary">
                    {notification.title}
                  </h3>
                )}
                {!notification.read && (
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                )}
              </div>
              <p className="font-poppins text-sm text-ink mt-1">
                {notification.description}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-poppins text-xs text-ink whitespace-nowrap">
                {formatDateTime(notification.createdAt)}
              </span>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="mt-2 text-sm text-primary hover:text-primary-dark"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    read: PropTypes.bool.isRequired,
    priority: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  handleMarkAsRead: PropTypes.func.isRequired,
  onOpen: PropTypes.func,
};

export default NotificationItem;
