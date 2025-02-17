import NotificationIcon from "./NotificationIcon";

import PropTypes from "prop-types";

function NotificationItem({ notification, handleMarkAsRead }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff] ${
        !notification.read ? "border-l-4" : ""
      } ${
        notification.priority === "urgent"
          ? "border-l-red-500"
          : notification.priority === "important"
          ? "border-l-yellow-500"
          : "border-l-[#2c4ecf]"
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
                <h3 className="font-poppins font-semibold text-[#2c4ecf]">
                  {notification.title}
                </h3>
                {!notification.read && (
                  <span className="w-2 h-2 rounded-full bg-[#2c4ecf]"></span>
                )}
              </div>
              <p className="font-poppins text-sm text-[#4a5568] mt-1">
                {notification.description}
              </p>
              <p className="font-poppins text-xs text-[#4a5568] mt-2">
                From: {notification.senderName}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-poppins text-xs text-[#4a5568]">
                {formatDate(notification.createdAt)}
              </span>
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="mt-2 text-sm text-[#2c4ecf] hover:text-[#1a3baf]"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
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
    senderName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  handleMarkAsRead: PropTypes.func.isRequired,
};

export default NotificationItem;
