// Client-side checks that mirror the API's zod schemas (CureCloudBackend src/models). The API still
// validates everything; these only give earlier, field-level feedback.

export const normalizePhone = (raw) => {
  const s = String(raw ?? "").replace(/[\s().-]/g, "");
  if (/^0\d{9}$/.test(s)) return `+27${s.slice(1)}`;
  if (/^27\d{9}$/.test(s)) return `+${s}`;
  if (/^00[1-9]\d{7,14}$/.test(s)) return `+${s.slice(2)}`;
  if (/^\+[1-9]\d{7,14}$/.test(s)) return s;
  return null;
};

const luhnValid = (digits) => {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
};

const isValidDate = (value) => {
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
};

export const isZaId = (value) => {
  if (!/^\d{13}$/.test(value) || !luhnValid(value)) return false;
  const yy = Number(value.slice(0, 2));
  const century = yy > new Date().getUTCFullYear() % 100 ? 1900 : 2000;
  return isValidDate(
    `${century + yy}-${value.slice(2, 4)}-${value.slice(4, 6)}`
  );
};

// Each check returns an error message, or null when the value is valid. Empty values pass
// unless the check is `required`.
const empty = (v) => v === undefined || v === null || String(v).trim() === "";

export const checks = {
  required: (v) => (empty(v) ? "Required" : null),
  name: (v) =>
    empty(v)
      ? "Required"
      : String(v).trim().length < 2 || String(v).trim().length > 120
      ? "Must be 2 to 120 characters"
      : null,
  maxLength: (max) => (v) =>
    !empty(v) && String(v).trim().length > max
      ? `At most ${max} characters`
      : null,
  email: (v) =>
    !empty(v) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim())
      ? "Enter a valid email address"
      : null,
  phone: (v) =>
    !empty(v) && !normalizePhone(v)
      ? "Enter a valid phone number, e.g. 082 123 4567"
      : null,
  licenceNumber: (v) =>
    !empty(v) && !/^[A-Za-z0-9/-]{4,20}$/.test(String(v).trim())
      ? "4 to 20 letters, digits, / or -"
      : null,
  folderNumber: (v) =>
    !empty(v) && !/^[A-Za-z0-9/-]{1,30}$/.test(String(v).trim())
      ? "Up to 30 letters, digits, / or -"
      : null,
  postalCode: (v) =>
    !empty(v) && !/^\d{4}$/.test(String(v)) ? "Expected 4 digits" : null,
  icd10: (v) =>
    !empty(v) && !/^[A-Z]\d{2}(\.\d{1,2})?$/.test(String(v).trim())
      ? "ICD-10 code such as E11.9"
      : null,
  time: (v) =>
    !empty(v) && !/^([01]\d|2[0-3]):[0-5]\d$/.test(v) ? "Expected HH:mm" : null,
  intRange: (min, max) => (v) =>
    !empty(v) &&
    (!Number.isInteger(Number(v)) || Number(v) < min || Number(v) > max)
      ? `Whole number from ${min} to ${max}`
      : null,
  numberRange: (min, max) => (v) =>
    !empty(v) && (Number.isNaN(Number(v)) || Number(v) < min || Number(v) > max)
      ? `Between ${min} and ${max}`
      : null,
};

// Identifier { type, value, country } as on the API (za-id: valid SA ID; others 4–20 chars).
export function identifierError({ type, value, country } = {}) {
  if (empty(value)) return null;
  const v = String(value).trim();
  if (type === "za-id")
    return isZaId(v) ? null : "Invalid South African ID number";
  if (!/^[A-Za-z0-9-]{4,20}$/.test(v)) return "Invalid document number";
  if (type === "passport" && !/^[A-Z]{2}$/.test(country ?? ""))
    return "Passport needs a 2-letter country code";
  return null;
}

// Runs `rules` ({ field: check | check[] }) over `values`. Returns { field: message } for failures.
export function validate(values, rules) {
  const errors = {};
  for (const [field, rule] of Object.entries(rules)) {
    for (const check of [rule].flat()) {
      const message = check(values[field], values);
      if (message) {
        errors[field] = message;
        break;
      }
    }
  }
  return errors;
}

// Drops empty strings so optional fields are omitted from request bodies; trims the rest.
export function compact(values) {
  return Object.fromEntries(
    Object.entries(values)
      .map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
      .filter(([, v]) => v !== "" && v !== undefined)
  );
}
