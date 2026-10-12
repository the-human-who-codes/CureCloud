import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faExclamationTriangle,
  faPills,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAction, useApi } from "../../hooks/useApi";
import {
  addDays,
  formatDate,
  formatDateTime,
  formatTime,
  labelFor,
  sastTime,
  todaySast,
} from "../../utils/format";
import { frequencyLabel } from "../../utils/prescriptions";
import AsyncContent, { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { FilterSelect } from "../common/FormField";
import { PageHeader, PageShell } from "../common/PageShell";
import ReasonModal from "../common/ReasonModal";
import { StatCard } from "../common/StatCard";
import StatusBadge from "../common/StatusBadge";
import Tabs from "../common/Tabs";

// Medication rounds by time of day (SAST), grouped client-side from scheduledFor.
const PERIODS = [
  { value: "morning", label: "Morning (06–12)", from: "06", to: "12" },
  { value: "afternoon", label: "Afternoon (12–18)", from: "12", to: "18" },
  { value: "evening", label: "Evening (18–24)", from: "18", to: "24" },
  { value: "night", label: "Night (00–06)", from: "00", to: "06" },
];
const periodOf = (iso) => {
  const hour = sastTime(iso).slice(0, 2);
  return PERIODS.find((p) => hour >= p.from && hour < p.to)?.value;
};
const currentPeriod = () => periodOf(new Date().toISOString());

const NOT_GIVEN_REASONS = [
  "patient-refused",
  "patient-unavailable",
  "clinically-held",
  "medication-unavailable",
  "other",
].map((value) => ({ value, label: labelFor(value) }));

function DoseRow({ dose, onCharted }) {
  const [asking, setAsking] = useState(false);
  const chart = useAction(async (status, statusReason) => {
    try {
      await api.recordAdministration({
        prescriptionId: dose.prescriptionId,
        scheduledFor: dose.scheduledFor,
        status,
        ...(statusReason && { statusReason }),
      });
    } catch (err) {
      // Someone else charted it first: show the current schedule.
      if (err.code === "already-charted") onCharted();
      throw err;
    }
    onCharted();
  });
  const charted = dose.status === "given" || dose.status === "not-given";
  return (
    <div className="p-4 bg-surface rounded-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-poppins font-medium text-primary">
            {formatTime(dose.scheduledFor)} · {dose.medication} {dose.dose}
          </p>
          <p className="font-poppins text-sm text-ink">
            {dose.patientName}
            {dose.room ? ` · Room ${dose.room}` : ""}
            {dose.bed ? ` · Bed ${dose.bed}` : ""} · {labelFor(dose.route)}
          </p>
          {dose.instructions && (
            <p className="font-poppins text-sm text-ink">{dose.instructions}</p>
          )}
          {dose.allergies.length > 0 && (
            <p className="font-poppins text-sm text-red-700 mt-1">
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
              Allergies: {dose.allergies.join(", ")}
            </p>
          )}
        </div>
        <StatusBadge status={dose.status} />
      </div>
      {!charted && (
        <div className="flex gap-2 mt-3">
          <Button
            size="sm"
            disabled={chart.busy}
            onClick={() => chart.run("completed")}
          >
            Given
          </Button>
          <Button
            size="sm"
            variant="danger"
            disabled={chart.busy}
            onClick={() => setAsking(true)}
          >
            Not given
          </Button>
        </div>
      )}
      {chart.error && (
        <p className="mt-2 font-poppins text-xs text-red-600">
          {chart.error.code === "already-charted"
            ? "This dose has already been charted. Refreshing…"
            : chart.error.message}
        </p>
      )}
      {asking && (
        <ReasonModal
          title={`${dose.medication} not given`}
          options={NOT_GIVEN_REASONS}
          confirmLabel="Record not given"
          onClose={() => setAsking(false)}
          onSubmit={(reason) => chart.run("not-done", reason)}
        />
      )}
    </div>
  );
}

DoseRow.propTypes = {
  dose: PropTypes.object.isRequired,
  onCharted: PropTypes.func.isRequired,
};

// The nurse's medication rounds (GET /medication-schedule) and their recent charting.
function Medications() {
  const [date, setDate] = useState(todaySast());
  const [period, setPeriod] = useState(currentPeriod);
  const [retracting, setRetracting] = useState(null);
  const schedule = useApi(() => api.getMedicationSchedule({ date }), [date]);
  const recent = useApi(() =>
    api.listAdministrations({ performerId: "me", limit: 10 })
  );
  const retract = useAction(async (id, reason) => {
    await api.retractAdministration(id, reason);
    recent.reload();
    schedule.reload();
  });

  const doses = schedule.data?.data ?? [];
  const count = (...statuses) =>
    doses.filter((d) => statuses.includes(d.status)).length;
  const shown = doses.filter((d) => periodOf(d.scheduledFor) === period);
  const refresh = () => {
    schedule.reload();
    recent.reload();
  };

  return (
    <PageShell>
      <PageHeader
        title="Medications"
        subtitle={formatDate(date)}
        actions={
          <FilterSelect
            label="Day"
            value={date}
            onChange={setDate}
            options={[
              { value: todaySast(), label: "Today" },
              { value: addDays(todaySast(), 1), label: "Tomorrow" },
            ]}
          />
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          label="Due"
          value={count("due")}
          icon={faClock}
          tone="warning"
        />
        <StatCard
          label="Overdue"
          value={count("overdue")}
          icon={faExclamationTriangle}
          tone="danger"
        />
        <StatCard label="Upcoming" value={count("upcoming")} icon={faPills} />
        <StatCard
          label="Given"
          value={count("given")}
          icon={faCheckCircle}
          tone="success"
        />
        <StatCard
          label="Not Given"
          value={count("not-given")}
          icon={faTimesCircle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card padded={false}>
            <Tabs tabs={PERIODS} value={period} onChange={setPeriod} />
            <div className="p-6 space-y-4">
              <AsyncContent
                loading={schedule.loading}
                error={schedule.error}
                empty={shown.length === 0}
                emptyText="No scheduled doses in this period."
              >
                {shown.map((d) => (
                  <DoseRow
                    key={`${d.prescriptionId}-${d.scheduledFor}`}
                    dose={d}
                    onCharted={refresh}
                  />
                ))}
              </AsyncContent>
            </div>
          </Card>
          {schedule.data?.prn.length > 0 && (
            <Card title="As needed (PRN)" titleSize="lg">
              <ul className="space-y-2">
                {schedule.data.prn.map((rx) => (
                  <li
                    key={rx.id}
                    className="p-3 bg-surface rounded-lg font-poppins text-sm text-ink"
                  >
                    <span className="text-primary font-medium">
                      {rx.medication}
                    </span>{" "}
                    {rx.dose} · {labelFor(rx.route)} · {frequencyLabel(rx)} ·{" "}
                    {rx.patientName}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
        <Card title="My recent administrations" titleSize="lg">
          <ErrorMessage error={retract.error} className="mb-3" />
          <AsyncContent
            {...recent}
            empty={recent.data?.data.length === 0}
            emptyText="Nothing charted yet."
          >
            <ul className="space-y-3">
              {recent.data?.data.map((a) => (
                <li
                  key={a.id}
                  className="p-3 bg-surface rounded-lg font-poppins"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-primary">
                      {a.medication} {a.dose}
                    </p>
                    <StatusBadge status={a.status} size="sm" />
                  </div>
                  <p className="text-xs text-ink">
                    {a.patientName} · {formatDateTime(a.occurredAt)}
                    {a.statusReason ? ` · ${labelFor(a.statusReason)}` : ""}
                  </p>
                  {a.status !== "entered-in-error" && (
                    <button
                      type="button"
                      className="mt-1 text-xs text-red-600 hover:underline"
                      onClick={() => setRetracting(a)}
                    >
                      Entered in error
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </AsyncContent>
        </Card>
      </div>
      {retracting && (
        <ReasonModal
          title="Retract administration"
          onClose={() => setRetracting(null)}
          onSubmit={(reason) => retract.run(retracting.id, reason)}
        />
      )}
    </PageShell>
  );
}

export default Medications;
