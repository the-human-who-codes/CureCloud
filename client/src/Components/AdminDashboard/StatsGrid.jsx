import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faUsers,
  faCalendarCheck,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";

function StatsGrid({ statsData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Object.entries(statsData).map(([key, value]) => (
        <div
          key={key}
          className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-poppins text-[#4a5568] text-sm">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </p>
              <p className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                {value}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#f8faff] flex items-center justify-center">
              <FontAwesomeIcon
                icon={
                  key.includes("Doctors")
                    ? faUserMd
                    : key.includes("Patients")
                    ? faUsers
                    : key.includes("Appointments")
                    ? faCalendarCheck
                    : faChartPie
                }
                className="text-[#2c4ecf] text-xl"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

StatsGrid.propTypes = {
  statsData: PropTypes.object.isRequired,
};

export default StatsGrid;
