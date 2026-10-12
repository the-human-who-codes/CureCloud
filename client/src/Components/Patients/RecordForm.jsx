import { useState } from "react";
import PropTypes from "prop-types";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction } from "../../hooks/useApi";
import { fromLocalInput, labelFor, toLocalInput } from "../../utils/format";
import { RECORD_CATEGORIES } from "../../utils/patients";
import { checks, compact, validate } from "../../utils/validation";
import { ErrorMessage } from "../common/AsyncContent";
import { Button, IconButton } from "../common/Button";
import { FormField } from "../common/FormField";
import Modal from "../common/Modal";

const LAB_FLAGS = [
  "normal",
  "low",
  "high",
  "critical-low",
  "critical-high",
  "abnormal",
];
const TEXT_FIELDS = [
  ["diagnosis", "Diagnosis"],
  ["findings", "Findings"],
  ["treatment", "Treatment"],
  ["recommendations", "Recommendations"],
];

const RULES = {
  title: [checks.required, checks.maxLength(200)],
  diagnosisCode: checks.icd10,
  ...Object.fromEntries(TEXT_FIELDS.map(([k]) => [k, checks.maxLength(5000)])),
  effectiveAt: (v) =>
    Date.parse(fromLocalInput(v)) > Date.now() + 60e3
      ? "Cannot be in the future"
      : null,
};

// Writes a medical record (POST /medical-records), or edits a preliminary one (PATCH). Nurses
// may only write nursing notes (§2.11).
function RecordForm({ patient, record, onClose, onSaved }) {
  const { user } = useAuth();
  const nurse = user.role === "nurse";
  const [form, setForm] = useState(() => ({
    category: record?.category ?? (nurse ? "nursing-note" : "consultation"),
    title: record?.title ?? "",
    effectiveAt: toLocalInput(record?.effectiveAt ?? new Date().toISOString()),
    diagnosis: record?.diagnosis ?? "",
    diagnosisCode: record?.diagnosisCode ?? "",
    findings: record?.findings ?? "",
    treatment: record?.treatment ?? "",
    recommendations: record?.recommendations ?? "",
    labResults: record?.labResults ?? [],
    status: "final",
  }));
  const [errors, setErrors] = useState({});
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const save = useAction(async (status) => {
    const labResults = form.labResults
      .filter((l) => l.name.trim())
      .map(compact);
    const content = compact({
      category: form.category,
      title: form.title,
      effectiveAt: fromLocalInput(form.effectiveAt),
      diagnosis: form.diagnosis,
      diagnosisCode: form.diagnosisCode,
      findings: form.findings,
      treatment: form.treatment,
      recommendations: form.recommendations,
    });
    const saved = record
      ? await api.updateMedicalRecord(record.id, {
          ...content,
          labResults,
          ...(status === "final" && { status: "final" }),
        })
      : await api.createMedicalRecord({
          patientId: patient.id,
          ...content,
          ...(labResults.length && { labResults }),
          status,
        });
    onSaved(saved);
    onClose();
  });

  const submit = (status) => {
    const found = validate(form, RULES);
    const hasContent =
      form.diagnosis.trim() ||
      form.findings.trim() ||
      form.treatment.trim() ||
      form.labResults.some((l) => l.name.trim());
    if (!hasContent)
      found.findings = "Enter a diagnosis, findings, treatment or lab result";
    if (form.labResults.some((l) => l.name.trim() && !l.value.trim()))
      found.labResults = "Every lab result needs a value";
    setErrors(found);
    if (!Object.keys(found).length) save.run(status);
  };

  const updateLab = (i, patch) =>
    setForm({
      ...form,
      labResults: form.labResults.map((l, j) =>
        j === i ? { ...l, ...patch } : l
      ),
    });

  return (
    <Modal
      title={record ? "Edit draft record" : `New record — ${patient.name}`}
      onClose={onClose}
      size="xl"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            disabled={save.busy}
            onClick={() => submit("preliminary")}
          >
            Save as draft
          </Button>
          <Button disabled={save.busy} onClick={() => submit("final")}>
            {save.busy ? "Saving…" : "Save and finalise"}
          </Button>
        </>
      }
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        noValidate
        className="space-y-4"
      >
        <ErrorMessage error={save.error} />
        <p className="font-poppins text-xs text-ink">
          Final records cannot be edited; corrections are added as addenda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            as="select"
            label="Category"
            value={form.category}
            disabled={nurse}
            onChange={set("category")}
          >
            {RECORD_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {labelFor(c)}
              </option>
            ))}
          </FormField>
          <FormField
            label="Title"
            value={form.title}
            maxLength={200}
            error={errors.title}
            onChange={set("title")}
          />
          <FormField
            label="Clinically relevant time"
            type="datetime-local"
            value={form.effectiveAt}
            error={errors.effectiveAt}
            onChange={set("effectiveAt")}
          />
        </div>
        {TEXT_FIELDS.map(([key, label]) => (
          <div key={key} className="space-y-2">
            <FormField
              as="textarea"
              rows={3}
              label={label}
              value={form[key]}
              maxLength={5000}
              error={errors[key]}
              onChange={set(key)}
            />
            {key === "diagnosis" && (
              <FormField
                compact
                label="ICD-10 code (optional)"
                value={form.diagnosisCode}
                error={errors.diagnosisCode}
                wrapperClassName="max-w-xs"
                onChange={(e) =>
                  setForm({
                    ...form,
                    diagnosisCode: e.target.value.toUpperCase(),
                  })
                }
              />
            )}
          </div>
        ))}
        {(form.category === "lab-result" || form.labResults.length > 0) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-poppins text-sm text-ink">Lab results</p>
              <Button
                size="sm"
                variant="secondary"
                icon={faPlus}
                onClick={() =>
                  setForm({
                    ...form,
                    labResults: [
                      ...form.labResults,
                      {
                        name: "",
                        value: "",
                        unit: "",
                        referenceRange: "",
                        flag: "normal",
                      },
                    ],
                  })
                }
              >
                Add result
              </Button>
            </div>
            {errors.labResults && (
              <p className="font-poppins text-xs text-red-600 mb-2">
                {errors.labResults}
              </p>
            )}
            <div className="space-y-2">
              {form.labResults.map((lab, i) => (
                <div key={i} className="flex items-end gap-2">
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-2">
                    <FormField
                      compact
                      label="Test"
                      value={lab.name}
                      maxLength={120}
                      onChange={(e) => updateLab(i, { name: e.target.value })}
                    />
                    <FormField
                      compact
                      label="Value"
                      value={lab.value}
                      maxLength={50}
                      onChange={(e) => updateLab(i, { value: e.target.value })}
                    />
                    <FormField
                      compact
                      label="Unit"
                      value={lab.unit ?? ""}
                      maxLength={30}
                      onChange={(e) => updateLab(i, { unit: e.target.value })}
                    />
                    <FormField
                      compact
                      label="Reference"
                      value={lab.referenceRange ?? ""}
                      maxLength={50}
                      onChange={(e) =>
                        updateLab(i, { referenceRange: e.target.value })
                      }
                    />
                    <FormField
                      compact
                      as="select"
                      label="Flag"
                      value={lab.flag}
                      onChange={(e) => updateLab(i, { flag: e.target.value })}
                    >
                      {LAB_FLAGS.map((f) => (
                        <option key={f} value={f}>
                          {labelFor(f)}
                        </option>
                      ))}
                    </FormField>
                  </div>
                  <IconButton
                    icon={faTrash}
                    title="Remove"
                    className="text-red-500 hover:bg-red-50"
                    onClick={() =>
                      setForm({
                        ...form,
                        labResults: form.labResults.filter((_, j) => j !== i),
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}

RecordForm.propTypes = {
  patient: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  record: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default RecordForm;
