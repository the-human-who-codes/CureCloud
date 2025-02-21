"use client";
import { useState } from "react";

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

function PatientRecords() {
  //   const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState("list");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const mockPatients = [
    {
      id: "P1001",
      name: "Sarah Johnson",
      age: 45,
      gender: "Female",
      bloodType: "A+",
      lastVisit: "2024-02-15",
      nextAppointment: "2024-03-01",
      status: "Active",
      condition: "Stable",
      phone: "(555) 123-4567",
      email: "sarah.j@email.com",
      address: "123 Medical Drive, Healthcare City",
      insurance: "BlueCross Health",
      doctor: "Dr. Michael Chen",
      recentDiagnosis: "Hypertension",
      vitals: {
        bloodPressure: "120/80",
        heartRate: "72 bpm",
        temperature: "98.6°F",
        oxygenLevel: "98%",
      },
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Daily" },
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      ],
      allergies: ["Penicillin", "Latex"],
      recentTests: [
        { name: "Blood Work", date: "2024-02-10", status: "Completed" },
        { name: "ECG", date: "2024-02-10", status: "Pending" },
      ],
      notes: [
        {
          date: "2024-02-15",
          doctor: "Dr. Chen",
          content:
            "Patient reports improved sleep patterns. Maintaining current medication schedule.",
        },
      ],
    },
    {
      id: "P1002",
      name: "James Wilson",
      age: 62,
      gender: "Male",
      bloodType: "O-",
      lastVisit: "2024-02-14",
      nextAppointment: "2024-02-28",
      status: "Critical",
      condition: "Under Observation",
      phone: "(555) 234-5678",
      email: "j.wilson@email.com",
      address: "456 Health Avenue, Medical District",
      insurance: "Medicare Plus",
      doctor: "Dr. Sarah Connor",
      recentDiagnosis: "Coronary Artery Disease",
      vitals: {
        bloodPressure: "140/90",
        heartRate: "85 bpm",
        temperature: "99.1°F",
        oxygenLevel: "95%",
      },
      medications: [
        { name: "Aspirin", dosage: "81mg", frequency: "Daily" },
        { name: "Atorvastatin", dosage: "40mg", frequency: "Daily" },
      ],
      allergies: ["Sulfa drugs"],
      recentTests: [
        { name: "Stress Test", date: "2024-02-13", status: "Completed" },
        { name: "Cardiac MRI", date: "2024-02-20", status: "Scheduled" },
      ],
      notes: [
        {
          date: "2024-02-14",
          doctor: "Dr. Connor",
          content:
            "Patient experiencing occasional chest pain. Scheduled for further cardiac evaluation.",
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <></>

      <div className="flex-1 flex flex-col overflow-hidden">
        <></>

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

            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e1e8ff] mb-6">
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

            {selectedView === "list" && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
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
                    {mockPatients.map((patient) => (
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
                              onClick={() => setSelectedPatient(patient)}
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
                {mockPatients.map((patient) => (
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
                        onClick={() => setSelectedPatient(patient)}
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
