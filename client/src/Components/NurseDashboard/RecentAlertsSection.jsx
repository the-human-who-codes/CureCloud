import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Card } from "../common/Card";

const RecentAlertsSection = ({ alerts }) => {
  return (
    <Card title="Recent Alerts">
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-center p-4 rounded-lg hover:bg-surface transition-colors duration-200"
          >
            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faBell} className="text-primary text-xl" />
            </div>
            <div>
              <p className="font-poppins text-ink text-sm">{alert.title}</p>
              <p className="font-poppins text-ink text-xs">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
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
