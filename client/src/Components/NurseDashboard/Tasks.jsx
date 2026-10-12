import { useState } from "react";
import PropTypes from "prop-types";
import {
  faArrowDown,
  faArrowUp,
  faCheckCircle,
  faExclamationCircle,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi, usePagedApi } from "../../hooks/useApi";
import {
  addDays,
  formatDateTime,
  formatTime,
  fromLocalInput,
  labelFor,
  longDate,
  sastInstant,
  sastTime,
  toLocalInput,
  todaySast,
} from "../../utils/format";
import {
  TASK_CATEGORIES,
  TASK_PRIORITIES,
  isOverdue,
  taskActions,
} from "../../utils/tasks";
import { checks, validate } from "../../utils/validation";
import AsyncContent, { ErrorMessage, LoadMore } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card, SectionTitle } from "../common/Card";
import { Checkbox, FilterSelect, FormField } from "../common/FormField";
import Modal from "../common/Modal";
import { PageHeader, PageShell } from "../common/PageShell";
import ReasonModal from "../common/ReasonModal";
import { PatientPicker } from "../common/SearchPicker";
import { StatCard } from "../common/StatCard";
import StatusBadge from "../common/StatusBadge";

const PRIORITY_ICONS = {
  urgent: faExclamationCircle,
  high: faArrowUp,
  normal: faMinus,
  low: faArrowDown,
};
const PRIORITY_TONES = { urgent: "danger", high: "warning" };

// Timeframe select -> dueBefore (end of today or of tomorrow, SAST).
const dueBefore = (timeframe) =>
  timeframe === "all"
    ? undefined
    : sastInstant(addDays(todaySast(), timeframe === "tomorrow" ? 2 : 1));

// New care task: patient task (department from the admission) or ward-level task (§2.10).
function TaskForm({ onClose, onSaved }) {
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "vitals",
    priority: "normal",
    dueAt: toLocalInput(new Date(Date.now() + 3600e3).toISOString()),
    assignToMe: true,
  });
  const [errors, setErrors] = useState({});
  const ward = !patient;
  const save = useAction(async () => {
    const task = await api.createCareTask({
      title: form.title.trim(),
      ...(form.description.trim() && { description: form.description.trim() }),
      category: form.category,
      priority: form.priority,
      dueAt: fromLocalInput(form.dueAt),
      ...(patient
        ? { patientId: patient.id }
        : { departmentId: user.departmentId }),
      ...(form.assignToMe && { assigneeId: user.id }),
    });
    onSaved(task);
    onClose();
  });
  const submit = (e) => {
    e.preventDefault();
    const found = validate(form, {
      title: [checks.required, checks.maxLength(200)],
      description: checks.maxLength(2000),
      dueAt: checks.required,
    });
    if (ward && !user.departmentId)
      found.patient =
        "Choose a patient (you have no department for ward tasks)";
    setErrors(found);
    if (!Object.keys(found).length) save.run();
  };
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <Modal
      title="New Task"
      onClose={onClose}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="task-form" disabled={save.busy}>
            {save.busy ? "Saving…" : "Create task"}
          </Button>
        </>
      }
    >
      <form id="task-form" onSubmit={submit} noValidate className="space-y-4">
        <ErrorMessage error={save.error} />
        <PatientPicker
          label="Patient (leave empty for a ward task)"
          value={patient}
          onChange={setPatient}
          error={errors.patient}
        />
        <FormField
          label="Title"
          value={form.title}
          maxLength={200}
          error={errors.title}
          onChange={set("title")}
        />
        <FormField
          as="textarea"
          rows={2}
          label="Description"
          value={form.description}
          maxLength={2000}
          error={errors.description}
          onChange={set("description")}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            as="select"
            label="Category"
            value={form.category}
            onChange={set("category")}
          >
            {TASK_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {labelFor(c)}
              </option>
            ))}
          </FormField>
          <FormField
            as="select"
            label="Priority"
            value={form.priority}
            onChange={set("priority")}
          >
            {TASK_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {labelFor(p)}
              </option>
            ))}
          </FormField>
          <FormField
            label="Due"
            type="datetime-local"
            value={form.dueAt}
            error={errors.dueAt}
            onChange={set("dueAt")}
          />
        </div>
        <Checkbox
          label="Assign to me"
          checked={form.assignToMe}
          onChange={(on) => setForm({ ...form, assignToMe: on })}
        />
      </form>
    </Modal>
  );
}

TaskForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

function TaskRow({ task, onChanged }) {
  const { user } = useAuth();
  const [dialog, setDialog] = useState(null);
  const allowed = taskActions(task, user);
  const update = useAction(async (changes) =>
    onChanged(await api.updateCareTask(task.id, changes))
  );
  return (
    <div className="p-4 bg-surface rounded-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-poppins font-medium text-primary">{task.title}</p>
          <p className="font-poppins text-sm text-ink">
            {task.patientName ?? "Ward task"} · {labelFor(task.category)} · due{" "}
            {formatDateTime(task.dueAt)}
            {isOverdue(task) && (
              <span className="text-red-600"> (overdue)</span>
            )}
          </p>
          {task.description && (
            <p className="font-poppins text-sm text-ink mt-1">
              {task.description}
            </p>
          )}
          <p className="font-poppins text-xs text-ink-muted mt-1">
            {task.assigneeName
              ? `Assigned to ${task.assigneeName}`
              : "Unassigned"}
          </p>
        </div>
        <StatusBadge status={task.status} size="sm" />
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {allowed.claim && (
          <Button
            size="sm"
            variant="secondary"
            disabled={update.busy}
            onClick={() => update.run({ assigneeId: user.id })}
          >
            Claim
          </Button>
        )}
        {allowed.start && (
          <Button
            size="sm"
            variant="secondary"
            disabled={update.busy}
            onClick={() => update.run({ status: "in-progress" })}
          >
            Start
          </Button>
        )}
        {allowed.release && (
          <Button
            size="sm"
            variant="secondary"
            disabled={update.busy}
            onClick={() => update.run({ status: "open" })}
          >
            Release
          </Button>
        )}
        {allowed.complete && (
          <Button
            size="sm"
            disabled={update.busy}
            onClick={() => setDialog("complete")}
          >
            Complete
          </Button>
        )}
        {allowed.cancel && (
          <Button
            size="sm"
            variant="danger"
            onClick={() => setDialog("cancel")}
          >
            Cancel
          </Button>
        )}
      </div>
      {update.error && (
        <p className="mt-2 font-poppins text-xs text-red-600">
          {update.error.message}
        </p>
      )}
      {dialog && (
        <ReasonModal
          title={dialog === "complete" ? "Complete task" : "Cancel task"}
          label={
            dialog === "complete" ? "Completion note (optional)" : "Reason"
          }
          confirmLabel={dialog === "complete" ? "Complete" : "Cancel task"}
          required={dialog === "cancel"}
          maxLength={1000}
          onClose={() => setDialog(null)}
          onSubmit={async (note) =>
            onChanged(
              await api.updateCareTask(task.id, {
                status: dialog === "complete" ? "completed" : "cancelled",
                ...(note && { completionNote: note }),
              })
            )
          }
        />
      )}
    </div>
  );
}

TaskRow.propTypes = {
  task: PropTypes.object.isRequired,
  onChanged: PropTypes.func.isRequired,
};

// The nurse's department tasks (API default scope), grouped by priority.
function Tasks() {
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const [creating, setCreating] = useState(false);

  const tasks = usePagedApi(
    (cursor) =>
      api.listCareTasks({
        status: "open,in-progress",
        priority: selectedPriority === "all" ? undefined : selectedPriority,
        dueBefore: dueBefore(selectedTimeframe),
        limit: 50,
        cursor,
      }),
    [selectedPriority, selectedTimeframe]
  );
  const completedToday = useApi(() =>
    api.listCareTasks({
      completedBy: "me",
      completedAfter: sastInstant(todaySast()),
      limit: 100,
    })
  );

  const changed = (task) => {
    const stillOpen = task.status === "open" || task.status === "in-progress";
    tasks.setItems((items) =>
      stillOpen
        ? items.map((t) => (t.id === task.id ? task : t))
        : items.filter((t) => t.id !== task.id)
    );
    if (task.status === "completed") completedToday.reload();
  };

  const counts = Object.fromEntries(
    TASK_PRIORITIES.map((p) => [
      p,
      tasks.items.filter((t) => t.priority === p).length,
    ])
  );
  // "Today's schedule": loaded tasks grouped by the hour they are due.
  const byHour = Object.entries(
    tasks.items.reduce((acc, t) => {
      const hour = `${sastTime(t.dueAt).slice(0, 2)}:00`;
      acc[hour] = [...(acc[hour] ?? []), t];
      return acc;
    }, {})
  ).sort(([a], [b]) => a.localeCompare(b));

  return (
    <PageShell>
      <PageHeader
        title="Tasks"
        subtitle={longDate()}
        actions={
          <Button icon={faPlus} onClick={() => setCreating(true)}>
            New Task
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {TASK_PRIORITIES.map((p) => (
          <StatCard
            key={p}
            label={labelFor(p)}
            value={counts[p]}
            icon={PRIORITY_ICONS[p]}
            tone={PRIORITY_TONES[p]}
          />
        ))}
        <StatCard
          label="Completed Today"
          value={completedToday.data?.data.length ?? "—"}
          icon={faCheckCircle}
          tone="success"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <FilterSelect
          label="Priority"
          value={selectedPriority}
          onChange={setSelectedPriority}
          options={[
            { value: "all", label: "All priorities" },
            ...TASK_PRIORITIES.map((p) => ({ value: p, label: labelFor(p) })),
          ]}
        />
        <FilterSelect
          label="Due"
          value={selectedTimeframe}
          onChange={setSelectedTimeframe}
          options={[
            { value: "today", label: "By end of today" },
            { value: "tomorrow", label: "By end of tomorrow" },
            { value: "all", label: "Any time" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AsyncContent
            loading={tasks.loading}
            error={tasks.error}
            empty={tasks.items.length === 0}
            emptyText="No open tasks for this filter."
          >
            {TASK_PRIORITIES.filter((p) => counts[p] > 0).map((p) => (
              <Card key={p}>
                <SectionTitle size="lg">{labelFor(p)} priority</SectionTitle>
                <div className="space-y-3">
                  {tasks.items
                    .filter((t) => t.priority === p)
                    .map((t) => (
                      <TaskRow key={t.id} task={t} onChanged={changed} />
                    ))}
                </div>
              </Card>
            ))}
            <LoadMore {...tasks} />
          </AsyncContent>
        </div>
        <Card title="Schedule" titleSize="lg">
          {byHour.length === 0 ? (
            <p className="font-poppins text-sm text-ink">Nothing scheduled.</p>
          ) : (
            <ul className="space-y-3">
              {byHour.map(([hour, items]) => (
                <li key={hour} className="flex gap-4 font-poppins">
                  <span className="text-primary font-semibold w-14">
                    {hour}
                  </span>
                  <span className="text-sm text-ink">
                    {items.length} task{items.length === 1 ? "" : "s"}:{" "}
                    {items
                      .map((t) => `${t.title} (${formatTime(t.dueAt)})`)
                      .join(", ")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
      {creating && (
        <TaskForm
          onClose={() => setCreating(false)}
          onSaved={() => tasks.reload()}
        />
      )}
    </PageShell>
  );
}

export default Tasks;
