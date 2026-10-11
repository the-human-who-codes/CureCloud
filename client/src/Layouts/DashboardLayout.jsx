import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";
import "./Layout.css";

// Header + role-specific sidebar around the selected dashboard page.
function DashboardLayout({ role }) {
  return (
    <div className="dashboard-layout">
      <Header role={role} />
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
