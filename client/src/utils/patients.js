import defaultAvatar from "../assets/default-avatar.svg";
import { ageFromDob, capitalize } from "./format";

// API patient -> props for PatientCard / AssignedPatientsSection.
export const toPatientCard = (p) => ({
  patientId: p.id,
  id: p.id,
  name: p.name,
  image: defaultAvatar,
  age: ageFromDob(p.dateOfBirth) ?? undefined,
  room: p.room ?? "—",
  status: p.priority === "critical" ? "Critical" : "Active",
  priority: capitalize(p.priority),
});
