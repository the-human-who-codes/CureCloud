import NotificationItem from "./NotificationItem";

import PropTypes from "prop-types";

function NotificationList({ notifications, handleMarkAsRead }) {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          handleMarkAsRead={handleMarkAsRead}
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
};

export default NotificationList;
