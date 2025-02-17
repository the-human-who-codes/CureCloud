import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NotificationBell = ({ notificationCount }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notifications");
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg"
      >
        <FontAwesomeIcon icon={faBell} className="text-xl" />
        {notificationCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {notificationCount}
          </span>
        )}
      </button>
    </div>
  );
};

NotificationBell.propTypes = {
  notificationCount: PropTypes.number.isRequired,
};

export default NotificationBell;
