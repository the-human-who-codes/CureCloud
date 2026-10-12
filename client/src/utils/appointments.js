import { addDays, sastInstant, todaySast } from "./format";

export const APPOINTMENT_TYPES = [
  "check-up",
  "consultation",
  "follow-up",
  "procedure",
  "test",
  "vaccination",
  "other",
];
export const APPOINTMENT_STATUSES = [
  "pending",
  "confirmed",
  "checked-in",
  "completed",
  "cancelled",
  "no-show",
];
export const DURATIONS = [15, 30, 45, 60];

const HOUR = 3600e3;

// Actions the signed-in user may take on an appointment, from the transition table in
// docs/domain-model.md §2.7. The API enforces the same rules; this only hides buttons.
export function appointmentActions(appointment, user, settings) {
  const { status } = appointment;
  const start = Date.parse(appointment.start);
  const now = Date.now();
  const ownDoctor = user.role === "doctor" && appointment.doctorId === user.id;
  const admin = user.role === "admin";
  const patient = user.role === "patient";
  const open = status === "pending" || status === "confirmed";
  const started = now >= start;
  const cutoffHours =
    settings?.appointments?.patientCancellationCutoffHours ?? 2;
  const beforeCutoff = start - now >= cutoffHours * HOUR;

  return {
    confirm: status === "pending" && (ownDoctor || admin),
    checkIn:
      status === "confirmed" &&
      now >= start - 2 * HOUR &&
      (ownDoctor || admin || user.role === "nurse"),
    complete:
      (status === "confirmed" || status === "checked-in") &&
      started &&
      ownDoctor,
    noShow:
      (status === "confirmed" || status === "checked-in") &&
      started &&
      (ownDoctor || admin),
    cancel: open && (ownDoctor || admin || (patient && beforeCutoff)),
    reschedule: open && (ownDoctor || admin || patient),
  };
}

const minutesOf = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// ISO weekday (1 = Monday … 7 = Sunday) of a YYYY-MM-DD date.
const isoWeekday = (date) => {
  const d = new Date(`${date}T12:00:00Z`).getUTCDay();
  return d === 0 ? 7 : d;
};

// Dates a patient may book: opening-hours weekdays from today up to bookingWindowDays ahead.
export function bookableDates(settings) {
  const { bookingWindowDays = 90, openingHours } = settings?.appointments ?? {};
  const days = openingHours?.days ?? [1, 2, 3, 4, 5];
  const today = todaySast();
  const dates = [];
  for (let i = 0; i <= bookingWindowDays; i++) {
    const date = addDays(today, i);
    if (days.includes(isoWeekday(date))) dates.push(date);
  }
  return dates;
}

// Candidate start times for one day: the opening hours on 15-minute boundaries, minus the busy
// intervals (bookings and leave), minus anything before now + minLeadTimeMinutes (§2.7).
export function candidateSlots({ date, settings, busy, durationMinutes }) {
  const { openingHours, minLeadTimeMinutes = 60 } =
    settings?.appointments ?? {};
  if (!openingHours || !openingHours.days.includes(isoWeekday(date))) return [];
  const dayStart = Date.parse(sastInstant(date));
  const earliest = Date.now() + minLeadTimeMinutes * 60e3;
  const intervals = busy.map((b) => [Date.parse(b.start), Date.parse(b.end)]);
  const slots = [];
  for (
    let m = minutesOf(openingHours.start);
    m + durationMinutes <= minutesOf(openingHours.end);
    m += 15
  ) {
    const start = dayStart + m * 60e3;
    const end = start + durationMinutes * 60e3;
    if (start < earliest) continue;
    if (intervals.some(([bs, be]) => start < be && bs < end)) continue;
    slots.push(new Date(start).toISOString());
  }
  return slots;
}
