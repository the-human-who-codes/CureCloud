import { auth } from "../firebaseConfig";

// Set per mode in .env.development / .env.production / .env.emulator. Versioned routes live under
// /v1; only /health is unversioned (backend docs/domain-model.md §1.10).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";
const V1 = `${API_BASE_URL}/v1`;

// An RFC 9457 problem+json response. `message` is `detail ?? title` and is safe to show to users;
// `errors` holds the per-field validation failures ({ path, message, code }).
export class ApiError extends Error {
  constructor({ status, code, title, detail, errors } = {}) {
    super(detail ?? title ?? "Something went wrong. Please try again.");
    this.status = status;
    this.code = code;
    this.title = title;
    this.detail = detail;
    this.errors = errors ?? [];
  }

  // { "address.city": "Required", ... } for highlighting form fields.
  fieldErrors() {
    return Object.fromEntries(this.errors.map((e) => [e.path, e.message]));
  }
}

const toQueryString = (query) => {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    params.set(key, Array.isArray(value) ? value.join(",") : String(value));
  }
  const s = params.toString();
  return s ? `?${s}` : "";
};

// Calls the CureCloud API with the signed-in user's Firebase ID token.
async function request(
  path,
  { method = "GET", body, query, auth: withAuth = true, base = V1 } = {}
) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (withAuth) {
    const user = auth.currentUser;
    if (!user)
      throw new ApiError({
        status: 401,
        code: "unauthenticated",
        title: "Not signed in",
      });
    headers.Authorization = `Bearer ${await user.getIdToken()}`;
  }

  let res;
  try {
    res = await fetch(`${base}${path}${toQueryString(query)}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError({
      status: 0,
      code: "network-error",
      title: "Could not reach CureCloud. Check your connection.",
    });
  }

  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok)
    throw new ApiError({
      status: res.status,
      code: data?.code,
      title: data?.title ?? res.statusText,
      detail: data?.detail,
      errors: data?.errors,
    });
  return data;
}

const get = (path, query) => request(path, { query });
const post = (path, body) => request(path, { method: "POST", body });
const patch = (path, body) => request(path, { method: "PATCH", body });

// Follows nextCursor until the list is exhausted (or `max` items are loaded). For small bounded
// lists such as departments or a picker; paged UIs use usePagedApi instead.
export async function listAll(fetchPage, query = {}, max = 500) {
  const items = [];
  let cursor;
  do {
    const page = await fetchPage({ ...query, limit: 100, cursor });
    items.push(...page.data);
    cursor = page.nextCursor;
  } while (cursor && items.length < max);
  return items.slice(0, max);
}

// One function per endpoint in docs/domain-model.md §4.2. Lists return { data, nextCursor }.
export const api = {
  // Public
  health: () => request("/health", { auth: false, base: API_BASE_URL }),
  signupStaff: (form) =>
    request("/auth/signup", { method: "POST", body: form, auth: false }),

  // Me
  getMe: () => get("/me"), // 404 => signed in but needs onboarding (createMe)
  createMe: (profile = {}) => post("/me", profile),
  updateMe: (changes) => patch("/me", changes),
  getPreferences: () => get("/me/preferences"),
  updatePreferences: (changes) => patch("/me/preferences", changes),

  // Dashboard and reports
  getDashboard: () => get("/dashboard"),
  getReportSummary: (query) => get("/reports/summary", query),

  // Users, directory, organisation
  listUsers: (query) => get("/users", query),
  getUser: (id) => get(`/users/${id}`),
  updateUser: (id, changes) => patch(`/users/${id}`, changes),
  listPractitioners: (query) => get("/practitioners", query),
  getPractitionerBusy: (id, query) => get(`/practitioners/${id}/busy`, query),
  listFacilities: (query) => get("/facilities", query),
  listDepartments: (query) => get("/departments", query),
  createDepartment: (department) => post("/departments", department),
  updateDepartment: (id, changes) => patch(`/departments/${id}`, changes),

  // Patients
  listPatients: (query) => get("/patients", query),
  getPatient: (id) => get(`/patients/${id}`),
  createPatient: (patient) => post("/patients", patient),
  updatePatient: (id, changes) => patch(`/patients/${id}`, changes),
  getCareTeam: (id) => get(`/patients/${id}/care-team`),
  addCareTeamMember: (id, userId) =>
    post(`/patients/${id}/care-team`, { userId }),
  removeCareTeamMember: (id, userId) =>
    request(`/patients/${id}/care-team/${userId}`, { method: "DELETE" }),
  admitPatient: (id, admission) => post(`/patients/${id}/admission`, admission),
  updateAdmission: (id, changes) => patch(`/patients/${id}/admission`, changes),
  dischargePatient: (id, body = {}) =>
    post(`/patients/${id}/admission/discharge`, body),
  listVitals: (id, query) => get(`/patients/${id}/vitals`, query),
  recordVitals: (id, vitals) => post(`/patients/${id}/vitals`, vitals),
  retractVitals: (id, vitalsId, statusReason) =>
    patch(`/patients/${id}/vitals/${vitalsId}`, {
      status: "entered-in-error",
      statusReason,
    }),

  // Appointments
  listAppointments: (query) => get("/appointments", query),
  getAppointment: (id) => get(`/appointments/${id}`),
  bookAppointment: (appointment) => post("/appointments", appointment),
  updateAppointment: (id, changes) => patch(`/appointments/${id}`, changes),

  // Prescriptions and medication administration
  listPrescriptions: (query) => get("/prescriptions", query),
  getPrescription: (id) => get(`/prescriptions/${id}`),
  createPrescription: (rx) => post("/prescriptions", rx),
  updatePrescription: (id, changes) => patch(`/prescriptions/${id}`, changes),
  requestRefill: (id, note) =>
    post(`/prescriptions/${id}/refill-requests`, note ? { note } : {}),
  getMedicationSchedule: (query) => get("/medication-schedule", query),
  listAdministrations: (query) => get("/medication-administrations", query),
  recordAdministration: (body) => post("/medication-administrations", body),
  retractAdministration: (id, statusReason) =>
    patch(`/medication-administrations/${id}`, {
      status: "entered-in-error",
      statusReason,
    }),

  // Medical records
  listMedicalRecords: (query) => get("/medical-records", query),
  getMedicalRecord: (id) => get(`/medical-records/${id}`),
  createMedicalRecord: (record) => post("/medical-records", record),
  updateMedicalRecord: (id, changes) =>
    patch(`/medical-records/${id}`, changes),
  addAddendum: (id, text) => post(`/medical-records/${id}/addenda`, { text }),

  // Care tasks and shifts
  listCareTasks: (query) => get("/care-tasks", query),
  getCareTask: (id) => get(`/care-tasks/${id}`),
  createCareTask: (task) => post("/care-tasks", task),
  updateCareTask: (id, changes) => patch(`/care-tasks/${id}`, changes),
  listShifts: (query) => get("/shifts", query),
  getCurrentShift: () => get("/shifts/current"),
  createShift: (shift) => post("/shifts", shift),
  updateShift: (id, changes) => patch(`/shifts/${id}`, changes),

  // Notifications
  listNotifications: (query) => get("/notifications", query),
  getUnreadNotificationCount: () => get("/notifications/unread-count"),
  markNotificationRead: (id) => patch(`/notifications/${id}`, { read: true }),
  markAllNotificationsRead: () => post("/notifications/read-all"),

  // Conversations
  listConversations: (query) => get("/conversations", query),
  createConversation: (conversation) => post("/conversations", conversation),
  getConversation: (id) => get(`/conversations/${id}`),
  updateConversation: (id, changes) => patch(`/conversations/${id}`, changes),
  listMessages: (id, query) => get(`/conversations/${id}/messages`, query),
  sendMessage: (id, text) => post(`/conversations/${id}/messages`, { text }),
  markConversationRead: (id) => post(`/conversations/${id}/read`),

  // System settings and alerts
  getSystemSettings: () => get("/system-settings"),
  updateSystemSettings: (changes) => patch("/system-settings", changes),
  listSystemAlerts: (query) => get("/system-alerts", query),
  resolveSystemAlert: (id) =>
    patch(`/system-alerts/${id}`, { status: "resolved" }),
};
