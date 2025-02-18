import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header/Header";
import StatisticsCards from "../Components/MedicalRecords/StatisticsCards";
import LabResultsTable from "../Components/MedicalRecords/LabResultsTable";
import ActionButtons from "../Components/MedicalRecords/ActionButtons";
import { MockData } from "../data/MockData";

function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const { recentLabResults } = MockData;

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
              <ActionButtons />
            </div>

            <StatisticsCards />
            <LabResultsTable recentLabResults={recentLabResults} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecords;
