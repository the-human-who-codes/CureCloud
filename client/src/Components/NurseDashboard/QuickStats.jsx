import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faPills,
  faExclamationTriangle,
  faHospitalUser,
} from "@fortawesome/free-solid-svg-icons";

const getIcon = (key) => {
  const icons = {
    patientsUnderCare: faHospitalUser,
    tasksForToday: faTasks,
    upcomingMedications: faPills,
    criticalAlerts: faExclamationTriangle,
  };
  return <FontAwesomeIcon icon={icons[key]} className="text-primary text-xl" />;
};

const QuickStats = ({ stats }) => {
  QuickStats.propTypes = {
    stats: PropTypes.object.isRequired,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Object.entries(stats).map(([key, value]) => (
        <div
          key={key}
          className="bg-white rounded-xl p-6 shadow-sm border border-line"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-ink">
                {key.replace(/([A-Z])/g, " $1")}
              </p>
              <p className="text-2xl font-bold text-primary">{value}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
              {getIcon(key)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

import PropTypes from "prop-types";

export default QuickStats;
