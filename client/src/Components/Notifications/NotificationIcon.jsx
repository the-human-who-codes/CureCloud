import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faBuilding,
  faCog,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";

function NotificationIcon({ type, priority }) {
  const getIcon = (type) => {
    switch (type) {
      case "shift":
        return faCalendar;
      case "department":
        return faBuilding;
      case "system":
        return faCog;
      default:
        return faBell;
    }
  };

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        priority === "urgent"
          ? "bg-red-100"
          : priority === "important"
          ? "bg-yellow-100"
          : "bg-blue-100"
      }`}
    >
      <FontAwesomeIcon
        icon={getIcon(type)}
        className={`${
          priority === "urgent"
            ? "text-red-500"
            : priority === "important"
            ? "text-yellow-600"
            : "text-[#2c4ecf]"
        }`}
      />
    </div>
  );
}

NotificationIcon.propTypes = {
  type: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
};

export default NotificationIcon;
