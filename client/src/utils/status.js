// Badge colour per tone. Every status pill in the app maps onto one of these.
export const TONE_CLASSES = {
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  neutral: "bg-gray-100 text-gray-600",
  brand: "bg-surface text-primary",
};

// Status / priority value (any case, "_" / "-" / " " separated) -> tone.
// Covers every enum in the backend's docs/domain-model.md section 2. Unknown values fall back to
// "warning".
const STATUS_TONES = {
  // Done / healthy
  active: "success",
  completed: "success",
  final: "success",
  given: "success",
  stable: "success",
  "on duty": "success",
  low: "success",
  normal: "success",
  mild: "success",
  // Booked / informational
  confirmed: "info",
  "checked in": "info",
  scheduled: "info",
  amended: "info",
  upcoming: "info",
  info: "info",
  important: "info",
  "on call": "info",
  morning: "info",
  afternoon: "info",
  night: "info",
  day: "info",
  leave: "neutral",
  // Needs attention
  pending: "warning",
  preliminary: "warning",
  "on hold": "warning",
  open: "warning",
  "in progress": "warning",
  due: "warning",
  moderate: "warning",
  high: "warning",
  warning: "warning",
  "on leave": "warning",
  // Failed / stopped / urgent
  critical: "danger",
  severe: "danger",
  urgent: "danger",
  overdue: "danger",
  "no show": "danger",
  "not given": "danger",
  "not done": "danger",
  stopped: "danger",
  disabled: "danger",
  inactive: "danger",
  "entered in error": "danger",
  error: "danger",
  "critical low": "danger",
  "critical high": "danger",
  abnormal: "warning",
  // Closed / archived
  cancelled: "neutral",
  archived: "neutral",
  resolved: "neutral",
  deceased: "neutral",
};

export const toneForStatus = (status) =>
  STATUS_TONES[
    String(status ?? "")
      .toLowerCase()
      .replace(/[_-]/g, " ")
  ] ?? "warning";
