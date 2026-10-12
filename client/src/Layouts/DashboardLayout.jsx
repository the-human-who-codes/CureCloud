import { useEffect } from "react";
import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";
import { api } from "../api/client";
import { useAuth } from "../auth/AuthProvider";
import { useApi } from "../hooks/useApi";
import "./Layout.css";

const ACTIVITY_EVENTS = ["mousedown", "keydown", "touchstart", "scroll"];

// Signs out after `minutes` without input (system setting security.sessionTimeoutMinutes).
function useIdleSignOut(minutes) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!minutes) return undefined;
    let timer;
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        await signOut();
        navigate("/");
      }, minutes * 60e3);
    };
    reset();
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, reset, true));
    return () => {
      clearTimeout(timer);
      ACTIVITY_EVENTS.forEach((e) =>
        window.removeEventListener(e, reset, true)
      );
    };
  }, [minutes, signOut, navigate]);
}

// Header + role-specific sidebar around the selected dashboard page, with the system-wide
// maintenance banner.
function DashboardLayout({ role }) {
  const settings = useApi(() => api.getSystemSettings());
  useIdleSignOut(settings.data?.security.sessionTimeoutMinutes);
  const banner = settings.data?.maintenanceBanner;

  return (
    <div className="dashboard-layout">
      <Header role={role} />
      {banner && (
        <div
          role="status"
          className="bg-yellow-50 text-yellow-800 font-poppins text-sm px-6 py-2 text-center"
        >
          {banner}
        </div>
      )}
      <div className="main-content">
        <Sidebar userRole={role} />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

DashboardLayout.propTypes = {
  role: PropTypes.oneOf(["admin", "doctor", "nurse", "patient"]).isRequired,
};

export default DashboardLayout;
