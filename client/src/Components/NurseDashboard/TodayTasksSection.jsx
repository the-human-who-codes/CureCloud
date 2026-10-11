import PropTypes from "prop-types";

const TodayTasksSection = ({ tasks, onStart = () => {} }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
    <h2 className="text-xl font-semibold text-[#2c4ecf] mb-4">
      Today&apos;s Tasks
    </h2>
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 bg-[#f8faff] rounded-lg">
          <p className="text-[#2c4ecf]">{task.name}</p>
          <button onClick={() => onStart(task)}>Start</button>
        </div>
      ))}
    </div>
  </div>
);

TodayTasksSection.propTypes = {
  tasks: PropTypes.array.isRequired,
  onStart: PropTypes.func,
};

export default TodayTasksSection;
