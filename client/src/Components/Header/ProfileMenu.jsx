import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCog,
  faSignOutAlt,
  faChevronDown,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const ProfileMenu = ({ isProfileOpen, toggleProfile, userName, role }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Close dropdown when clicking outside of it
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleProfile(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, toggleProfile]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => toggleProfile(!isProfileOpen)}
        className="flex items-center space-x-3 p-2 hover:bg-[#f8faff] rounded-lg"
      >
        <FontAwesomeIcon
          icon={faUserCircle}
          className="w-8 h-8 text-[#4a5568]"
        />
        <span className="font-poppins text-[#4a5568]">{userName}</span>
        <FontAwesomeIcon icon={faChevronDown} className="text-[#4a5568]" />
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-[#e1e8ff]">
          <button
            onClick={() => navigate("/profile")}
            className="block w-full text-left px-4 py-2 text-[#4a5568] hover:bg-[#f8faff] font-poppins"
          >
            <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
            Profile
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="block w-full text-left px-4 py-2 text-[#4a5568] hover:bg-[#f8faff] font-poppins"
          >
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            Settings
          </button>
          {role !== "patient" && (
            <button
              onClick={() => navigate("team-chat")}
              className="block w-full text-left px-4 py-2 text-[#4a5568] hover:bg-[#f8faff] font-poppins"
            >
              <FontAwesomeIcon icon={faComments} className="mr-2" />
              Team Chat
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="block w-full text-left px-4 py-2 text-[#4a5568] hover:bg-[#f8faff] font-poppins"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

ProfileMenu.propTypes = {
  isProfileOpen: PropTypes.bool.isRequired,
  toggleProfile: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default ProfileMenu;
