import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";

function SystemAlerts({ systemAlerts }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
      <h2 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
        System Alerts
      </h2>
      <div className="space-y-4">
        {systemAlerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 bg-[#f8faff] rounded-lg"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                alert.type === "warning"
                  ? "bg-yellow-100 text-yellow-800"
                  : alert.type === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              <FontAwesomeIcon
                icon={
                  alert.type === "warning"
                    ? faExclamationTriangle
                    : alert.type === "error"
                    ? faExclamationCircle
                    : faCheckCircle
                }
              />
            </div>
            <div className="flex-1">
              <p className="font-poppins text-sm text-[#4a5568]">
                {alert.message}
              </p>
              <p className="font-poppins text-xs text-[#4a5568] opacity-75">
                {alert.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

SystemAlerts.propTypes = {
  systemAlerts: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["warning", "error", "success"]).isRequired,
      message: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SystemAlerts;
