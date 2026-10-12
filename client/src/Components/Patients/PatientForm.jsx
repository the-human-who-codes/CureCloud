import { useState } from "react";
import PropTypes from "prop-types";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useAction, useApi } from "../../hooks/useApi";
import { labelFor, todaySast } from "../../utils/format";
import { ACUITIES, SEXES } from "../../utils/patients";
import {
  checks,
  compact,
  identifierError,
  validate,
} from "../../utils/validation";
import { ErrorMessage } from "../common/AsyncContent";
import { Button, IconButton } from "../common/Button";
import { SectionTitle } from "../common/Card";
import { Checkbox, FormField } from "../common/FormField";
import Modal from "../common/Modal";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const PROVINCES = [
  "eastern-cape",
  "free-state",
  "gauteng",
  "kwazulu-natal",
  "limpopo",
  "mpumalanga",
  "north-west",
  "northern-cape",
  "western-cape",
];
const SEVERITIES = ["mild", "moderate", "severe"];

// Writable field sets for PATCH /patients/{id} per access level (§3.4, src/authz/redact.js).
const SELF = [
  "name",
  "givenName",
  "familyName",
  "phone",
  "email",
  "address",
  "emergencyContact",
];
const DEMOGRAPHICS = [...SELF, "birthDate", "sex", "folderNumber"];
const CLINICAL = [
  "bloodType",
  "allergies",
  "noKnownAllergies",
  "chronicConditions",
  "acuity",
];

// Which fields this form shows and sends, from the caller's role (admins are administrative,
// doctors and nurses clinical). Creating also allows `identifier` for every staff role.
function fieldSet(user, creating, systemAdmin) {
  if (user.role === "admin")
    return [
      ...DEMOGRAPHICS,
      "identifier",
      ...(creating ? [] : ["status"]),
      ...(systemAdmin ? ["facilityId"] : []),
    ];
  return [
    ...DEMOGRAPHICS,
    ...CLINICAL,
    ...(creating ? ["identifier"] : []),
    ...(user.role === "doctor" && !creating ? ["status", "deceasedAt"] : []),
  ];
}

const toForm = (p = {}) => ({
  name: p.name ?? "",
  givenName: p.givenName ?? "",
  familyName: p.familyName ?? "",
  birthDate: p.birthDate ?? "",
  sex: p.sex ?? "unknown",
  phone: p.phone ?? "",
  email: p.email ?? "",
  folderNumber: p.folderNumber ?? "",
  line1: p.address?.line1 ?? "",
  line2: p.address?.line2 ?? "",
  suburb: p.address?.suburb ?? "",
  city: p.address?.city ?? "",
  province: p.address?.province ?? "gauteng",
  postalCode: p.address?.postalCode ?? "",
  ecName: p.emergencyContact?.name ?? "",
  ecRelationship: p.emergencyContact?.relationship ?? "",
  ecPhone: p.emergencyContact?.phone ?? "",
  identifierType: p.identifier?.type ?? "za-id",
  identifierValue: "",
  identifierCountry: p.identifier?.country ?? "",
  bloodType: p.bloodType ?? "",
  acuity: p.acuity ?? "stable",
  noKnownAllergies: p.noKnownAllergies ?? false,
  allergies: p.allergies ?? [],
  chronicConditions: p.chronicConditions ?? [],
  status: p.status ?? "active",
  deceasedAt: p.deceasedAt ?? "",
  facilityId: p.facilityId ?? "",
});

const hasAddress = (f) =>
  [f.line1, f.line2, f.suburb, f.city, f.postalCode].some((v) => v.trim());
const hasContact = (f) =>
  [f.ecName, f.ecRelationship, f.ecPhone].some((v) => v.trim());

// Form state -> request body values (null clears an optional field).
function toBody(f) {
  const opt = (v) => (v.trim() ? v.trim() : null);
  return {
    name: f.name.trim(),
    givenName: opt(f.givenName),
    familyName: opt(f.familyName),
    birthDate: opt(f.birthDate),
    sex: f.sex,
    phone: opt(f.phone),
    email: opt(f.email),
    folderNumber: opt(f.folderNumber),
    address: hasAddress(f)
      ? compact({
          line1: f.line1,
          line2: f.line2,
          suburb: f.suburb,
          city: f.city,
          province: f.province,
          postalCode: f.postalCode,
          country: "ZA",
        })
      : null,
    emergencyContact: hasContact(f)
      ? {
          name: f.ecName.trim(),
          relationship: f.ecRelationship.trim(),
          phone: f.ecPhone.trim(),
        }
      : null,
    identifier: f.identifierValue.trim()
      ? compact({
          type: f.identifierType,
          value: f.identifierValue,
          country: f.identifierCountry.toUpperCase(),
        })
      : undefined,
    bloodType: f.bloodType || null,
    acuity: f.acuity,
    noKnownAllergies: f.allergies.length ? false : f.noKnownAllergies,
    // Blank rows (added but never filled in) are dropped.
    allergies: f.allergies.filter((a) => a.substance?.trim()).map(compact),
    chronicConditions: f.chronicConditions
      .filter((c) => c.name?.trim())
      .map(compact),
    status: f.status,
    deceasedAt: f.status === "deceased" ? opt(f.deceasedAt) : null,
    facilityId: f.facilityId || undefined,
  };
}

// Mirrors PatientCreateRequest / PatientUpdateRequest (src/models/patient.js).
const RULES = {
  name: checks.name,
  givenName: checks.maxLength(60),
  familyName: checks.maxLength(60),
  phone: checks.phone,
  email: checks.email,
  folderNumber: checks.folderNumber,
  birthDate: (v) => (v && v > todaySast() ? "Cannot be in the future" : null),
  line1: (v, f) =>
    hasAddress(f) && !v.trim() ? "Required for an address" : null,
  city: (v, f) =>
    hasAddress(f) && !v.trim() ? "Required for an address" : null,
  postalCode: [
    (v, f) => (hasAddress(f) && !v.trim() ? "Required for an address" : null),
    checks.postalCode,
  ],
  ecName: (v, f) =>
    hasContact(f) && v.trim().length < 2 ? "Name of the contact" : null,
  ecRelationship: (v, f) =>
    hasContact(f) && !v.trim() ? "Required" : checks.maxLength(50)(v),
  ecPhone: [
    (v, f) => (hasContact(f) && !v.trim() ? "Required" : null),
    checks.phone,
  ],
  identifierValue: (v, f) =>
    identifierError({
      type: f.identifierType,
      value: v,
      country: f.identifierCountry,
    }),
  deceasedAt: (v, f) =>
    f.status === "deceased" && !v ? "Date of death is required" : null,
};

const sameJson = (a, b) =>
  JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

// Allergy and condition rows editor.
function ListEditor({ label, items, onChange, blank, render }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="font-poppins text-sm text-ink">{label}</p>
        <Button
          size="sm"
          variant="secondary"
          icon={faPlus}
          onClick={() => onChange([...items, { ...blank }])}
        >
          Add
        </Button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
              {render(item, (patch) =>
                onChange(
                  items.map((x, j) => (j === i ? { ...x, ...patch } : x))
                )
              )}
            </div>
            <IconButton
              icon={faTrash}
              title="Remove"
              className="text-red-500 hover:bg-red-50"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

ListEditor.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  blank: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
};

// Registers (POST /patients) or edits (PATCH /patients/{id}) a patient. Only the fields the
// caller's access level may write are shown and sent; edits send only what changed.
function PatientForm({ patient, onClose, onSaved }) {
  const { user, isSystemAdmin } = useAuth();
  const creating = !patient;
  const fields = new Set(fieldSet(user, creating, isSystemAdmin));
  const [form, setForm] = useState(() => toForm(patient));
  const [errors, setErrors] = useState({});
  const facilities = useApi(
    () =>
      fields.has("facilityId")
        ? api.listFacilities({ limit: 100 })
        : Promise.resolve(null),
    []
  );

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e?.target ? e.target.value : e }));

  const save = useAction(async () => {
    const values = toBody(form);
    const original = patient ? toBody(toForm(patient)) : {};
    const body = {};
    for (const key of fields) {
      if (values[key] === undefined) continue;
      if (!creating && sameJson(values[key], original[key])) continue;
      if (creating && values[key] === null) continue;
      body[key] = values[key];
    }
    if (!creating && Object.keys(body).length === 0) return onClose();
    const saved = creating
      ? await api.createPatient(body)
      : await api.updatePatient(patient.id, body);
    onSaved(saved);
    onClose();
  });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(form, RULES);
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
  const select = (key, label, options, props = {}) => (
    <FormField
      as="select"
      label={label}
      value={form[key]}
      onChange={set(key)}
      {...props}
    >
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>
          {o.label ?? labelFor(o)}
        </option>
      ))}
    </FormField>
  );

  return (
    <Modal
      title={creating ? "Register Patient" : `Edit ${patient.name}`}
      onClose={onClose}
      size="xl"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="patient-form" disabled={save.busy}>
            {save.busy ? "Saving…" : "Save"}
          </Button>
        </>
      }
    >
      <form
        id="patient-form"
        onSubmit={submit}
        noValidate
        className="space-y-6"
      >
        <ErrorMessage
          error={
            save.error?.code === "duplicate-identifier"
              ? {
                  message:
                    "A patient with this ID number is already registered.",
                }
              : save.error
          }
        />

        <section className="space-y-4">
          <SectionTitle size="lg" spacing="none">
            Demographics
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {field("name", "Full name", { required: true, maxLength: 120 })}
            {field("givenName", "Given name", { maxLength: 60 })}
            {field("familyName", "Family name", { maxLength: 60 })}
            {field("birthDate", "Date of birth", {
              type: "date",
              max: todaySast(),
            })}
            {select("sex", "Sex", SEXES)}
            {field("folderNumber", "Folder number", { maxLength: 30 })}
            {field("phone", "Phone", { type: "tel" })}
            {field("email", "Contact email", { type: "email" })}
            {fields.has("facilityId") &&
              select("facilityId", "Facility", [
                { value: "", label: creating ? "Not assigned" : "Unchanged" },
                ...(facilities.data?.data ?? []).map((f) => ({
                  value: f.id,
                  label: f.name,
                })),
              ])}
          </div>
        </section>

        {fields.has("identifier") && (
          <section className="space-y-4">
            <SectionTitle size="lg" spacing="none">
              Identity document
            </SectionTitle>
            {patient?.identifier && (
              <p className="font-poppins text-sm text-ink">
                On file: {labelFor(patient.identifier.type)}. Enter a number
                only to replace it.
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {select("identifierType", "Type", [
                "za-id",
                "passport",
                "asylum-seeker-permit",
                "other",
              ])}
              {field("identifierValue", "Number", { autoComplete: "off" })}
              {form.identifierType === "passport" &&
                field("identifierCountry", "Country (e.g. ZW)", {
                  maxLength: 2,
                })}
            </div>
          </section>
        )}

        <section className="space-y-4">
          <SectionTitle size="lg" spacing="none">
            Address and emergency contact
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {field("line1", "Street address", { maxLength: 200 })}
            {field("line2", "Address line 2", { maxLength: 200 })}
            {field("suburb", "Suburb", { maxLength: 100 })}
            {field("city", "City or town", { maxLength: 100 })}
            {select("province", "Province", PROVINCES)}
            {field("postalCode", "Postal code", {
              inputMode: "numeric",
              maxLength: 4,
            })}
            {field("ecName", "Emergency contact name")}
            {field("ecRelationship", "Relationship", { maxLength: 50 })}
            {field("ecPhone", "Emergency contact phone", { type: "tel" })}
          </div>
        </section>

        {fields.has("acuity") && (
          <section className="space-y-4">
            <SectionTitle size="lg" spacing="none">
              Clinical summary
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {select("acuity", "Acuity", ACUITIES)}
              {select("bloodType", "Blood type", [
                { value: "", label: "Unknown" },
                ...BLOOD_TYPES.map((b) => ({ value: b, label: b })),
              ])}
            </div>
            <ListEditor
              label="Allergies"
              items={form.allergies}
              blank={{ substance: "", reaction: "", severity: "moderate" }}
              onChange={set("allergies")}
              render={(a, update) => (
                <>
                  <FormField
                    compact
                    label="Substance"
                    value={a.substance}
                    maxLength={100}
                    required
                    onChange={(e) => update({ substance: e.target.value })}
                  />
                  <FormField
                    compact
                    label="Reaction"
                    value={a.reaction ?? ""}
                    maxLength={200}
                    onChange={(e) => update({ reaction: e.target.value })}
                  />
                  <FormField
                    compact
                    as="select"
                    label="Severity"
                    value={a.severity}
                    onChange={(e) => update({ severity: e.target.value })}
                  >
                    {SEVERITIES.map((s) => (
                      <option key={s} value={s}>
                        {labelFor(s)}
                      </option>
                    ))}
                  </FormField>
                </>
              )}
            />
            {form.allergies.length === 0 && (
              <Checkbox
                label="No known allergies"
                hint="Leave unticked if allergies have not been asked about yet."
                checked={form.noKnownAllergies}
                onChange={set("noKnownAllergies")}
              />
            )}
            <ListEditor
              label="Chronic conditions"
              items={form.chronicConditions}
              blank={{ name: "", code: "", since: "" }}
              onChange={set("chronicConditions")}
              render={(c, update) => (
                <>
                  <FormField
                    compact
                    label="Condition"
                    value={c.name}
                    maxLength={120}
                    required
                    onChange={(e) => update({ name: e.target.value })}
                  />
                  <FormField
                    compact
                    label="ICD-10 code"
                    value={c.code ?? ""}
                    error={checks.icd10(c.code) ?? undefined}
                    onChange={(e) =>
                      update({ code: e.target.value.toUpperCase() })
                    }
                  />
                  <FormField
                    compact
                    type="date"
                    label="Since"
                    value={c.since ?? ""}
                    max={todaySast()}
                    onChange={(e) => update({ since: e.target.value })}
                  />
                </>
              )}
            />
          </section>
        )}

        {fields.has("status") && (
          <section className="space-y-4">
            <SectionTitle size="lg" spacing="none">
              Record status
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {select(
                "status",
                "Status",
                fields.has("deceasedAt")
                  ? ["active", "inactive", "deceased"]
                  : ["active", "inactive"]
              )}
              {form.status === "deceased" &&
                field("deceasedAt", "Date of death", {
                  type: "date",
                  max: todaySast(),
                })}
            </div>
          </section>
        )}
      </form>
    </Modal>
  );
}

PatientForm.propTypes = {
  patient: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};

export default PatientForm;
