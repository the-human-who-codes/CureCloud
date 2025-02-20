"use client";
import { useState } from "react";

function MedicalRecords() {
  const [activeTab, setActiveTab] = useState("summary");
  //   const [searchTerm, setSearchTerm] = useState("");

  const mockData = {
    patientInfo: {
      id: "P12345",
      name: "John Smith",
      photo: "https://placehold.co/100",
      dateOfBirth: "1985-06-15",
      gender: "Male",
      bloodType: "A+",
      height: "5'10\"",
      weight: "75kg",
      primaryPhysician: "Dr. Sarah Johnson",
      insuranceProvider: "BlueCross",
      emergencyContact: {
        name: "Mary Smith",
        relation: "Spouse",
        phone: "(555) 123-4567",
      },
      allergies: ["Penicillin", "Peanuts"],
      chronicConditions: ["Hypertension", "Type 2 Diabetes"],
    },
    vitalHistory: {
      latest: {
        temperature: "98.6°F",
        bloodPressure: "120/80",
        heartRate: "72 bpm",
        respiratoryRate: "16/min",
        oxygenSaturation: "98%",
        recordedAt: "2024-01-20T08:30:00Z",
      },
      trend: [
        {
          date: "2024-01-20",
          temperature: 98.6,
          bloodPressure: { systolic: 120, diastolic: 80 },
          heartRate: 72,
          respiratoryRate: 16,
          oxygenSaturation: 98,
        },
      ],
    },
    medications: {
      current: [
        {
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Daily",
          startDate: "2023-10-15",
          prescribedBy: "Dr. Johnson",
          notes: "Take in the morning",
        },
      ],
      past: [],
    },
    labResults: {
      recent: [
        {
          type: "Complete Blood Count",
          date: "2024-01-15",
          status: "Normal",
          orderedBy: "Dr. Johnson",
          results: {
            wbc: "7.5",
            rbc: "4.8",
            hemoglobin: "14.2",
            hematocrit: "42",
          },
          notes: "All values within normal range",
        },
      ],
    },
    visits: {
      upcoming: [
        {
          date: "2024-01-25",
          type: "Follow-up",
          provider: "Dr. Johnson",
          department: "Cardiology",
          notes: "Blood pressure check",
        },
      ],
      past: [
        {
          date: "2024-01-10",
          type: "Regular Checkup",
          provider: "Dr. Johnson",
          department: "Primary Care",
          diagnosis: "Hypertension - Controlled",
          treatment: "Continued current medication",
          notes: "Patient reporting good medication compliance",
        },
      ],
    },
    documents: {
      recent: [
        {
          type: "Discharge Summary",
          date: "2023-12-20",
          provider: "Memorial Hospital",
          department: "Cardiology",
          status: "Final",
        },
      ],
    },
  };

  const renderVitalCard = (title, value, icon, trend = "stable") => (
    <div className="bg-white rounded-xl p-4 border border-[#e1e8ff]">
      <div className="flex items-center justify-between mb-2">
        <span className="font-poppins text-sm text-[#4a5568]">{title}</span>
        <i className={`fas fa-${icon} text-[#2c4ecf]`}></i>
      </div>
      <div className="font-poppins text-xl font-bold text-[#2c4ecf]">
        {value}
      </div>
      <div className="flex items-center mt-2">
        <i
          className={`fas fa-arrow-${
            trend === "up"
              ? "up text-green-500"
              : trend === "down"
              ? "down text-red-500"
              : "right text-gray-400"
          } text-xs mr-1`}
        ></i>
        <span className="text-xs text-[#4a5568]">From last check</span>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff] mb-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <img
                      src={mockData.patientInfo.photo}
                      alt={mockData.patientInfo.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#e1e8ff]"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                            {mockData.patientInfo.name}
                          </h1>
                          <p className="font-poppins text-[#4a5568]">
                            ID: {mockData.patientInfo.id} • DOB:{" "}
                            {mockData.patientInfo.dateOfBirth} •{" "}
                            {mockData.patientInfo.gender}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 bg-[#2c4ecf] text-white rounded-lg font-poppins text-sm hover:bg-[#2341b0] transition-colors duration-200">
                            <i className="fas fa-plus-circle mr-2"></i>Add Note
                          </button>
                          <button className="px-4 py-2 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins text-sm hover:bg-[#e1e8ff] transition-colors duration-200">
                            <i className="fas fa-file-medical mr-2"></i>Order
                            Lab
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {renderVitalCard(
                          "Temperature",
                          mockData.vitalHistory.latest.temperature,
                          "thermometer-half"
                        )}
                        {renderVitalCard(
                          "Blood Pressure",
                          mockData.vitalHistory.latest.bloodPressure,
                          "heart",
                          "up"
                        )}
                        {renderVitalCard(
                          "Heart Rate",
                          mockData.vitalHistory.latest.heartRate,
                          "heartbeat"
                        )}
                        {renderVitalCard(
                          "O2 Saturation",
                          mockData.vitalHistory.latest.oxygenSaturation,
                          "lungs"
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
                  <div className="border-b border-[#e1e8ff]">
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
                              ? "border-b-2 border-[#2c4ecf] text-[#2c4ecf] font-semibold"
                              : "text-[#4a5568] hover:text-[#2c4ecf]"
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
                          <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                            Active Medications
                          </h3>
                          <div className="space-y-3">
                            {mockData.medications.current.map((med, index) => (
                              <div
                                key={index}
                                className="p-4 bg-[#f8faff] rounded-lg"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-poppins font-semibold text-[#2c4ecf]">
                                      {med.name}
                                    </h4>
                                    <p className="font-poppins text-sm text-[#4a5568]">
                                      {med.dosage} • {med.frequency}
                                    </p>
                                  </div>
                                  <span className="text-sm text-[#4a5568]">
                                    Started {med.startDate}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                            Upcoming Appointments
                          </h3>
                          <div className="space-y-3">
                            {mockData.visits.upcoming.map((visit, index) => (
                              <div
                                key={index}
                                className="p-4 bg-[#f8faff] rounded-lg"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-poppins font-semibold text-[#2c4ecf]">
                                      {visit.type}
                                    </h4>
                                    <p className="font-poppins text-sm text-[#4a5568]">
                                      {visit.provider} • {visit.department}
                                    </p>
                                  </div>
                                  <span className="text-sm text-[#4a5568]">
                                    {visit.date}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff] mb-6">
                  <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                    Quick Info
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Blood Type
                      </p>
                      <p className="font-poppins font-semibold text-[#2c4ecf]">
                        {mockData.patientInfo.bloodType}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Primary Physician
                      </p>
                      <p className="font-poppins font-semibold text-[#2c4ecf]">
                        {mockData.patientInfo.primaryPhysician}
                      </p>
                    </div>
                    <div>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Insurance
                      </p>
                      <p className="font-poppins font-semibold text-[#2c4ecf]">
                        {mockData.patientInfo.insuranceProvider}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
                  <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                    Recent Documents
                  </h3>
                  <div className="space-y-3">
                    {mockData.documents.recent.map((doc, index) => (
                      <div key={index} className="p-3 bg-[#f8faff] rounded-lg">
                        <div className="flex items-center gap-3">
                          <i className="fas fa-file-medical text-[#2c4ecf]"></i>
                          <div>
                            <p className="font-poppins text-sm font-semibold text-[#2c4ecf]">
                              {doc.type}
                            </p>
                            <p className="font-poppins text-xs text-[#4a5568]">
                              {doc.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
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
