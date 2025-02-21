import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="dashboard-layout">
      <Header role={"doctor"} />
      <div className="main-content">
        <Sidebar userRole="doctor" />
        <div className="page-content">
          <Outlet /> {/* Selected Admin Page Loads Here */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
