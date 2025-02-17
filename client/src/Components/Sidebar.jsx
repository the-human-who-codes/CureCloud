import { useState } from "react";
import PropTypes from "prop-types";
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
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ activePage = "Dashboard", userRole = "doctor" }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItemsByRole = {
    doctor: [
      { name: "Dashboard", icon: faChartLine },
      { name: "Patient Records", icon: faUsers },
      { name: "Appointments", icon: faCalendarAlt },
      { name: "Prescriptions", icon: faPrescriptionBottleAlt },
      { name: "Reports", icon: faFileMedicalAlt },
      { name: "Settings", icon: faCog },
    ],
    nurse: [
      { name: "Dashboard", icon: faChartLine },
      { name: "My Patients", icon: faProcedures },
      { name: "Tasks", icon: faTasks },
      { name: "Medications", icon: faPills },
      { name: "Reports", icon: faFileMedicalAlt },
      { name: "Team Chat", icon: faComments },
      { name: "Settings", icon: faCog },
    ],
    admin: [
      { name: "Dashboard", icon: faChartLine },
      { name: "User Management", icon: faUsersCog },
      { name: "Department Settings", icon: faHospital },
      { name: "Reports", icon: faFileMedicalAlt },
      { name: "System Settings", icon: faCog },
    ],
    patient: [
      // Added patient sidebar options
      { name: "Dashboard", icon: faChartLine },
      { name: "Appointments", icon: faCalendarAlt },
      { name: "Prescriptions", icon: faPrescriptionBottleAlt },
      { name: "Medical Records", icon: faFileMedicalAlt },
      { name: "Messages", icon: faComments },
      { name: "Settings", icon: faCog },
    ],
  };

  const menuItems = menuItemsByRole[userRole] || menuItemsByRole.doctor;

  return (
    <div
      className={`min-h-screen bg-[#f8faff] ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300 shadow-lg`}
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
            <FontAwesomeIcon icon={isCollapsed ? faAngleRight : faAngleLeft} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className={`flex items-center p-3 rounded-lg transition-all duration-200
                    ${
                      activePage === item.name
                        ? "bg-[#2c4ecf] text-white"
                        : "text-[#4a5568] hover:bg-[#e1e8ff]"
                    }
                  `}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5" />
                  {!isCollapsed && (
                    <span className="ml-3 font-poppins">{item.name}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  activePage: PropTypes.string,
  userRole: PropTypes.oneOf(["doctor", "nurse", "admin", "patient"]),
};

export default Sidebar;
