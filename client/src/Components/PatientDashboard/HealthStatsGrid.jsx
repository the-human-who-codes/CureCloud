import { useAuth } from "../../auth/AuthProvider";
import { healthStatsFromVitals } from "../../utils/format";
import HealthStatsCard from "./HealthStatsCard";

const HealthStatsGrid = () => {
  const { patient } = useAuth();
  const healthStats = healthStatsFromVitals(patient?.vitals);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Object.entries(healthStats).map(([key, value]) => (
        <HealthStatsCard key={key} statKey={key} value={value} />
      ))}
    </div>
  );
};

export default HealthStatsGrid;
