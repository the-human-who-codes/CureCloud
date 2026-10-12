import { useState } from "react";
import PropTypes from "prop-types";
import { api } from "../../api/client";
import { useAction } from "../../hooks/useApi";
import { fromLocalInput, toLocalInput } from "../../utils/format";
import { checks, validate } from "../../utils/validation";
import { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { FormField } from "../common/FormField";
import Modal from "../common/Modal";

// Measurement inputs with the API's units and ranges (src/models/vitals.js).
const MEASUREMENTS = [
  ["systolic", "Systolic BP (mmHg)", checks.intRange(50, 260)],
  ["diastolic", "Diastolic BP (mmHg)", checks.intRange(20, 160)],
  ["heartRate", "Heart rate (bpm)", checks.intRange(20, 250)],
  ["respiratoryRate", "Respiratory rate (/min)", checks.intRange(4, 60)],
  ["temperature", "Temperature (°C)", checks.numberRange(30, 45)],
  ["oxygenSaturation", "O2 saturation (%)", checks.intRange(50, 100)],
  ["bloodGlucose", "Blood glucose (mmol/L)", checks.numberRange(0.5, 50)],
  ["weight", "Weight (kg)", checks.numberRange(0.5, 500)],
  ["height", "Height (cm)", checks.numberRange(20, 250)],
  ["painScore", "Pain score (0–10)", checks.intRange(0, 10)],
];

const RULES = {
  ...Object.fromEntries(MEASUREMENTS.map(([k, , check]) => [k, check])),
  diastolic: [
    checks.intRange(20, 160),
    (v, f) =>
      (f.systolic === "") !== (v === "")
        ? "Enter both systolic and diastolic"
        : v !== "" && Number(f.systolic) <= Number(v)
        ? "Must be lower than systolic"
        : null,
  ],
  notes: checks.maxLength(500),
  recordedAt: (v) => {
    const t = Date.parse(fromLocalInput(v));
    if (Number.isNaN(t)) return "Required";
    if (t > Date.now() + 60e3) return "Cannot be in the future";
    if (t < Date.now() - 7 * 86400e3) return "At most 7 days ago";
    return null;
  },
};

// Records one vitals panel (POST /patients/{id}/vitals).
function VitalsForm({ patient, onClose, onSaved }) {
  const [form, setForm] = useState(() => ({
    ...Object.fromEntries(MEASUREMENTS.map(([k]) => [k, ""])),
    notes: "",
    recordedAt: toLocalInput(new Date().toISOString()),
  }));
  const [errors, setErrors] = useState({});
  const save = useAction(async () => {
    const num = (k) => (form[k] === "" ? undefined : Number(form[k]));
    const body = {
      recordedAt: fromLocalInput(form.recordedAt),
      ...(form.systolic !== "" && {
        bloodPressure: {
          systolic: num("systolic"),
          diastolic: num("diastolic"),
        },
      }),
      ...Object.fromEntries(
        MEASUREMENTS.filter(([k]) => k !== "systolic" && k !== "diastolic")
          .map(([k]) => [k, num(k)])
          .filter(([, v]) => v !== undefined)
      ),
      ...(form.notes.trim() && { notes: form.notes.trim() }),
    };
    onSaved(await api.recordVitals(patient.id, body));
    onClose();
  });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(form, RULES);
    if (MEASUREMENTS.every(([k]) => form[k] === ""))
      found.heartRate = "Enter at least one measurement";
    setErrors(found);
    if (!Object.keys(found).length) save.run();
  };

  return (
    <Modal
      title={`Record vitals — ${patient.name}`}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="vitals-form" disabled={save.busy}>
            {save.busy ? "Saving…" : "Save vitals"}
          </Button>
        </>
      }
    >
      <form id="vitals-form" onSubmit={submit} noValidate className="space-y-4">
        <ErrorMessage error={save.error} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {MEASUREMENTS.map(([key, label]) => (
            <FormField
              key={key}
              label={label}
              type="number"
              step="any"
              inputMode="decimal"
              value={form[key]}
              error={errors[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          ))}
          <FormField
            label="Taken at"
            type="datetime-local"
            value={form.recordedAt}
            error={errors.recordedAt}
            onChange={(e) => setForm({ ...form, recordedAt: e.target.value })}
          />
        </div>
        <FormField
          as="textarea"
          rows={2}
          label="Notes"
          value={form.notes}
          maxLength={500}
          error={errors.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </form>
    </Modal>
  );
}

VitalsForm.propTypes = {
  patient: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
    .isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default VitalsForm;
