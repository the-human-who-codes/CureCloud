import { useState } from "react";
import { api } from "../../api/client";
import { useApi } from "../../hooks/useApi";
import { ageFromDob, capitalize } from "../../utils/format";
import AsyncContent from "../common/AsyncContent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faList,
  faThLarge,
  faTrash,
  faFilter,
  faEdit,
  faDownload,
  faEye,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { PageHeader, PageShell } from "../common/PageShell";
import TableHead from "../common/TableHead";
import StatusBadge from "../common/StatusBadge";
import { Button, IconButton } from "../common/Button";
import InitialsAvatar from "../common/InitialsAvatar";
import { Card } from "../common/Card";

const formatVitals = (v = {}) =>
  Object.fromEntries(
    [
      ["bloodPressure", v.bloodPressure],
      ["heartRate", v.heartRate != null ? `${v.heartRate} bpm` : null],
      ["temperature", v.temperature != null ? `${v.temperature}°C` : null],
      [
        "oxygenLevel",
        v.oxygenSaturation != null ? `${v.oxygenSaturation}%` : null,
      ],
    ].filter(([, value]) => value != null)
  );

// API patient (+ the doctor's appointments) -> the row/detail shape this page renders.
function toRecordRow(p, appointments) {
  const mine = appointments.filter(
    (a) => a.patientId === p.id && a.status !== "cancelled"
  );
  const now = new Date().toISOString();
  const next = mine.find((a) => a.scheduledAt >= now);
  const last = mine.filter((a) => a.status === "completed").at(-1);
  return {
    id: p.id,
    name: p.name,
    age: ageFromDob(p.dateOfBirth) ?? "—",
    gender: "—",
    bloodType: "—",
    lastVisit: last?.date ?? "—",
    nextAppointment: next ? `${next.date} ${next.time}` : "—",
    status: p.priority === "critical" ? "Critical" : "Active",
    phone: "—",
    email: "—",
    address: p.room ? `Room ${p.room}` : "—",
    vitals: formatVitals(p.vitals ?? {}),
    medications: [],
    recentTests: [],
    notes: [],
  };
}

function PatientRecords() {
  const [selectedView, setSelectedView] = useState("list");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const { data, error, loading } = useApi(async () => {
    const [{ patients }, { appointments }] = await Promise.all([
      api.listPatients({ limit: 100 }),
      api.listAppointments({ limit: 100 }),
    ]);
    return patients.map((p) => toRecordRow(p, appointments));
  });
  const patients = (data ?? []).filter(
    (p) => filterStatus === "all" || p.status.toLowerCase() === filterStatus
  );

  // Loads the detail panel's medications, tests and notes for one patient.
  const selectPatient = async (patient) => {
    setSelectedPatient(patient);
    const [{ prescriptions }, { medicalRecords }] = await Promise.all([
      api.listPrescriptions({ patientId: patient.id, status: "active" }),
      api.listMedicalRecords({ patientId: patient.id }),
    ]);
    setSelectedPatient({
      ...patient,
      medications: prescriptions.map((rx) => ({
        name: rx.medication,
        dosage: rx.dosage,
        frequency: rx.frequency,
      })),
      recentTests: medicalRecords.map((r) => ({
        name: r.type,
        date: r.createdAt?.slice(0, 10),
        status: capitalize(r.status),
      })),
      notes: medicalRecords
        .filter((r) => r.diagnosis || r.recommendations)
        .map((r) => ({
          date: r.createdAt?.slice(0, 10),
          doctor: r.doctorName,
          content: [r.diagnosis, r.treatment, r.recommendations]
            .filter(Boolean)
            .join(". "),
        })),
    });
  };

  return (
    <PageShell>
      <PageHeader
        title="Patient Records"
        subtitle="Manage and view detailed patient information"
        actions={<Button icon={faPlus}>Add New Patient</Button>}
      />

      <div className="bg-white rounded-xl p-4 shadow-sm border border-line mb-6 overflow-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-surface rounded-lg p-2">
              <button
                className={`px-4 py-2 rounded-lg ${
                  selectedView === "list"
                    ? "bg-primary text-white"
                    : "text-ink hover:bg-line"
                }`}
                onClick={() => setSelectedView("list")}
              >
                <FontAwesomeIcon icon={faList} />
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  selectedView === "grid"
                    ? "bg-primary text-white"
                    : "text-ink hover:bg-line"
                }`}
                onClick={() => setSelectedView("grid")}
              >
                <FontAwesomeIcon icon={faThLarge} />
              </button>
            </div>
            <select
              className="px-4 py-2 bg-surface rounded-lg border border-line focus:ring-2 focus:ring-primary focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Patients</option>
              <option value="active">Active</option>
              <option value="critical">Critical</option>
              <option value="recovered">Recovered</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-ink hover:bg-surface rounded-lg">
              <FontAwesomeIcon icon={faFilter} />
              More Filters
            </button>
            <button className="px-4 py-2 text-ink hover:bg-surface rounded-lg">
              <FontAwesomeIcon icon={faDownload} />
              Export
            </button>
          </div>
        </div>
      </div>

      <AsyncContent
        loading={loading}
        error={error}
        empty={patients.length === 0}
        emptyText="No patients on your care team yet."
      >
        {selectedView === "list" && (
          <Card padded={false}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <TableHead
                  columns={[
                    "Patient",
                    "ID",
                    "Status",
                    "Last Visit",
                    "Next Appointment",
                    "Actions",
                  ]}
                />
                <tbody>
                  {patients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-t border-line hover:bg-surface"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={patient.name} />
                          <div>
                            <p className="font-poppins font-medium text-primary">
                              {patient.name}
                            </p>
                            <p className="font-poppins text-sm text-ink">
                              {patient.age} yrs • {patient.gender}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-poppins text-ink">
                        {patient.id}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={patient.status} />
                      </td>
                      <td className="px-6 py-4 font-poppins text-ink">
                        {patient.lastVisit}
                      </td>
                      <td className="px-6 py-4 font-poppins text-ink">
                        {patient.nextAppointment}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <IconButton
                            icon={faEye}
                            className="text-primary hover:bg-line"
                            onClick={() => selectPatient(patient)}
                          />
                          <IconButton
                            icon={faEdit}
                            className="text-primary hover:bg-line"
                          />
                          <IconButton
                            icon={faTrash}
                            className="text-red-500 hover:bg-red-50"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {selectedView === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {patients.map((patient) => (
              <Card key={patient.id}>
                <div className="flex items-center gap-4 mb-4">
                  <InitialsAvatar name={patient.name} large />
                  <div>
                    <h3 className="font-poppins font-medium text-primary">
                      {patient.name}
                    </h3>
                    <p className="font-poppins text-sm text-ink">
                      {patient.id}
                    </p>
                    <StatusBadge status={patient.status} />
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="font-poppins text-sm text-ink">Age</span>
                    <span className="font-poppins text-sm font-medium">
                      {patient.age} years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-poppins text-sm text-ink">
                      Blood Type
                    </span>
                    <span className="font-poppins text-sm font-medium">
                      {patient.bloodType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-poppins text-sm text-ink">
                      Last Visit
                    </span>
                    <span className="font-poppins text-sm font-medium">
                      {patient.lastVisit}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-line">
                  <button
                    className="px-4 py-2 text-primary hover:bg-surface rounded-lg"
                    onClick={() => selectPatient(patient)}
                  >
                    View Details
                  </button>
                  <div className="flex items-center gap-2">
                    <IconButton
                      icon={faEdit}
                      className="text-primary hover:bg-line"
                    />
                    <IconButton
                      icon={faTrash}
                      className="text-red-500 hover:bg-red-50"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </AsyncContent>

      {selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6 border-b border-line">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <InitialsAvatar name={selectedPatient.name} large />
                  <div>
                    <h2 className="font-poppins text-xl font-bold text-primary">
                      {selectedPatient.name}
                    </h2>
                    <p className="font-poppins text-ink">
                      {selectedPatient.id} • {selectedPatient.age} years •{" "}
                      {selectedPatient.gender}
                    </p>
                  </div>
                </div>
                <button
                  className="p-2 hover:bg-surface rounded-lg"
                  onClick={() => setSelectedPatient(null)}
                >
                  <FontAwesomeIcon className="text-ink" icon={faTimes} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl p-6">
                  <h3 className="font-poppins font-semibold text-primary mb-4">
                    Current Vitals
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedPatient.vitals).map(
                      ([key, value]) => (
                        <div key={key} className="bg-white rounded-lg p-4">
                          <p className="font-poppins text-sm text-ink">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p className="font-poppins font-medium text-primary">
                            {value}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="bg-surface rounded-xl p-6">
                  <h3 className="font-poppins font-semibold text-primary mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-poppins text-sm text-ink">Phone</p>
                      <p className="font-poppins text-primary">
                        {selectedPatient.phone}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-ink">Email</p>
                      <p className="font-poppins text-primary">
                        {selectedPatient.email}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-ink">Address</p>
                      <p className="font-poppins text-primary">
                        {selectedPatient.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-xl p-6">
                  <h3 className="font-poppins font-semibold text-primary mb-4">
                    Current Medications
                  </h3>
                  <div className="space-y-4">
                    {selectedPatient.medications.map((med, index) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <p className="font-poppins font-medium text-primary">
                          {med.name}
                        </p>
                        <p className="font-poppins text-sm text-ink">
                          {med.dosage} • {med.frequency}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-surface rounded-xl p-6">
                  <h3 className="font-poppins font-semibold text-primary mb-4">
                    Recent Tests
                  </h3>
                  <div className="space-y-4">
                    {selectedPatient.recentTests.map((test, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-4 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-poppins font-medium text-primary">
                            {test.name}
                          </p>
                          <p className="font-poppins text-sm text-ink">
                            {test.date}
                          </p>
                        </div>
                        <StatusBadge status={test.status} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 bg-surface rounded-xl p-6">
                  <h3 className="font-poppins font-semibold text-primary mb-4">
                    Medical Notes
                  </h3>
                  <div className="space-y-4">
                    {selectedPatient.notes.map((note, index) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-poppins font-medium text-primary">
                            {note.doctor}
                          </p>
                          <p className="font-poppins text-sm text-ink">
                            {note.date}
                          </p>
                        </div>
                        <p className="font-poppins text-ink">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-line bg-surface">
              <div className="flex items-center justify-end gap-4">
                <button
                  className="px-6 py-3 border border-primary text-primary rounded-lg font-poppins font-semibold hover:bg-line"
                  onClick={() => setSelectedPatient(null)}
                >
                  Close
                </button>
                <Button>Edit Patient</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}

export default PatientRecords;
