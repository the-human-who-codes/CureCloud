// API enums are lowercase ("confirmed", "critical"); the UI shows them capitalised.
export const capitalize = (s) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

// Business rules run in South African time (UTC+2, no DST). The display zone follows the user's
// preference once it has loaded (AuthProvider), defaulting to SAST.
export const SAST = "Africa/Johannesburg";
let displayTimeZone = SAST;
export const setDisplayTimeZone = (tz) => {
  displayTimeZone = tz || SAST;
};

// Enum values whose label is not just the capitalised value.
const LABELS = {
  iv: "IV",
  im: "IM",
  sc: "Subcutaneous",
  "za-id": "SA ID number",
  "asylum-seeker-permit": "Asylum seeker permit",
  hpcsa: "HPCSA",
  sanc: "SANC",
  "check-up": "Check-up",
  "on-call": "On call",
  "no-show": "No-show",
  "checked-in": "Checked in",
  "entered-in-error": "Entered in error",
  "not-done": "Not done",
  "not-given": "Not given",
  "as-needed": "As needed (PRN)",
  "community-health-centre": "Community health centre",
  en: "English",
  af: "Afrikaans",
  zu: "isiZulu",
  xh: "isiXhosa",
};

// "in-progress" -> "In progress", "iv" -> "IV". Used for every enum shown in the UI.
export const labelFor = (value) =>
  value == null || value === ""
    ? "—"
    : LABELS[value] ?? capitalize(String(value).replace(/[_-]/g, " "));

export function ageFromDob(birthDate) {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()))
    age -= 1;
  return age;
}

// YYYY-MM-DD in SAST, matching the API's calendar dates.
export const todaySast = () =>
  new Date(Date.now() + 2 * 3600e3).toISOString().slice(0, 10);

// YYYY-MM-DD shifted by `days`.
export const addDays = (date, days) =>
  new Date(Date.parse(`${date}T00:00:00Z`) + days * 86400e3)
    .toISOString()
    .slice(0, 10);

// SAST wall-clock date (+ time) -> an ISO instant with offset, as the API requires.
export const sastInstant = (date, time = "00:00") => `${date}T${time}:00+02:00`;

// <input type="datetime-local"> value (read as SAST) <-> ISO instant.
export const fromLocalInput = (value) => (value ? `${value}:00+02:00` : "");
export const toLocalInput = (iso) =>
  iso ? new Date(Date.parse(iso) + 2 * 3600e3).toISOString().slice(0, 16) : "";

// ISO instant -> SAST "HH:mm" and "YYYY-MM-DD".
export const sastTime = (iso) =>
  new Date(Date.parse(iso) + 2 * 3600e3).toISOString().slice(11, 16);
export const sastDate = (iso) =>
  new Date(Date.parse(iso) + 2 * 3600e3).toISOString().slice(0, 10);

const fmt = (iso, options) =>
  iso
    ? new Date(iso).toLocaleString("en-ZA", {
        timeZone: displayTimeZone,
        ...options,
      })
    : "—";

// "12 Oct 2026, 09:00"
export const formatDateTime = (iso) =>
  fmt(iso, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
// "12 Oct 2026" (instants) - calendar dates (YYYY-MM-DD) are formatted without a zone shift.
export const formatDate = (value) => {
  if (!value) return "—";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value))
    return new Date(`${value}T12:00:00Z`).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  return fmt(value, { day: "numeric", month: "short", year: "numeric" });
};
// "09:00"
export const formatTime = (iso) =>
  fmt(iso, { hour: "2-digit", minute: "2-digit", hour12: false });

// "5 min ago", "3 h ago", "2 d ago"; older dates fall back to formatDate.
export function relativeTime(iso) {
  if (!iso) return "—";
  const minutes = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (minutes < 60 * 24) return `${Math.round(minutes / 60)} h ago`;
  if (minutes < 60 * 24 * 7) return `${Math.round(minutes / 1440)} d ago`;
  return formatDate(iso);
}

export const formatBloodPressure = (bp) =>
  bp ? `${bp.systolic}/${bp.diastolic}` : null;

// Patient latestVitals -> the four dashboard stat cards.
export function healthStatsFromVitals(vitals) {
  const withUnit = (v, unit) => (v == null ? "—" : `${v} ${unit}`);
  return {
    bloodPressure: vitals?.bloodPressure
      ? `${formatBloodPressure(vitals.bloodPressure)} mmHg`
      : "—",
    heartRate: withUnit(vitals?.heartRate, "bpm"),
    weight: withUnit(vitals?.weight, "kg"),
    bloodGlucose: withUnit(vitals?.bloodGlucose, "mmol/L"),
  };
}

// "totalPatients" -> "Total Patients"
export const humanizeKey = (key) =>
  capitalize(key.replace(/([A-Z])/g, " $1").trim());

// "Monday, 12 October 2026" - the long date shown under page titles.
export const longDate = (date = new Date()) =>
  date.toLocaleDateString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: displayTimeZone,
  });

// Identity numbers are shown masked except the last 4 characters.
export const maskIdentifier = (value) =>
  value
    ? `${"•".repeat(Math.max(0, value.length - 4))}${value.slice(-4)}`
    : "—";

// Rows -> a CSV download (reports are exported client-side).
export function downloadCsv(filename, rows) {
  const escape = (v) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = rows.map((row) => row.map(escape).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
