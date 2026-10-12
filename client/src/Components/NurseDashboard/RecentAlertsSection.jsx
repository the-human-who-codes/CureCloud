import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faPills,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { relativeTime } from "../../utils/format";
import { Card } from "../common/Card";
import { EmptyState } from "../common/AsyncContent";

const ICONS = {
  "critical-patient": faExclamationTriangle,
  "overdue-medication": faPills,
  "overdue-task": faTasks,
};

// Alerts from GET /dashboard (critical patients, overdue doses and tasks).
const RecentAlertsSection = ({ alerts }) => {
  return (
    <Card title="Recent Alerts">
      {alerts.length === 0 ? (
        <EmptyState>No alerts right now.</EmptyState>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={`${alert.type}-${alert.patientId ?? ""}-${index}`}
              className="flex items-center p-4 rounded-lg hover:bg-surface transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mr-4 shrink-0">
                <FontAwesomeIcon
                  icon={ICONS[alert.type] ?? faExclamationTriangle}
                  className="text-red-600 text-xl"
                />
              </div>
              <div>
                <p className="font-poppins text-ink text-sm">{alert.message}</p>
                <p className="font-poppins text-ink text-xs">
                  {relativeTime(alert.at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

RecentAlertsSection.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      patientId: PropTypes.string,
      message: PropTypes.string.isRequired,
      at: PropTypes.string,
    })
  ).isRequired,
};

export default RecentAlertsSection;
