import { useState } from "react";
import PropTypes from "prop-types";
import {
  faBed,
  faEdit,
  faFileMedical,
  faHeartbeat,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi } from "../../hooks/useApi";
import {
  ageFromDob,
  formatBloodPressure,
  formatDate,
  formatDateTime,
  labelFor,
} from "../../utils/format";
import { admissionLabel } from "../../utils/patients";
import { frequencyLabel } from "../../utils/prescriptions";
import AsyncContent, { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import InitialsAvatar from "../common/InitialsAvatar";
import Modal from "../common/Modal";
import ReasonModal from "../common/ReasonModal";
import StatusBadge from "../common/StatusBadge";
import AllergyList from "../Clinical/AllergyList";
import RecordCard from "../Clinical/RecordCard";
import VitalsGrid from "../Clinical/VitalsGrid";
import AdmissionForm from "./AdmissionForm";
import CareTeamPanel from "./CareTeamPanel";
import PatientForm from "./PatientForm";
import RecordForm from "./RecordForm";
import VitalsForm from "./VitalsForm";

function Panel({ title, className = "", children }) {
  return (
    <div className={`bg-surface rounded-xl p-6 ${className}`}>
      <h3 className="font-poppins font-semibold text-primary mb-4">{title}</h3>
      {children}
    </div>
  );
}

Panel.propTypes = {
  title: PropTypes.node.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

function Info({ label, children }) {
  return (
    <div>
      <p className="font-poppins text-xs text-ink-muted">{label}</p>
      <p className="font-poppins text-primary">{children || "—"}</p>
    </div>
  );
}

Info.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Actions on one record by its author: edit or finalise a draft, add an addendum, retract.
function RecordActions({ record, onChanged, onEdit }) {
  const [dialog, setDialog] = useState(null);
  const finalise = useAction(async () =>
    onChanged(await api.updateMedicalRecord(record.id, { status: "final" }))
  );
  const draft = record.status === "preliminary";
  const signed = record.status === "final" || record.status === "amended";
  return (
    <>
      {draft && (
        <>
          <Button size="sm" variant="secondary" onClick={onEdit}>
            Edit draft
          </Button>
          <Button
            size="sm"
            variant="secondary"
            disabled={finalise.busy}
            onClick={() => finalise.run()}
          >
            Finalise
          </Button>
        </>
      )}
      {signed && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setDialog("addendum")}
        >
          Add addendum
        </Button>
      )}
      {record.status !== "entered-in-error" && (
        <Button size="sm" variant="danger" onClick={() => setDialog("retract")}>
          Entered in error
        </Button>
      )}
      {finalise.error && (
        <span className="font-poppins text-xs text-red-600">
          {finalise.error.message}
        </span>
      )}
      {dialog === "addendum" && (
        <ReasonModal
          title="Add addendum"
          label="Addendum"
          confirmLabel="Add addendum"
          maxLength={5000}
          onClose={() => setDialog(null)}
          onSubmit={async (text) =>
            onChanged(await api.addAddendum(record.id, text))
          }
        />
      )}
      {dialog === "retract" && (
        <ReasonModal
          title="Mark record as entered in error"
          confirmLabel="Mark entered in error"
          onClose={() => setDialog(null)}
          onSubmit={async (statusReason) =>
            onChanged(
              await api.updateMedicalRecord(record.id, {
                status: "entered-in-error",
                statusReason,
              })
            )
          }
        />
      )}
    </>
  );
}

RecordActions.propTypes = {
  record: PropTypes.object.isRequired,
  onChanged: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

// Clinical detail of one patient for doctors and nurses: demographics, allergies, vitals,
// medications, records, visits and care team, plus the actions the caller's role allows.
function PatientDetail({ patientId, onClose, onChanged }) {
  const { user, can } = useAuth();
  const [dialog, setDialog] = useState(null);
  const patient = useApi(() => api.getPatient(patientId), [patientId]);
  const vitals = useApi(
    () => api.listVitals(patientId, { limit: 5 }),
    [patientId]
  );
  const prescriptions = useApi(
    () => api.listPrescriptions({ patientId, status: "active", limit: 50 }),
    [patientId]
  );
  const records = useApi(
    () => api.listMedicalRecords({ patientId, limit: 20 }),
    [patientId]
  );
  // Last completed and next upcoming visit, only for this panel (§5.5).
  const visits = useApi(async () => {
    const now = new Date().toISOString();
    const [next, past] = await Promise.all([
      api.listAppointments({
        patientId,
        from: now,
        status: "pending,confirmed,checked-in",
        limit: 1,
      }),
      api.listAppointments({
        patientId,
        to: now,
        status: "completed",
        limit: 100,
      }),
    ]);
    return { next: next.data[0], last: past.data.at(-1) };
  }, [patientId]);

  const discharge = useAction(async (dischargeNote) => {
    const saved = await api.dischargePatient(
      patientId,
      dischargeNote ? { dischargeNote } : {}
    );
    updated(saved);
  });
  const retractVitals = useAction(async (vitalsId, reason) => {
    await api.retractVitals(patientId, vitalsId, reason);
    vitals.reload();
    patient.reload();
  });

  const updated = (p) => {
    patient.setData(p);
    onChanged?.(p);
  };
  const replaceRecord = (r) =>
    records.setData({
      ...records.data,
      data: records.data.data.some((x) => x.id === r.id)
        ? records.data.data.map((x) => (x.id === r.id ? r : x))
        : [r, ...records.data.data],
    });

  const p = patient.data;
  const latest = vitals.data?.data ?? [];

  return (
    <Modal
      title={
        p ? (
          <span className="flex items-center gap-4">
            <InitialsAvatar name={p.name} />
            <span>
              {p.name}
              <span className="block font-poppins text-sm font-normal text-ink">
                {[
                  p.folderNumber && `Folder ${p.folderNumber}`,
                  ageFromDob(p.birthDate) != null &&
                    `${ageFromDob(p.birthDate)} years`,
                  labelFor(p.sex),
                ]
                  .filter(Boolean)
                  .join(" • ")}
              </span>
            </span>
          </span>
        ) : (
          "Patient"
        )
      }
      onClose={onClose}
      size="xl"
      footer={
        p && (
          <div className="flex flex-wrap gap-2 justify-end">
            {can("vitals:create") && (
              <Button
                variant="secondary"
                icon={faHeartbeat}
                onClick={() => setDialog("vitals")}
              >
                Record vitals
              </Button>
            )}
            {can("medical-record:create") && (
              <Button
                variant="secondary"
                icon={faFileMedical}
                onClick={() => setDialog("record")}
              >
                {user.role === "nurse" ? "Nursing note" : "New record"}
              </Button>
            )}
            {can("patient:admit") && (user.role !== "nurse" || p.admission) && (
              <Button
                variant="secondary"
                icon={faBed}
                onClick={() => setDialog("admission")}
              >
                {p.admission ? "Move" : "Admit"}
              </Button>
            )}
            {p.admission && user.role === "doctor" && (
              <Button
                variant="secondary"
                icon={faSignOutAlt}
                onClick={() => setDialog("discharge")}
              >
                Discharge
              </Button>
            )}
            {can("patient:update") && (
              <Button icon={faEdit} onClick={() => setDialog("edit")}>
                Edit patient
              </Button>
            )}
          </div>
        )
      }
    >
      <AsyncContent loading={patient.loading} error={patient.error}>
        {p && (
          <div className="space-y-6">
            <ErrorMessage error={discharge.error ?? retractVitals.error} />
            {p.status !== "active" && (
              <StatusBadge status={p.status}>
                {labelFor(p.status)}
                {p.deceasedAt ? ` (${formatDate(p.deceasedAt)})` : ""}
              </StatusBadge>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Panel title="Clinical summary">
                <div className="space-y-4">
                  <div>
                    <p className="font-poppins text-xs text-ink-muted mb-1">
                      Allergies
                    </p>
                    <AllergyList
                      allergies={p.allergies}
                      noKnownAllergies={p.noKnownAllergies}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Info label="Acuity">
                      {p.acuity && <StatusBadge status={p.acuity} />}
                    </Info>
                    <Info label="Blood type">{p.bloodType}</Info>
                  </div>
                  <div>
                    <p className="font-poppins text-xs text-ink-muted mb-1">
                      Chronic conditions
                    </p>
                    {p.chronicConditions?.length ? (
                      <ul className="font-poppins text-sm text-ink">
                        {p.chronicConditions.map((c) => (
                          <li key={c.name}>
                            {c.name}
                            {c.code ? ` (${c.code})` : ""}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="font-poppins text-sm text-ink">
                        None recorded
                      </p>
                    )}
                  </div>
                  <Info label="Admission">
                    {admissionLabel(p.admission) ?? "Not admitted"}
                  </Info>
                </div>
              </Panel>

              <Panel title="Contact Information">
                <div className="space-y-4">
                  <Info label="Phone">{p.phone}</Info>
                  <Info label="Email">{p.email}</Info>
                  <Info label="Address">
                    {p.address &&
                      [
                        p.address.line1,
                        p.address.suburb,
                        p.address.city,
                        labelFor(p.address.province),
                        p.address.postalCode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                  </Info>
                  <Info label="Emergency contact">
                    {p.emergencyContact &&
                      `${p.emergencyContact.name} (${p.emergencyContact.relationship}) · ${p.emergencyContact.phone}`}
                  </Info>
                  <Info label="Date of birth">{formatDate(p.birthDate)}</Info>
                </div>
              </Panel>

              <Panel title="Vitals" className="md:col-span-2">
                <VitalsGrid vitals={p.latestVitals} />
                <AsyncContent
                  {...vitals}
                  empty={latest.length === 0}
                  emptyText="No vitals recorded yet."
                >
                  <ul className="mt-4 space-y-2">
                    {latest.map((v) => (
                      <li
                        key={v.id}
                        className="flex items-center justify-between bg-white rounded-lg p-3 font-poppins text-sm text-ink"
                      >
                        <span>
                          {formatDateTime(v.recordedAt)} · {v.createdByName}:{" "}
                          {[
                            v.bloodPressure &&
                              `BP ${formatBloodPressure(v.bloodPressure)}`,
                            v.heartRate != null && `HR ${v.heartRate}`,
                            v.temperature != null && `${v.temperature} °C`,
                            v.oxygenSaturation != null &&
                              `SpO2 ${v.oxygenSaturation}%`,
                            v.bloodGlucose != null &&
                              `Glucose ${v.bloodGlucose}`,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                        {v.createdBy === user.id && can("vitals:retract") && (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => setDialog({ retract: v.id })}
                          >
                            Entered in error
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </AsyncContent>
              </Panel>

              <Panel title="Current Medications">
                <AsyncContent
                  {...prescriptions}
                  empty={prescriptions.data?.data.length === 0}
                  emptyText="No active medications."
                >
                  <div className="space-y-2">
                    {prescriptions.data?.data.map((rx) => (
                      <div key={rx.id} className="bg-white rounded-lg p-3">
                        <p className="font-poppins font-medium text-primary">
                          {rx.medication}
                        </p>
                        <p className="font-poppins text-sm text-ink">
                          {rx.dose} · {labelFor(rx.route)} ·{" "}
                          {frequencyLabel(rx)} · {labelFor(rx.category)}
                        </p>
                      </div>
                    ))}
                  </div>
                </AsyncContent>
              </Panel>

              <Panel title="Visits">
                <AsyncContent {...visits}>
                  <div className="space-y-3">
                    <Info label="Last visit">
                      {visits.data?.last &&
                        `${formatDateTime(visits.data.last.start)} · ${
                          visits.data.last.doctorName
                        }`}
                    </Info>
                    <Info label="Next appointment">
                      {visits.data?.next &&
                        `${formatDateTime(visits.data.next.start)} · ${
                          visits.data.next.doctorName
                        } (${labelFor(visits.data.next.status)})`}
                    </Info>
                  </div>
                </AsyncContent>
              </Panel>

              <Panel title="Care team">
                <CareTeamPanel patient={p} />
              </Panel>

              <Panel title="Medical Records" className="md:col-span-2">
                <AsyncContent
                  {...records}
                  empty={records.data?.data.length === 0}
                  emptyText="No records yet."
                >
                  <div className="space-y-3">
                    {records.data?.data.map((r) => (
                      <RecordCard key={r.id} record={r}>
                        {r.authorId === user.id && (
                          <RecordActions
                            record={r}
                            onChanged={replaceRecord}
                            onEdit={() => setDialog({ editRecord: r })}
                          />
                        )}
                      </RecordCard>
                    ))}
                  </div>
                </AsyncContent>
              </Panel>
            </div>
          </div>
        )}
      </AsyncContent>

      {p && dialog === "edit" && (
        <PatientForm
          patient={p}
          onClose={() => setDialog(null)}
          onSaved={updated}
        />
      )}
      {p && dialog === "vitals" && (
        <VitalsForm
          patient={p}
          onClose={() => setDialog(null)}
          onSaved={() => {
            vitals.reload();
            patient.reload();
          }}
        />
      )}
      {p && dialog === "record" && (
        <RecordForm
          patient={p}
          onClose={() => setDialog(null)}
          onSaved={replaceRecord}
        />
      )}
      {p && dialog?.editRecord && (
        <RecordForm
          patient={p}
          record={dialog.editRecord}
          onClose={() => setDialog(null)}
          onSaved={replaceRecord}
        />
      )}
      {p && dialog === "admission" && (
        <AdmissionForm
          patient={p}
          onClose={() => setDialog(null)}
          onSaved={updated}
        />
      )}
      {dialog === "discharge" && (
        <ReasonModal
          title="Discharge patient"
          label="Discharge note (optional)"
          confirmLabel="Discharge"
          required={false}
          maxLength={2000}
          onClose={() => setDialog(null)}
          onSubmit={(note) => discharge.run(note)}
        />
      )}
      {dialog?.retract && (
        <ReasonModal
          title="Mark vitals as entered in error"
          onClose={() => setDialog(null)}
          onSubmit={(reason) => retractVitals.run(dialog.retract, reason)}
        />
      )}
    </Modal>
  );
}

PatientDetail.propTypes = {
  patientId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onChanged: PropTypes.func,
};

export default PatientDetail;
