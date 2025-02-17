import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faChevronDown,
  faUserCircle,
  faCog,
  faSignOutAlt,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";

function Header({
  onSearch = () => {},
  notificationCount = 0,
  userName = "Dr. Smith",
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="sticky top-0 bg-white shadow-sm px-6 py-3 z-50">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faHeartPulse}
            className="text-xl text-[#2c4ecf]"
          />
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients, appointments, records..."
              className="w-full px-4 py-2 pl-10 bg-[#f8faff] border border-[#e1e8ff] rounded-lg focus:outline-none focus:border-[#2c4ecf] font-poppins"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568]"
            />
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
              <FontAwesomeIcon icon={faBell} className="text-xl" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-2 hover:bg-[#f8faff] rounded-lg"
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                className="w-8 h-8 text-[#4a5568]"
              />
              <span className="font-poppins text-[#4a5568]">{userName}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="text-[#4a5568]"
              />
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
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func,
  notificationCount: PropTypes.number,
  userName: PropTypes.string,
};

export default Header;
