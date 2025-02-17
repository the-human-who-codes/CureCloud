import { useState } from "react";
import Header from "../Components/Header/Header";

import Sidebar from "../Components/Sidebar";
import PatientCard from "../Components/PatientCard/PatientCard";
import { MockData } from "../data/MockData";

function PatientRecords() {
  const { patients } = MockData();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const patientsPerPage = 6;

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <Sidebar activePage="Patient Records" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSearch={handleSearch} />

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                  Patient Records
                </h1>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-white border border-[#e1e8ff] rounded-lg focus:outline-none focus:border-[#2c4ecf] font-poppins text-[#4a5568]"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <button className="px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins hover:bg-[#1a3baf] transition-colors duration-200">
                <i className="fas fa-user-plus mr-2"></i>
                Add New Patient
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patientImage={patient.image}
                  patientName={patient.name}
                  patientId={patient.id}
                  age={patient.age}
                  gender={patient.gender}
                  lastVisit={patient.lastVisit}
                  status={patient.status}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-[#e1e8ff] rounded-lg font-poppins text-[#4a5568] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f8faff]"
                >
                  <i className="fas fa-chevron-left mr-2"></i>
                  Previous
                </button>

                <span className="font-poppins text-[#4a5568]">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-[#e1e8ff] rounded-lg font-poppins text-[#4a5568] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f8faff]"
                >
                  Next
                  <i className="fas fa-chevron-right ml-2"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientRecords;
