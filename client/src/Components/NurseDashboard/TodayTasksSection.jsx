import PropTypes from "prop-types";
import { Card } from "../common/Card";

const TodayTasksSection = ({ tasks, onStart = () => {} }) => (
  <Card title="Today's Tasks">
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 bg-surface rounded-lg">
          <p className="text-primary">{task.name}</p>
          <button onClick={() => onStart(task)}>Start</button>
        </div>
      ))}
    </div>
  </Card>
);

TodayTasksSection.propTypes = {
  tasks: PropTypes.array.isRequired,
  onStart: PropTypes.func,
};

export default TodayTasksSection;
