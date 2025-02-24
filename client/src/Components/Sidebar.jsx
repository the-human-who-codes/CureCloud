import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faCalendarAlt,
  faPrescriptionBottleAlt,
  faFileMedicalAlt,
  faCog,
  faProcedures,
  faTasks,
  faPills,
  faComments,
  faUsersCog,
  faHospital,
  faAngleRight,
  faAngleLeft,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ userRole = "doctor" }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const menuItemsByRole = {
    doctor: [
      { name: "Dashboard", icon: faChartLine, path: "/doctor/dashboard" },
      {
        name: "Patient Records",
        icon: faUsers,
        path: "/doctor/patient-records",
      },
      {
        name: "Appointments",
        icon: faCalendarAlt,
        path: "/doctor/appointments",
      },
      {
        name: "Prescriptions",
        icon: faPrescriptionBottleAlt,
        path: "/doctor/prescriptions",
      },
      { name: "Reports", icon: faFileMedicalAlt, path: "/doctor/reports" },
      { name: "Settings", icon: faCog, path: "/doctor/settings" },
    ],
    nurse: [
      { name: "Dashboard", icon: faChartLine, path: "/nurse/dashboard" },
      { name: "My Patients", icon: faProcedures, path: "/nurse/my-patients" },
      { name: "Tasks", icon: faTasks, path: "/nurse/tasks" },
      { name: "Medications", icon: faPills, path: "/nurse/medications" },
      { name: "Reports", icon: faFileMedicalAlt, path: "/nurse/reports" },
      { name: "Team Chat", icon: faComments, path: "/nurse/team-chat" },
      { name: "Settings", icon: faCog, path: "/nurse/settings" },
    ],
    admin: [
      { name: "Dashboard", icon: faChartLine, path: "/admin/dashboard" },
      {
        name: "User Management",
        icon: faUsersCog,
        path: "/admin/user-management",
      },
      {
        name: "Department Settings",
        icon: faHospital,
        path: "/admin/department-settings",
      },
      { name: "Reports", icon: faFileMedicalAlt, path: "/admin/reports" },
      { name: "System Settings", icon: faCog, path: "/admin/system-settings" },
    ],
    patient: [
      { name: "Dashboard", icon: faChartLine, path: "/patient/dashboard" },
      {
        name: "Appointments",
        icon: faCalendarAlt,
        path: "/patient/appointments",
      },
      {
        name: "Prescriptions",
        icon: faPrescriptionBottleAlt,
        path: "/patient/prescriptions",
      },
      {
        name: "Medical Records",
        icon: faHistory,
        path: "/patient/medical-records",
      },
      { name: "Settings", icon: faCog, path: "/patient/settings" },
    ],
  };

  const menuItems = menuItemsByRole[userRole] || menuItemsByRole.doctor;

  return (
    <>
      {/* Desktop Sidebar (Hidden on small screens) */}
      <div
        className={`hidden md:flex min-h-screen bg-[#f8faff] ${
          isCollapsed ? "w-20" : "w-64"
        } transition-all duration-300 shadow-lg z-[100] overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b border-[#e1e8ff]">
            {!isCollapsed && (
              <h1 className="text-[#2c4ecf] font-poppins font-bold text-xl">
                CureCloud
              </h1>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-[#2c4ecf] hover:text-[#1a3baf] p-2 rounded-lg"
            >
              <FontAwesomeIcon
                icon={isCollapsed ? faAngleRight : faAngleLeft}
              />
            </button>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-[#2c4ecf] text-white"
                          : "text-[#4a5568] hover:bg-[#e1e8ff]"
                      }`
                    }
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-5" />
                    {!isCollapsed && (
                      <span className="ml-3 font-poppins">{item.name}</span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Hidden on larger screens) */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white shadow-lg border-t border-gray-300 p-2 z-[100] overflow-x-auto">
        <nav className="flex justify-around">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center text-sm p-2 ${
                  isActive
                    ? "text-[#2c4ecf]"
                    : "text-gray-500 hover:text-[#1a3baf]"
                }`
              }
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              <span className="text-xs">{item.name.split(" ")[0]}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation (Hidden on larger screens) */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white shadow-lg border-t border-gray-300 p-2">
        <nav className="flex justify-around">
          {menuItems.slice(0, 4).map(
            (
              item // Show only 4 items for space
            ) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center text-sm p-2 ${
                    isActive
                      ? "text-[#2c4ecf]"
                      : "text-gray-500 hover:text-[#1a3baf]"
                  }`
                }
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                <span className="text-xs">{item.name.split(" ")[0]}</span>
              </NavLink>
            )
          )}
        </nav>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  userRole: PropTypes.oneOf(["doctor", "nurse", "admin", "patient"]),
};

export default Sidebar;
