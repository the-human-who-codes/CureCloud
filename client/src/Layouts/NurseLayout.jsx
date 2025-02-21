import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar";

const NurseLayout = () => {
  return (
    <div className="dashboard-layout">
      <Header role={"nurse"} />
      <div className="main-content">
        <Sidebar userRole="nurse" />
        <div className="page-content">
          <Outlet /> {/* Selected Admin Page Loads Here */}
        </div>
      </div>
    </div>
  );
};

export default NurseLayout;
