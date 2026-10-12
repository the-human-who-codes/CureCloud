import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  faBed,
  faEye,
  faHeartbeat,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useApi, usePagedApi } from "../../hooks/useApi";
import {
  formatBloodPressure,
  formatDateTime,
  formatTime,
  labelFor,
} from "../../utils/format";
import { ACUITIES, admissionLabel } from "../../utils/patients";
import AsyncContent, { LoadMore } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { FilterSelect, FormField } from "../common/FormField";
import InitialsAvatar from "../common/InitialsAvatar";
import { PageHeader, PageShell } from "../common/PageShell";
import StatusBadge from "../common/StatusBadge";
import AllergyList from "../Clinical/AllergyList";
import AdmissionForm from "../Patients/AdmissionForm";
import PatientDetail from "../Patients/PatientDetail";
import RecordForm from "../Patients/RecordForm";
import VitalsForm from "../Patients/VitalsForm";

function PatientTile({ patient, onAction }) {
  const { can } = useAuth();
  const v = patient.latestVitals;
  return (
    <Card>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <InitialsAvatar name={patient.name} />
          <div>
            <h3 className="font-poppins font-semibold text-primary">
              {patient.name}
            </h3>
            <p className="font-poppins text-sm text-ink">
              {admissionLabel(patient.admission) ?? "Not admitted"}
            </p>
          </div>
        </div>
        {patient.acuity && <StatusBadge status={patient.acuity} />}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4 font-poppins text-sm">
        <div className="bg-surface rounded-lg p-2">
          <p className="text-xs text-ink-muted">Temp</p>
          <p className="text-primary">
            {v?.temperature != null ? `${v.temperature} °C` : "—"}
          </p>
        </div>
        <div className="bg-surface rounded-lg p-2">
          <p className="text-xs text-ink-muted">BP</p>
          <p className="text-primary">
            {formatBloodPressure(v?.bloodPressure) ?? "—"}
          </p>
        </div>
        <div className="bg-surface rounded-lg p-2">
          <p className="text-xs text-ink-muted">HR</p>
          <p className="text-primary">
            {v?.heartRate != null ? `${v.heartRate} bpm` : "—"}
          </p>
        </div>
      </div>
      {v?.recordedAt && (
        <p className="font-poppins text-xs text-ink mb-3">
          Vitals from {formatDateTime(v.recordedAt)}
        </p>
      )}
      <div className="mb-4">
        <AllergyList
          allergies={patient.allergies}
          noKnownAllergies={patient.noKnownAllergies}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {can("vitals:create") && (
          <Button
            size="sm"
            variant="secondary"
            icon={faHeartbeat}
            onClick={() => onAction("vitals", patient)}
          >
            Vitals
          </Button>
        )}
        {can("medical-record:create") && (
          <Button
            size="sm"
            variant="secondary"
            icon={faNotesMedical}
            onClick={() => onAction("note", patient)}
          >
            Note
          </Button>
        )}
        {patient.admission && can("patient:admit") && (
          <Button
            size="sm"
            variant="secondary"
            icon={faBed}
            onClick={() => onAction("move", patient)}
          >
            Room/bed
          </Button>
        )}
        <Button
          size="sm"
          variant="secondary"
          icon={faEye}
          onClick={() => onAction("view", patient)}
        >
          Details
        </Button>
      </div>
    </Card>
  );
}

PatientTile.propTypes = {
  patient: PropTypes.object.isRequired,
  onAction: PropTypes.func.isRequired,
};

// The nurse's patients: care team plus their ward's admitted patients.
function MyPatients() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [search, setSearch] = useState(q);
  const [acuity, setAcuity] = useState("all");
  const [dialog, setDialog] = useState(null);
  useEffect(() => setSearch(q), [q]);

  const patients = usePagedApi(
    (cursor) =>
      api.listPatients({
        q: q || undefined,
        acuity: acuity === "all" ? undefined : acuity,
        cursor,
      }),
    [q, acuity]
  );
  const tasks = useApi(() =>
    api.listCareTasks({
      assigneeId: "me",
      status: "open,in-progress",
      limit: 10,
    })
  );

  const replace = (p) =>
    patients.setItems((items) => items.map((x) => (x.id === p.id ? p : x)));
  const refreshPatient = async (id) => replace(await api.getPatient(id));

  return (
    <PageShell>
      <PageHeader
        title="My Patients"
        subtitle="Your ward and care-team patients"
      />
      <Card className="mb-6">
        <form
          className="flex flex-wrap items-end gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setParams(search.trim() ? { q: search.trim() } : {});
          }}
        >
          <FormField
            compact
            label="Search by name"
            type="search"
            value={search}
            maxLength={60}
            onChange={(e) => setSearch(e.target.value)}
            wrapperClassName="flex-1 min-w-[200px]"
          />
          <FilterSelect
            label="Acuity"
            value={acuity}
            onChange={setAcuity}
            options={[
              { value: "all", label: "All patients" },
              ...ACUITIES.map((a) => ({ value: a, label: labelFor(a) })),
            ]}
          />
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <AsyncContent
            loading={patients.loading}
            error={patients.error}
            empty={patients.items.length === 0}
            emptyText={
              q ? "No patients match this search." : "No patients yet."
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patients.items.map((p) => (
                <PatientTile
                  key={p.id}
                  patient={p}
                  onAction={(type, patient) => setDialog({ type, patient })}
                />
              ))}
            </div>
            <LoadMore {...patients} />
          </AsyncContent>
        </div>
        <Card title="Upcoming tasks" titleSize="lg">
          <AsyncContent
            {...tasks}
            empty={tasks.data?.data.length === 0}
            emptyText="No open tasks."
          >
            <ul className="space-y-3">
              {tasks.data?.data.map((t) => (
                <li
                  key={t.id}
                  className="p-3 bg-surface rounded-lg font-poppins"
                >
                  <p className="text-sm text-primary">{t.title}</p>
                  <p className="text-xs text-ink">
                    {t.patientName ?? "Ward task"} · {formatTime(t.dueAt)} ·{" "}
                    {labelFor(t.priority)}
                  </p>
                </li>
              ))}
            </ul>
          </AsyncContent>
        </Card>
      </div>

      {dialog?.type === "vitals" && (
        <VitalsForm
          patient={dialog.patient}
          onClose={() => setDialog(null)}
          onSaved={() => refreshPatient(dialog.patient.id)}
        />
      )}
      {dialog?.type === "note" && (
        <RecordForm
          patient={dialog.patient}
          onClose={() => setDialog(null)}
          onSaved={() => {}}
        />
      )}
      {dialog?.type === "move" && (
        <AdmissionForm
          patient={dialog.patient}
          onClose={() => setDialog(null)}
          onSaved={replace}
        />
      )}
      {dialog?.type === "view" && (
        <PatientDetail
          patientId={dialog.patient.id}
          onClose={() => setDialog(null)}
          onChanged={replace}
        />
      )}
    </PageShell>
  );
}

export default MyPatients;
