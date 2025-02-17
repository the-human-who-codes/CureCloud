import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCog,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const ProfileMenu = ({ isProfileOpen, toggleProfile, userName }) => (
  <div className="relative">
    <button
      onClick={toggleProfile}
      className="flex items-center space-x-3 p-2 hover:bg-[#f8faff] rounded-lg"
    >
      <FontAwesomeIcon icon={faUserCircle} className="w-8 h-8 text-[#4a5568]" />
      <span className="font-poppins text-[#4a5568]">{userName}</span>
      <FontAwesomeIcon icon={faChevronDown} className="text-[#4a5568]" />
    </button>

    {isProfileOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-[#e1e8ff]">
        <a
          href="#"
          className="block px-4 py-2 text-[#4a5568] hover:bg-[#f8faff] font-poppins"
        >
          <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
          Profile
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-[#4a5568] hover:bg-[#f8faff] font-poppins"
        >
          <FontAwesomeIcon icon={faCog} className="mr-2" />
          Settings
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-[#4a5568] hover:bg-[#f8faff] font-poppins"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </a>
      </div>
    )}
  </div>
);

ProfileMenu.propTypes = {
  isProfileOpen: PropTypes.bool.isRequired,
  toggleProfile: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default ProfileMenu;
