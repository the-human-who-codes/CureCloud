import { ageFromDob, labelFor } from "./format";

// "Ward 3 · Room 12 · Bed B" from a patient's current admission, or null when not admitted.
export const admissionLabel = (admission) =>
  admission
    ? [
        admission.departmentName,
        admission.ward && `Ward ${admission.ward}`,
        admission.room && `Room ${admission.room}`,
        admission.bed && `Bed ${admission.bed}`,
      ]
        .filter(Boolean)
        .join(" · ")
    : null;

// API patient -> props for PatientCard.
export const toPatientCard = (p) => ({
  patientId: p.id,
  name: p.name,
  folderNumber: p.folderNumber ?? undefined,
  age: ageFromDob(p.birthDate) ?? undefined,
  sex: p.sex ? labelFor(p.sex) : undefined,
  room: p.admission?.room ?? undefined,
  acuity: p.acuity ?? undefined,
});

export const SEXES = ["female", "male", "intersex", "unknown"];
export const ACUITIES = ["stable", "moderate", "high", "critical"];
export const RECORD_CATEGORIES = [
  "consultation",
  "progress-note",
  "nursing-note",
  "lab-result",
  "imaging",
  "procedure",
  "discharge-summary",
  "referral",
];
