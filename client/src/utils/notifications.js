import {
  faBell,
  faCalendarAlt,
  faCog,
  faComments,
  faFileMedical,
  faPrescriptionBottle,
  faTasks,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ICONS = {
  appointment: faCalendarAlt,
  prescription: faPrescriptionBottle,
  "medical-record": faFileMedical,
  "care-task": faTasks,
  message: faComments,
  account: faUser,
  system: faCog,
};

export const iconForNotification = (type) => ICONS[type] ?? faBell;

// Page for a notification's (or alert's) ResourceRef, per role. null when there is no page.
export function pathForResource(resource, role) {
  if (!resource) return null;
  const { type, id } = resource;
  switch (type) {
    case "appointment":
      return role === "nurse" ? null : `/${role}/appointments`;
    case "prescription":
      return role === "patient" || role === "doctor"
        ? `/${role}/prescriptions`
        : role === "nurse"
        ? "/nurse/medications"
        : null;
    case "medical-record":
      return role === "patient"
        ? "/patient/medical-records"
        : role === "doctor"
        ? "/doctor/patient-records"
        : role === "nurse"
        ? "/nurse/my-patients"
        : null;
    case "care-task":
      return role === "nurse" ? "/nurse/tasks" : null;
    case "conversation":
      return role === "patient"
        ? `/patient/messages?c=${id}`
        : `/${role}/team-chat?c=${id}`;
    case "user":
      return role === "admin" ? `/admin/user-management?user=${id}` : null;
    case "patient":
      return role === "doctor"
        ? `/doctor/patient-records?patient=${id}`
        : role === "nurse"
        ? "/nurse/my-patients"
        : role === "admin"
        ? "/admin/patients"
        : null;
    default:
      return null;
  }
}
