import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../../auth/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { api } from "../../api/client";

const Header = ({ onSearch, notificationCount, userName, role }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const { data: unread } = useApi(() =>
    api.listNotifications({ unread: "true" })
  );

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <header className="sticky top-0 bg-white shadow-sm px-6 py-3 z-50">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        <Logo role={role} />

        {/* Conditionally render the search bar based on role */}
        {role !== "patient" && (
          <SearchBar
            searchTerm={searchTerm}
            onSearch={onSearch}
            setSearchTerm={setSearchTerm}
          />
        )}

        <div className="flex items-center space-x-4">
          <NotificationBell
            role={role}
            notificationCount={
              notificationCount ?? unread?.notifications.length ?? 0
            }
          />
          <ProfileMenu
            isProfileOpen={isProfileOpen}
            toggleProfile={toggleProfile}
            userName={userName ?? user?.name ?? ""}
            role={role}
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
