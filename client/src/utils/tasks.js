export const TASK_CATEGORIES = [
  "vitals",
  "medication",
  "assessment",
  "wound-care",
  "hygiene",
  "mobility",
  "specimen",
  "doctor-round",
  "admin",
  "other",
];
export const TASK_PRIORITIES = ["urgent", "high", "normal", "low"];

// Actions on a task for the signed-in user (transitions in docs/domain-model.md §2.10).
export function taskActions(task, user) {
  const mine = task.assigneeId === user.id;
  const open = task.status === "open";
  const inProgress = task.status === "in-progress";
  return {
    claim: open && !task.assigneeId && user.role === "nurse",
    start: open,
    release: inProgress && mine,
    complete: inProgress,
    cancel:
      (open || inProgress) &&
      (task.createdBy === user.id || user.role === "doctor"),
  };
}

export const isOverdue = (task) =>
  (task.status === "open" || task.status === "in-progress") &&
  Date.parse(task.dueAt) < Date.now();
