import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import { labelFor } from "../../utils/format";
import AsyncContent from "../common/AsyncContent";
import { Card } from "../common/Card";
import { BarList } from "../Reports/ReportsPage";

// Demographics and appointment distribution from GET /reports/summary (last 30 days). The admin
// dashboard shows no clinical aggregates (§2.18).
function Analytics() {
  const report = useApi(() => api.getReportSummary());
  const r = report.data;
  return (
    <AsyncContent loading={report.loading} error={report.error}>
      {r && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Patients by sex" titleSize="lg">
            <BarList
              entries={Object.entries(r.patients.bySex).map(([k, v]) => [
                labelFor(k),
                v,
              ])}
            />
          </Card>
          <Card title="Patients by age" titleSize="lg">
            <BarList entries={Object.entries(r.patients.byAgeGroup)} />
          </Card>
          <Card title="Appointment distribution" titleSize="lg">
            <BarList
              entries={Object.entries(r.appointments.byStatus).map(([k, v]) => [
                labelFor(k),
                v,
              ])}
            />
          </Card>
        </div>
      )}
    </AsyncContent>
  );
}

export default Analytics;
