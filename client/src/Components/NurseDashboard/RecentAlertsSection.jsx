import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const RecentAlertsSection = ({ alerts }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Recent Alerts
      </h2>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-center p-4 rounded-lg hover:bg-[#f8faff] transition-colors duration-200"
          >
            <div className="w-12 h-12 rounded-full bg-[#f8faff] flex items-center justify-center mr-4">
              <FontAwesomeIcon
                icon={faBell}
                className="text-[#2c4ecf] text-xl"
              />
            </div>
            <div>
              <p className="font-poppins text-[#4a5568] text-sm">
                {alert.title}
              </p>
              <p className="font-poppins text-[#4a5568] text-xs">
                {alert.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

RecentAlertsSection.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecentAlertsSection;
