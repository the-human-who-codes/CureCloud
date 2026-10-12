import { useState } from "react";
import PropTypes from "prop-types";
import { api } from "../../api/client";
import { useAction } from "../../hooks/useApi";
import { labelFor, todaySast } from "../../utils/format";
import {
  FREQUENCIES,
  FREQUENCY_TIMES,
  ROUTES,
} from "../../utils/prescriptions";
import { checks, validate } from "../../utils/validation";
import { ErrorMessage } from "../common/AsyncContent";
import { Button } from "../common/Button";
import { FormField } from "../common/FormField";
import Modal from "../common/Modal";
import { PatientPicker } from "../common/SearchPicker";

const parseTimes = (s) =>
  s
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

const timesError = (value, f) => {
  const times = parseTimes(value);
  if (times.some((t) => checks.time(t)))
    return "Use HH:mm, separated by commas";
  if (times.length > 12) return "At most 12 times";
  if (f.frequency === "once" && times.length !== 1)
    return "A single dose needs exactly one time";
  if (f.frequency === "custom" && times.length === 0)
    return "Enter at least one time";
  if (f.frequency === "as-needed" && times.length)
    return "As-needed has no scheduled times";
  return null;
};

// Mirrors PrescriptionCreateRequest / PrescriptionUpdateRequest (src/models/prescription.js).
const CREATE_RULES = {
  medication: [checks.required, checks.maxLength(200)],
  dose: [checks.required, checks.maxLength(50)],
  frequencyText: (v, f) =>
    f.frequency === "custom" && !v.trim()
      ? "Describe the custom frequency"
      : checks.maxLength(100)(v),
  administrationTimes: timesError,
  instructions: checks.maxLength(2000),
  refills: [checks.required, checks.intRange(0, 12)],
  startDate: checks.required,
  endDate: (v, f) =>
    v && f.startDate && v < f.startDate
      ? "Must be on or after the start"
      : null,
};
const EDIT_RULES = {
  administrationTimes: timesError,
  instructions: checks.maxLength(2000),
  refills: [checks.required, checks.intRange(0, 12)],
  endDate: CREATE_RULES.endDate,
};

// New prescription (POST /prescriptions) or, with `prescription`, the fields that stay editable
// while it is active or on hold: end date, refills, instructions and times (§2.8).
function PrescriptionForm({
  prescription,
  patient: fixedPatient,
  onClose,
  onSaved,
}) {
  const editing = Boolean(prescription);
  const [patient, setPatient] = useState(fixedPatient ?? null);
  const [form, setForm] = useState(() => ({
    medication: prescription?.medication ?? "",
    dose: prescription?.dose ?? "",
    route: prescription?.route ?? "oral",
    frequency: prescription?.frequency ?? "once-daily",
    frequencyText: prescription?.frequencyText ?? "",
    administrationTimes: (
      prescription?.administrationTimes ?? FREQUENCY_TIMES["once-daily"]
    ).join(", "),
    instructions: prescription?.instructions ?? "",
    refills: String(prescription?.refills ?? 0),
    startDate: prescription?.startDate ?? todaySast(),
    endDate: prescription?.endDate ?? "",
    category: prescription?.category ?? "",
  }));
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => {
      const next = { ...f, [key]: value };
      // A new frequency brings its default times.
      if (key === "frequency" && FREQUENCY_TIMES[value])
        next.administrationTimes = FREQUENCY_TIMES[value].join(", ");
      if (key === "frequency" && FREQUENCY_TIMES[value] === null)
        next.administrationTimes = "";
      return next;
    });
  };

  const save = useAction(async () => {
    const times = parseTimes(form.administrationTimes);
    const saved = editing
      ? await api.updatePrescription(prescription.id, {
          endDate: form.endDate || null,
          refills: Number(form.refills),
          instructions: form.instructions.trim() || null,
          administrationTimes: times,
        })
      : await api.createPrescription({
          patientId: patient.id,
          medication: form.medication.trim(),
          dose: form.dose.trim(),
          route: form.route,
          frequency: form.frequency,
          ...(form.frequency === "custom" && {
            frequencyText: form.frequencyText.trim(),
          }),
          ...(form.frequency !== "as-needed" && { administrationTimes: times }),
          ...(form.instructions.trim() && {
            instructions: form.instructions.trim(),
          }),
          refills: Number(form.refills),
          startDate: form.startDate,
          ...(form.endDate && { endDate: form.endDate }),
          ...(form.category && { category: form.category }),
        });
    onSaved(saved);
    onClose();
  });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(form, editing ? EDIT_RULES : CREATE_RULES);
    if (!editing && !patient) found.patient = "Choose a patient";
    setErrors(found);
    if (!Object.keys(found).length) save.run();
  };

  const field = (key, label, props = {}) => (
    <FormField
      label={label}
      value={form[key]}
      onChange={set(key)}
      error={errors[key]}
      {...props}
    />
  );

  return (
    <Modal
      title={editing ? `Edit ${prescription.medication}` : "New Prescription"}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="prescription-form" disabled={save.busy}>
            {save.busy ? "Saving…" : editing ? "Save" : "Prescribe"}
          </Button>
        </>
      }
    >
      <form
        id="prescription-form"
        onSubmit={submit}
        noValidate
        className="space-y-4"
      >
        <ErrorMessage error={save.error} />
        {editing ? (
          <p className="font-poppins text-sm text-ink">
            {prescription.patientName} · {prescription.dose} ·{" "}
            {labelFor(prescription.route)}. To change the drug, dose, route or
            frequency, stop this prescription and prescribe again.
          </p>
        ) : (
          <>
            {fixedPatient ? (
              <p className="font-poppins text-sm text-ink">
                Patient: {fixedPatient.name}
              </p>
            ) : (
              <PatientPicker
                value={patient}
                onChange={setPatient}
                error={errors.patient}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {field("medication", "Medication", { maxLength: 200 })}
              {field("dose", "Dose", { maxLength: 50, placeholder: "500 mg" })}
              <FormField
                as="select"
                label="Route"
                value={form.route}
                onChange={set("route")}
              >
                {ROUTES.map((r) => (
                  <option key={r} value={r}>
                    {labelFor(r)}
                  </option>
                ))}
              </FormField>
              <FormField
                as="select"
                label="Frequency"
                value={form.frequency}
                onChange={set("frequency")}
              >
                {FREQUENCIES.map((f) => (
                  <option key={f} value={f}>
                    {labelFor(f)}
                  </option>
                ))}
              </FormField>
              {form.frequency === "custom" &&
                field("frequencyText", "Custom frequency", { maxLength: 100 })}
              <FormField
                as="select"
                label="Category"
                value={form.category}
                onChange={set("category")}
              >
                <option value="">Automatic (inpatient if admitted)</option>
                <option value="inpatient">Inpatient</option>
                <option value="outpatient">Outpatient</option>
              </FormField>
              {field("startDate", "Start date", { type: "date" })}
            </div>
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {form.frequency !== "as-needed" &&
            field("administrationTimes", "Times (HH:mm, comma separated)", {
              placeholder: "08:00, 20:00",
            })}
          {field("endDate", "End date (optional)", {
            type: "date",
            min: form.startDate,
          })}
          {field("refills", "Refills", { type: "number", min: 0, max: 12 })}
        </div>
        {field("instructions", "Instructions", {
          as: "textarea",
          rows: 3,
          maxLength: 2000,
        })}
      </form>
    </Modal>
  );
}

PrescriptionForm.propTypes = {
  prescription: PropTypes.object,
  patient: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default PrescriptionForm;
