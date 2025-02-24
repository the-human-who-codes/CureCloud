import { MockData } from "../../data/MockData";
import HealthStatsCard from "./HealthStatsCard";

const HealthStatsGrid = () => {
  let healthStats = MockData.healthStats;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Object.entries(healthStats).map(([key, value]) => (
        <HealthStatsCard key={key} statKey={key} value={value} />
      ))}
    </div>
  );
};

export default HealthStatsGrid;
