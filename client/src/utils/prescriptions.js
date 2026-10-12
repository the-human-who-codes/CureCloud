import { labelFor, todaySast } from "./format";

export const ROUTES = [
  "oral",
  "sublingual",
  "iv",
  "im",
  "sc",
  "topical",
  "inhaled",
  "rectal",
  "ophthalmic",
  "otic",
  "nasal",
  "other",
];

// Default administration times per frequency (SAST). null = the prescriber must supply them.
export const FREQUENCY_TIMES = {
  once: null,
  "once-daily": ["08:00"],
  "twice-daily": ["08:00", "20:00"],
  "three-times-daily": ["08:00", "14:00", "20:00"],
  "four-times-daily": ["06:00", "12:00", "18:00", "22:00"],
  "every-4-hours": ["02:00", "06:00", "10:00", "14:00", "18:00", "22:00"],
  "every-6-hours": ["00:00", "06:00", "12:00", "18:00"],
  "every-8-hours": ["06:00", "14:00", "22:00"],
  "at-night": ["21:00"],
  weekly: ["08:00"],
  "as-needed": [],
  custom: null,
};
export const FREQUENCIES = Object.keys(FREQUENCY_TIMES);
export const PRESCRIPTION_STATUSES = [
  "active",
  "on-hold",
  "completed",
  "stopped",
  "entered-in-error",
];

// "Twice daily" or the custom text.
export const frequencyLabel = (rx) =>
  rx.frequency === "custom" ? rx.frequencyText : labelFor(rx.frequency);

// Current = active and today within [startDate, endDate] (§2.8).
export const isCurrent = (rx) => {
  const today = todaySast();
  return (
    rx.status === "active" &&
    rx.startDate <= today &&
    (!rx.endDate || today <= rx.endDate)
  );
};
