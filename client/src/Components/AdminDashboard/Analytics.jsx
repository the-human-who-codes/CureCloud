import { Card } from "../common/Card";

const CHARTS = [
  "Patient Demographics",
  "Appointment Distribution",
  "Revenue Analytics",
  "Resource Utilization",
];

function Analytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {CHARTS.map((title) => (
        <Card key={title} title={title} titleSize="lg">
          <div className="h-[200px] bg-surface rounded-lg"></div>
        </Card>
      ))}
    </div>
  );
}

export default Analytics;
