import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState("");

  const recentLabResults = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      testType: "Blood Work",
      date: "2025-02-15",
      status: "Complete",
      result: "Abnormal",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      testType: "ECG",
      date: "2025-02-14",
      status: "Pending",
      result: "Processing",
    },
    {
      id: 3,
      patientName: "Emily Brown",
      testType: "X-Ray",
      date: "2025-02-10",
      status: "Complete",
      result: "Normal",
    },
    {
      id: 4,
      patientName: "James Wilson",
      testType: "MRI",
      date: "2025-02-09",
      status: "Complete",
      result: "Normal",
    },
    {
      id: 5,
      patientName: "Linda Martinez",
      testType: "CT Scan",
      date: "2025-02-08",
      status: "Complete",
      result: "Abnormal",
    },
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <Sidebar activePage="Reports" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onSearch={handleSearch}
          notificationCount={3}
          userImage="/default-avatar.png"
          userName="Dr. Connor"
        />

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                Medical Reports Overview
              </h1>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-[#2c4ecf] text-white rounded-lg font-poppins hover:bg-[#1a3baf] transition-colors duration-200">
                  <i className="fas fa-file-export mr-2"></i>Export Reports
                </button>
                <button className="px-4 py-2 bg-[#2c4ecf] text-white rounded-lg font-poppins hover:bg-[#1a3baf] transition-colors duration-200">
                  <i className="fas fa-print mr-2"></i>Print
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e1e8ff]">
                <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                  Patient Demographics
                </h3>
                <canvas
                  id="demographicsChart"
                  className="w-full h-[200px]"
                ></canvas>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e1e8ff]">
                <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                  Treatment Types
                </h3>
                <canvas
                  id="treatmentChart"
                  className="w-full h-[200px]"
                ></canvas>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e1e8ff]">
                <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                  Monthly Visits
                </h3>
                <canvas id="visitsChart" className="w-full h-[200px]"></canvas>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e1e8ff]">
                <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                  Common Diagnoses
                </h3>
                <canvas
                  id="diagnosesChart"
                  className="w-full h-[200px]"
                ></canvas>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
              <div className="p-6 border-b border-[#e1e8ff]">
                <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf]">
                  Recent Lab Results
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f8faff]">
                    <tr>
                      <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                        Patient Name
                      </th>
                      <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                        Test Type
                      </th>
                      <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                        Result
                      </th>
                      <th className="px-6 py-4 text-left font-poppins text-sm text-[#4a5568]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLabResults.map((result) => (
                      <tr key={result.id} className="border-t border-[#e1e8ff]">
                        <td className="px-6 py-4 font-poppins text-[#4a5568]">
                          {result.patientName}
                        </td>
                        <td className="px-6 py-4 font-poppins text-[#4a5568]">
                          {result.testType}
                        </td>
                        <td className="px-6 py-4 font-poppins text-[#4a5568]">
                          {result.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-poppins ${
                              result.status === "Complete"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {result.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-poppins ${
                              result.result === "Normal"
                                ? "bg-green-100 text-green-800"
                                : result.result === "Abnormal"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {result.result}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-[#2c4ecf] hover:text-[#1a3baf] mr-4">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="text-[#2c4ecf] hover:text-[#1a3baf]">
                            <i className="fas fa-download"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecords;
