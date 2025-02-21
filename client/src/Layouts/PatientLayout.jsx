import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";

const PatientLayout = () => {
  return (
    <div className="dashboard-layout">
      <Header role={"patient"} />
      <div className="main-content">
        <Sidebar userRole="patient" />
        <div className="page-content">
          <Outlet /> {/* Selected Admin Page Loads Here */}
        </div>
      </div>
    </div>
  );
};

export default PatientLayout;
