import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";
import "./Layout.css"; // Import the CSS file

const AdminLayout = () => {
  return (
    <div className="dashboard-layout">
      <Header role="admin" />
      <div className="main-content">
        <Sidebar userRole="admin" />
        <div className="page-content">
          <Outlet /> {/* Selected Admin Page Loads Here */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
