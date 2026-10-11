import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faArrowRight,
  faPlusCircle,
  faFileMedical,
  faThermometerHalf,
  faHeart,
  faHeartbeat,
  faLungs,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../../api/client";
import { useAuth } from "../../auth/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { capitalize } from "../../utils/format";
import AsyncContent from "../common/AsyncContent";
import defaultAvatar from "../../assets/default-avatar.svg";

function MedicalRecords() {
  const [activeTab, setActiveTab] = useState("summary");

  const { patient } = useAuth();
  const vitals = patient?.vitals ?? {};
  const unit = (v, u) => (v == null ? "—" : `${v}${u}`);
  const prescriptions = useApi(() =>
    api.listPrescriptions({ status: "active" })
  );
  const appointments = useApi(() =>
    api.listAppointments({ upcoming: "true", limit: 5 })
  );
  const records = useApi(() => api.listMedicalRecords({ limit: 5 }));

  const renderVitalCard = (title, value, icon, trend = "stable") => (
    <div className="bg-white rounded-xl p-4 border border-line">
      <div className="flex items-center justify-between mb-2">
        <span className="font-poppins text-sm text-ink">{title}</span>
        <FontAwesomeIcon icon={icon} className={`fas text-primary`} />
      </div>
      <div className="font-poppins text-xl font-bold text-primary">{value}</div>
      <div className="flex items-center mt-2">
        <FontAwesomeIcon
          icon={
            trend === "up"
              ? faArrowUp
              : trend === "down"
              ? faArrowDown
              : faArrowRight
          }
          className={`${
            trend === "up"
              ? "text-green-500"
              : trend === "down"
              ? "text-red-500"
              : "text-gray-400"
          } text-xs mr-1`}
        />{" "}
        <span className="text-xs text-ink">From last check</span>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-surface">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-line mb-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <img
                      src={defaultAvatar}
                      alt={patient?.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-line"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h1 className="font-poppins text-2xl font-bold text-primary">
                            {patient?.name}
                          </h1>
                          <p className="font-poppins text-ink">
                            ID: {patient?.id} • DOB:{" "}
                            {patient?.dateOfBirth ?? "—"}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 bg-primary text-white rounded-lg font-poppins text-sm hover:bg-primary-hover transition-colors duration-200">
                            <FontAwesomeIcon
                              icon={faPlusCircle}
                              className="fas mr-2"
                            />
                            Add Note
                          </button>
                          <button className="px-4 py-2 bg-surface text-primary rounded-lg font-poppins text-sm hover:bg-line transition-colors duration-200">
                            <FontAwesomeIcon
                              icon={faFileMedical}
                              className="fas mr-2"
                            />
                            Order Lab
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {renderVitalCard(
                          "Temperature",
                          unit(vitals.temperature, "°C"),
                          faThermometerHalf
                        )}
                        {renderVitalCard(
                          "Blood Pressure",
                          vitals.bloodPressure ?? "—",
                          faHeart
                        )}
                        {renderVitalCard(
                          "Heart Rate",
                          unit(vitals.heartRate, " bpm"),
                          faHeartbeat
                        )}
                        {renderVitalCard(
                          "O2 Saturation",
                          unit(vitals.oxygenSaturation, "%"),
                          faLungs
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
                  <div className="border-b border-line">
                    <div className="flex overflow-x-auto">
                      {[
                        "summary",
                        "history",
                        "medications",
                        "labs",
                        "visits",
                      ].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-6 py-4 font-poppins text-sm whitespace-nowrap ${
                            activeTab === tab
                              ? "border-b-2 border-primary text-primary font-semibold"
                              : "text-ink hover:text-primary"
                          }`}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    {activeTab === "summary" && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-poppins text-lg font-semibold text-primary mb-4">
                            Active Medications
                          </h3>
                          <div className="space-y-3">
                            <AsyncContent
                              {...prescriptions}
                              empty={
                                prescriptions.data?.prescriptions.length === 0
                              }
                              emptyText="No active medications."
                            >
                              {prescriptions.data?.prescriptions.map((med) => (
                                <div
                                  key={med.id}
                                  className="p-4 bg-surface rounded-lg"
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-poppins font-semibold text-primary">
                                        {med.medication}
                                      </h4>
                                      <p className="font-poppins text-sm text-ink">
                                        {med.dosage} • {med.frequency}
                                      </p>
                                    </div>
                                    <span className="text-sm text-ink">
                                      Started {med.startDate}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </AsyncContent>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-poppins text-lg font-semibold text-primary mb-4">
                            Upcoming Appointments
                          </h3>
                          <div className="space-y-3">
                            <AsyncContent
                              {...appointments}
                              empty={
                                appointments.data?.appointments.length === 0
                              }
                              emptyText="No upcoming appointments."
                            >
                              {appointments.data?.appointments.map((visit) => (
                                <div
                                  key={visit.id}
                                  className="p-4 bg-surface rounded-lg"
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-poppins font-semibold text-primary">
                                        {visit.type}
                                      </h4>
                                      <p className="font-poppins text-sm text-ink">
                                        {visit.doctorName} •{" "}
                                        {capitalize(visit.status)}
                                      </p>
                                    </div>
                                    <span className="text-sm text-ink">
                                      {visit.date} {visit.time}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </AsyncContent>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-line mb-6">
                  <h3 className="font-poppins text-lg font-semibold text-primary mb-4">
                    Quick Info
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-poppins text-sm text-ink">
                        Date of Birth
                      </p>
                      <p className="font-poppins font-semibold text-primary">
                        {patient?.dateOfBirth ?? "—"}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-ink">Condition</p>
                      <p className="font-poppins font-semibold text-primary">
                        {capitalize(patient?.priority) || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-ink">
                        Vitals Last Recorded
                      </p>
                      <p className="font-poppins font-semibold text-primary">
                        {vitals.recordedAt
                          ? new Date(vitals.recordedAt).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-line">
                  <h3 className="font-poppins text-lg font-semibold text-primary mb-4">
                    Recent Documents
                  </h3>
                  <div className="space-y-3">
                    <AsyncContent
                      {...records}
                      empty={records.data?.medicalRecords.length === 0}
                      emptyText="No records yet."
                    >
                      {records.data?.medicalRecords.map((doc) => (
                        <div key={doc.id} className="p-3 bg-surface rounded-lg">
                          <div className="flex items-center gap-3">
                            <FontAwesomeIcon
                              icon={faFileMedical}
                              className="fas text-primary"
                            />
                            <div>
                              <p className="font-poppins text-sm font-semibold text-primary">
                                {doc.type}
                              </p>
                              <p className="font-poppins text-xs text-ink">
                                {doc.createdAt?.slice(0, 10)} • {doc.doctorName}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </AsyncContent>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecords;
