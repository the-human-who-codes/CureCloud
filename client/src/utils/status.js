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
// Covers every enum in the backend's docs/domain-model.md plus the labels the
// remaining mock-backed pages still use. Unknown values fall back to "warning".
const STATUS_TONES = {
  // Done / healthy
  active: "success",
  completed: "success",
  complete: "success",
  final: "success",
  given: "success",
  stable: "success",
  "on duty": "success",
  online: "success",
  low: "success",
  normal: "success",
  mild: "success",
  // Booked / informational
  confirmed: "info",
  "checked in": "info",
  scheduled: "info",
  processing: "info",
  amended: "info",
  upcoming: "info",
  info: "info",
  important: "info",
  // Needs attention
  pending: "warning",
  preliminary: "warning",
  "on hold": "warning",
  open: "warning",
  "in progress": "warning",
  due: "warning",
  "needs attention": "warning",
  medium: "warning",
  moderate: "warning",
  high: "warning",
  away: "warning",
  warning: "warning",
  "on leave": "warning",
  // Failed / stopped / urgent
  critical: "danger",
  severe: "danger",
  urgent: "danger",
  overdue: "danger",
  missed: "danger",
  "no show": "danger",
  "not given": "danger",
  "not done": "danger",
  stopped: "danger",
  disabled: "danger",
  inactive: "danger",
  "entered in error": "danger",
  error: "danger",
  // Closed / archived
  cancelled: "neutral",
  archived: "neutral",
  resolved: "neutral",
  deceased: "neutral",
  offline: "neutral",
};

export const toneForStatus = (status) =>
  STATUS_TONES[
    String(status ?? "")
      .toLowerCase()
      .replace(/[_-]/g, " ")
  ] ?? "warning";
