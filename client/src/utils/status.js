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
const STATUS_TONES = {
  active: "success",
  completed: "success",
  complete: "success",
  final: "success",
  stable: "success",
  "on duty": "success",
  online: "success",
  low: "success",
  medium: "success",
  normal: "success",
  confirmed: "info",
  processing: "info",
  scheduled: "info",
  pending: "warning",
  preliminary: "warning",
  "needs attention": "warning",
  high: "warning",
  away: "warning",
  critical: "danger",
  urgent: "danger",
  inactive: "danger",
  overdue: "danger",
  missed: "danger",
  error: "danger",
  cancelled: "neutral",
  offline: "neutral",
};

export const toneForStatus = (status) =>
  STATUS_TONES[
    String(status ?? "")
      .toLowerCase()
      .replace(/[_-]/g, " ")
  ] ?? "warning";
