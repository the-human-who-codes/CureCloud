import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";

const Header = ({ onSearch, notificationCount, userName, role }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <header className="sticky top-0 bg-white shadow-sm px-6 py-3 z-50">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        <Logo />

        {/* Conditionally render the search bar based on role */}
        {role !== "patient" && (
          <SearchBar
            searchTerm={searchTerm}
            onSearch={onSearch}
            setSearchTerm={setSearchTerm}
          />
        )}

        <div className="flex items-center space-x-4">
          <NotificationBell notificationCount={notificationCount} />
          <ProfileMenu
            isProfileOpen={isProfileOpen}
            toggleProfile={toggleProfile}
            userName={userName}
          />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func,
  notificationCount: PropTypes.number,
  userName: PropTypes.string,
  role: PropTypes.string, // can be 'doctor' or 'patient'
};

export default Header;
