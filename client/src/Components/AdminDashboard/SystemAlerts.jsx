import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faExclamationTriangle,
  faExclamationCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi } from "../../hooks/useApi";
import { pathForResource } from "../../utils/notifications";
import { relativeTime } from "../../utils/format";
import { TONE_CLASSES } from "../../utils/status";
import AsyncContent, { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

const SEVERITY_STYLES = {
  info: { tone: "info", icon: faInfoCircle },
  warning: { tone: "warning", icon: faExclamationTriangle },
  critical: { tone: "danger", icon: faExclamationCircle },
};

// Active operational alerts (GET /system-alerts?status=active) with a resolve button.
function SystemAlerts() {
  const { user, can } = useAuth();
  const alerts = useApi(() =>
    api.listSystemAlerts({ status: "active", limit: 5 })
  );
  const resolve = useAction(async (id) => {
    await api.resolveSystemAlert(id);
    alerts.setData({
      ...alerts.data,
      data: alerts.data.data.filter((a) => a.id !== id),
    });
  });
  const items = alerts.data?.data ?? [];

  return (
    <Card title="System Alerts" titleSize="lg">
      <ErrorMessage error={resolve.error} className="mb-3" />
      <AsyncContent
        {...alerts}
        empty={items.length === 0}
        emptyText="No active alerts."
      >
        <div className="space-y-4">
          {items.map((alert) => {
            const style =
              SEVERITY_STYLES[alert.severity] ?? SEVERITY_STYLES.info;
            const link = pathForResource(alert.resource, user.role);
            return (
              <div
                key={alert.id}
                className="flex items-start space-x-3 p-3 bg-surface rounded-lg"
              >
                <div
                  className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
                    TONE_CLASSES[style.tone]
                  }`}
                >
                  <FontAwesomeIcon icon={style.icon} />
                </div>
                <div className="flex-1">
                  <p className="font-poppins text-sm font-semibold text-primary">
                    {link ? <Link to={link}>{alert.title}</Link> : alert.title}
                  </p>
                  <p className="font-poppins text-sm text-ink">
                    {alert.message}
                  </p>
                  <p className="font-poppins text-xs text-ink opacity-75">
                    {relativeTime(alert.createdAt)}
                  </p>
                </div>
                {can("system-alert:manage") && (
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={resolve.busy}
                    onClick={() => resolve.run(alert.id)}
                  >
                    Resolve
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </AsyncContent>
    </Card>
  );
}

export default SystemAlerts;
