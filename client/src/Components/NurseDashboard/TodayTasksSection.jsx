import PropTypes from "prop-types";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction } from "../../hooks/useApi";
import { formatTime } from "../../utils/format";
import { isOverdue, taskActions } from "../../utils/tasks";
import AsyncContent, { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import StatusBadge from "../common/StatusBadge";

// The nurse's open tasks due today. "Start" moves a task to in-progress, "Done" completes it.
const TodayTasksSection = ({ tasks }) => {
  const { user } = useAuth();
  const update = useAction(async (task, status) => {
    const saved = await api.updateCareTask(task.id, { status });
    tasks.setData({
      ...tasks.data,
      data:
        status === "completed"
          ? tasks.data.data.filter((t) => t.id !== task.id)
          : tasks.data.data.map((t) => (t.id === saved.id ? saved : t)),
    });
  });
  const items = tasks.data?.data ?? [];

  return (
    <Card title="Today's Tasks">
      <ErrorMessage error={update.error} className="mb-4" />
      <AsyncContent
        {...tasks}
        empty={items.length === 0}
        emptyText="No open tasks due today."
      >
        <div className="space-y-4">
          {items.map((task) => {
            const allowed = taskActions(task, user);
            return (
              <div
                key={task.id}
                className="p-4 bg-surface rounded-lg flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-poppins text-primary font-medium">
                    {task.title}
                  </p>
                  <p className="font-poppins text-sm text-ink">
                    {task.patientName ?? "Ward task"} · due{" "}
                    {formatTime(task.dueAt)}
                    {isOverdue(task) && (
                      <span className="text-red-600"> (overdue)</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={task.priority} size="sm" />
                  {allowed.start && (
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={update.busy}
                      onClick={() => update.run(task, "in-progress")}
                    >
                      Start
                    </Button>
                  )}
                  {allowed.complete && (
                    <Button
                      size="sm"
                      disabled={update.busy}
                      onClick={() => update.run(task, "completed")}
                    >
                      Done
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </AsyncContent>
    </Card>
  );
};

TodayTasksSection.propTypes = {
  tasks: PropTypes.object.isRequired,
};

export default TodayTasksSection;
