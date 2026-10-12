import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NotificationBell from "./NotificationBell";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../../auth/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { api } from "../../api/client";

const Header = ({ role }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuth();
  const { data: unread } = useApi(() => api.getUnreadNotificationCount());

  return (
    <header className="sticky top-0 bg-white shadow-sm px-6 py-3 z-50">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        <Logo role={role} />

        {role !== "patient" && <SearchBar role={role} />}

        <div className="flex items-center space-x-4">
          <NotificationBell notificationCount={unread?.count ?? 0} />
          <ProfileMenu
            isProfileOpen={isProfileOpen}
            toggleProfile={setIsProfileOpen}
            userName={user?.name ?? ""}
            photoUrl={user?.photoUrl ?? undefined}
            role={role}
          />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  role: PropTypes.oneOf(["admin", "doctor", "nurse", "patient"]).isRequired,
};

export default Header;
