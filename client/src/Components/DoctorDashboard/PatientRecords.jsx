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
    <div className="flex h-screen bg-[#f8faff]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                  Patient Records
                </h1>
                <p className="font-poppins text-[#4a5568]">
                  Manage and view detailed patient information
                </p>
              </div>
              <button className="px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins font-semibold hover:bg-[#2341b0] transition-colors duration-200 flex items-center gap-2">
                <FontAwesomeIcon className="fas" icon={faPlus} />
                Add New Patient
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e1e8ff] mb-6 overflow-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-[#f8faff] rounded-lg p-2">
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        selectedView === "list"
                          ? "bg-[#2c4ecf] text-white"
                          : "text-[#4a5568] hover:bg-[#e1e8ff]"
                      }`}
                      onClick={() => setSelectedView("list")}
                    >
                      <FontAwesomeIcon className="fas fa-list" icon={faList} />
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg ${
                        selectedView === "grid"
                          ? "bg-[#2c4ecf] text-white"
                          : "text-[#4a5568] hover:bg-[#e1e8ff]"
                      }`}
                      onClick={() => setSelectedView("grid")}
                    >
                      <FontAwesomeIcon icon={faThLarge} />
                    </button>
                  </div>
                  <select
                    className="px-4 py-2 bg-[#f8faff] rounded-lg border border-[#e1e8ff] focus:ring-2 focus:ring-[#2c4ecf] focus:border-transparent"
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
                  <button className="px-4 py-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
                    <FontAwesomeIcon icon={faFilter} />
                    More Filters
                  </button>
                  <button className="px-4 py-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
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
                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-auto">
                  <table className="w-full">
                    <thead className="bg-[#f8faff]">
                      <tr>
                        <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                          Patient
                        </th>
                        <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                          ID
                        </th>
                        <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                          Status
                        </th>
                        <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                          Last Visit
                        </th>
                        <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                          Next Appointment
                        </th>
                        <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr
                          key={patient.id}
                          className="border-t border-[#e1e8ff] hover:bg-[#f8faff]"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#e1e8ff] flex items-center justify-center">
                                <span className="font-poppins font-medium text-[#2c4ecf]">
                                  {patient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <p className="font-poppins font-medium text-[#2c4ecf]">
                                  {patient.name}
                                </p>
                                <p className="font-poppins text-sm text-[#4a5568]">
                                  {patient.age} yrs • {patient.gender}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-poppins text-[#4a5568]">
                            {patient.id}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-poppins ${
                                patient.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : patient.status === "Critical"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {patient.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-poppins text-[#4a5568]">
                            {patient.lastVisit}
                          </td>
                          <td className="px-6 py-4 font-poppins text-[#4a5568]">
                            {patient.nextAppointment}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                className="p-2 text-[#2c4ecf] hover:bg-[#e1e8ff] rounded-lg"
                                onClick={() => selectPatient(patient)}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </button>
                              <button className="p-2 text-[#2c4ecf] hover:bg-[#e1e8ff] rounded-lg">
                                <FontAwesomeIcon icon={faEdit} />
                              </button>
                              <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedView === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-[#e1e8ff] flex items-center justify-center">
                          <span className="font-poppins text-xl font-medium text-[#2c4ecf]">
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-poppins font-medium text-[#2c4ecf]">
                            {patient.name}
                          </h3>
                          <p className="font-poppins text-sm text-[#4a5568]">
                            {patient.id}
                          </p>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-poppins ${
                              patient.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : patient.status === "Critical"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {patient.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="font-poppins text-sm text-[#4a5568]">
                            Age
                          </span>
                          <span className="font-poppins text-sm font-medium">
                            {patient.age} years
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-poppins text-sm text-[#4a5568]">
                            Blood Type
                          </span>
                          <span className="font-poppins text-sm font-medium">
                            {patient.bloodType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-poppins text-sm text-[#4a5568]">
                            Last Visit
                          </span>
                          <span className="font-poppins text-sm font-medium">
                            {patient.lastVisit}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-[#e1e8ff]">
                        <button
                          className="px-4 py-2 text-[#2c4ecf] hover:bg-[#f8faff] rounded-lg"
                          onClick={() => selectPatient(patient)}
                        >
                          View Details
                        </button>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-[#2c4ecf] hover:bg-[#e1e8ff] rounded-lg">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AsyncContent>

            {selectedPatient && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
                  <div className="p-6 border-b border-[#e1e8ff]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#e1e8ff] flex items-center justify-center">
                          <span className="font-poppins text-xl font-medium text-[#2c4ecf]">
                            {selectedPatient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h2 className="font-poppins text-xl font-bold text-[#2c4ecf]">
                            {selectedPatient.name}
                          </h2>
                          <p className="font-poppins text-[#4a5568]">
                            {selectedPatient.id} • {selectedPatient.age} years •{" "}
                            {selectedPatient.gender}
                          </p>
                        </div>
                      </div>
                      <button
                        className="p-2 hover:bg-[#f8faff] rounded-lg"
                        onClick={() => setSelectedPatient(null)}
                      >
                        <FontAwesomeIcon
                          className="text-[#4a5568]"
                          icon={faTimes}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#f8faff] rounded-xl p-6">
                        <h3 className="font-poppins font-semibold text-[#2c4ecf] mb-4">
                          Current Vitals
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(selectedPatient.vitals).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="bg-white rounded-lg p-4"
                              >
                                <p className="font-poppins text-sm text-[#4a5568]">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </p>
                                <p className="font-poppins font-medium text-[#2c4ecf]">
                                  {value}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div className="bg-[#f8faff] rounded-xl p-6">
                        <h3 className="font-poppins font-semibold text-[#2c4ecf] mb-4">
                          Contact Information
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <p className="font-poppins text-sm text-[#4a5568]">
                              Phone
                            </p>
                            <p className="font-poppins text-[#2c4ecf]">
                              {selectedPatient.phone}
                            </p>
                          </div>
                          <div>
                            <p className="font-poppins text-sm text-[#4a5568]">
                              Email
                            </p>
                            <p className="font-poppins text-[#2c4ecf]">
                              {selectedPatient.email}
                            </p>
                          </div>
                          <div>
                            <p className="font-poppins text-sm text-[#4a5568]">
                              Address
                            </p>
                            <p className="font-poppins text-[#2c4ecf]">
                              {selectedPatient.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#f8faff] rounded-xl p-6">
                        <h3 className="font-poppins font-semibold text-[#2c4ecf] mb-4">
                          Current Medications
                        </h3>
                        <div className="space-y-4">
                          {selectedPatient.medications.map((med, index) => (
                            <div
                              key={index}
                              className="bg-white rounded-lg p-4"
                            >
                              <p className="font-poppins font-medium text-[#2c4ecf]">
                                {med.name}
                              </p>
                              <p className="font-poppins text-sm text-[#4a5568]">
                                {med.dosage} • {med.frequency}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#f8faff] rounded-xl p-6">
                        <h3 className="font-poppins font-semibold text-[#2c4ecf] mb-4">
                          Recent Tests
                        </h3>
                        <div className="space-y-4">
                          {selectedPatient.recentTests.map((test, index) => (
                            <div
                              key={index}
                              className="bg-white rounded-lg p-4 flex items-center justify-between"
                            >
                              <div>
                                <p className="font-poppins font-medium text-[#2c4ecf]">
                                  {test.name}
                                </p>
                                <p className="font-poppins text-sm text-[#4a5568]">
                                  {test.date}
                                </p>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-poppins ${
                                  test.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : test.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {test.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-2 bg-[#f8faff] rounded-xl p-6">
                        <h3 className="font-poppins font-semibold text-[#2c4ecf] mb-4">
                          Medical Notes
                        </h3>
                        <div className="space-y-4">
                          {selectedPatient.notes.map((note, index) => (
                            <div
                              key={index}
                              className="bg-white rounded-lg p-4"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <p className="font-poppins font-medium text-[#2c4ecf]">
                                  {note.doctor}
                                </p>
                                <p className="font-poppins text-sm text-[#4a5568]">
                                  {note.date}
                                </p>
                              </div>
                              <p className="font-poppins text-[#4a5568]">
                                {note.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-[#e1e8ff] bg-[#f8faff]">
                    <div className="flex items-center justify-end gap-4">
                      <button
                        className="px-6 py-3 border border-[#2c4ecf] text-[#2c4ecf] rounded-lg font-poppins font-semibold hover:bg-[#e1e8ff]"
                        onClick={() => setSelectedPatient(null)}
                      >
                        Close
                      </button>
                      <button className="px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins font-semibold hover:bg-[#2341b0]">
                        Edit Patient
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientRecords;
