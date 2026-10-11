import { auth } from "../firebaseConfig";

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

// Calls the CureCloud API with the signed-in user's Firebase ID token.
async function request(
  path,
  { method = "GET", body, query, auth: withAuth = true } = {}
) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (withAuth) {
    const user = auth.currentUser;
    if (!user) throw new ApiError(401, "Not signed in");
    headers.Authorization = `Bearer ${await user.getIdToken()}`;
  }

  const params = query
    ? "?" +
      new URLSearchParams(
        Object.entries(query).filter(([, v]) => v !== undefined && v !== null)
      )
    : "";
  const res = await fetch(`/api${path}${params}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok)
    throw new ApiError(
      res.status,
      data?.message ?? res.statusText,
      data?.details
    );
  return data;
}

export const api = {
  // Auth & profile
  signupStaff: (form) =>
    request("/auth/signup", { method: "POST", body: form, auth: false }),
  getMe: () => request("/me"), // 404 => signed in but needs onboarding (createMe)
  createMe: (profile = {}) => request("/me", { method: "POST", body: profile }),
  updateMe: (changes) => request("/me", { method: "PATCH", body: changes }),

  // Directory & user management (admin)
  listDoctors: () => request("/doctors"),
  listUsers: (query) => request("/users", { query }),
  updateUser: (id, changes) =>
    request(`/users/${id}`, { method: "PATCH", body: changes }),

  // Patients
  listPatients: (query) => request("/patients", { query }),
  getPatient: (id) => request(`/patients/${id}`),
  createPatient: (patient) =>
    request("/patients", { method: "POST", body: patient }),
  updatePatient: (id, changes) =>
    request(`/patients/${id}`, { method: "PATCH", body: changes }),
  recordVitals: (id, vitals) =>
    request(`/patients/${id}/vitals`, { method: "POST", body: vitals }),
  listVitals: (id, query) => request(`/patients/${id}/vitals`, { query }),

  // Appointments
  listAppointments: (query) => request("/appointments", { query }),
  bookAppointment: (appt) =>
    request("/appointments", { method: "POST", body: appt }),
  updateAppointment: (id, changes) =>
    request(`/appointments/${id}`, { method: "PATCH", body: changes }),

  // Prescriptions & medical records
  listPrescriptions: (query) => request("/prescriptions", { query }),
  createPrescription: (rx) =>
    request("/prescriptions", { method: "POST", body: rx }),
  updatePrescription: (id, changes) =>
    request(`/prescriptions/${id}`, { method: "PATCH", body: changes }),
  listMedicalRecords: (query) => request("/medical-records", { query }),
  createMedicalRecord: (record) =>
    request("/medical-records", { method: "POST", body: record }),
  updateMedicalRecord: (id, changes) =>
    request(`/medical-records/${id}`, { method: "PATCH", body: changes }),

  // Notifications
  listNotifications: (query) => request("/notifications", { query }),
  markNotificationRead: (id) =>
    request(`/notifications/${id}/read`, { method: "PATCH" }),
  markAllNotificationsRead: () =>
    request("/notifications/read-all", { method: "POST" }),

  // Admin
  getAdminStats: () => request("/admin/stats"),
};
