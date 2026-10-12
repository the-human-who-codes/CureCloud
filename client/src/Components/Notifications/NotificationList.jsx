import PropTypes from "prop-types";
import NotificationItem from "./NotificationItem";

function NotificationList({
  notifications,
  handleMarkAsRead,
  linkFor,
  onOpen,
}) {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          handleMarkAsRead={handleMarkAsRead}
          onOpen={
            linkFor(notification) ? () => onOpen(notification) : undefined
          }
        />
      ))}
    </div>
  );
}

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleMarkAsRead: PropTypes.func.isRequired,
  linkFor: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default NotificationList;
