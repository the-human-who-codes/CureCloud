// API enums are lowercase ("confirmed", "critical"); the UI shows them capitalised.
export const capitalize = (s) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

export function ageFromDob(dob) {
  if (!dob) return null;
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()))
    age -= 1;
  return age;
}

// YYYY-MM-DD in SAST, matching the API's appointment dates.
export const todaySast = () =>
  new Date(Date.now() + 2 * 3600e3).toISOString().slice(0, 10);

const VITAL_UNITS = { heartRate: "bpm", weight: "kg", bloodSugar: "mg/dL" };

// Patient vitals -> the four dashboard stat cards.
export function healthStatsFromVitals(vitals) {
  return Object.fromEntries(
    ["bloodPressure", "heartRate", "weight", "bloodSugar"].map((key) => {
      const v = vitals?.[key];
      return [
        key,
        v == null ? "—" : VITAL_UNITS[key] ? `${v} ${VITAL_UNITS[key]}` : v,
      ];
    })
  );
}

// "totalPatients" -> "Total Patients"
export const humanizeKey = (key) =>
  capitalize(key.replace(/([A-Z])/g, " $1").trim());

// "Monday, October 12, 2026" - the long date shown under page titles.
export const longDate = (date = new Date()) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
