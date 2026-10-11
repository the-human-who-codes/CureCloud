import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";
import { Card } from "../common/Card";
import { TONE_CLASSES } from "../../utils/status";

const ALERT_STYLES = {
  warning: { tone: "warning", icon: faExclamationTriangle },
  error: { tone: "danger", icon: faExclamationCircle },
  success: { tone: "success", icon: faCheckCircle },
};

function SystemAlerts({ systemAlerts }) {
  return (
    <Card title="System Alerts" titleSize="lg">
      <div className="space-y-4">
        {systemAlerts.map((alert, index) => {
          const style = ALERT_STYLES[alert.type] ?? ALERT_STYLES.success;
          return (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-surface rounded-lg"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  TONE_CLASSES[style.tone]
                }`}
              >
                <FontAwesomeIcon icon={style.icon} />
              </div>
              <div className="flex-1">
                <p className="font-poppins text-sm text-ink">{alert.message}</p>
                <p className="font-poppins text-xs text-ink opacity-75">
                  {alert.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
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
