"use client";
import { useState } from "react";

function DepartmentSettings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const mockDepartments = [
    {
      id: "DEP001",
      name: "Emergency Department",
      head: "Dr. Sarah Wilson",
      staffCount: 45,
      roomCount: 15,
      status: "active",
      occupancyRate: "75%",
      budget: "$500,000",
      equipmentCount: 128,
      stats: {
        patientsToday: 89,
        availableDoctors: 8,
        availableNurses: 12,
        availableBeds: 6,
      },
    },
    {
      id: "DEP002",
      name: "Cardiology",
      head: "Dr. James Brown",
      staffCount: 32,
      roomCount: 20,
      status: "active",
      occupancyRate: "60%",
      budget: "$750,000",
      equipmentCount: 95,
      stats: {
        patientsToday: 45,
        availableDoctors: 6,
        availableNurses: 8,
        availableBeds: 12,
      },
    },
    {
      id: "DEP003",
      name: "Pediatrics",
      head: "Dr. Emily Chen",
      staffCount: 28,
      roomCount: 25,
      status: "active",
      occupancyRate: "45%",
      budget: "$400,000",
      equipmentCount: 76,
      stats: {
        patientsToday: 56,
        availableDoctors: 5,
        availableNurses: 10,
        availableBeds: 15,
      },
    },
    {
      id: "DEP004",
      name: "Surgery",
      head: "Dr. Michael Roberts",
      staffCount: 50,
      roomCount: 10,
      status: "active",
      occupancyRate: "90%",
      budget: "$1,000,000",
      equipmentCount: 200,
      stats: {
        patientsToday: 25,
        availableDoctors: 10,
        availableNurses: 15,
        availableBeds: 2,
      },
    },
  ];

  const overallStats = {
    totalDepartments: 12,
    totalStaff: 486,
    averageOccupancy: "68%",
    totalBudget: "$4.5M",
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <></>

      <div className="flex-1 flex flex-col overflow-hidden">
        <></>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                  Department Settings
                </h1>
                <p className="font-poppins text-[#4a5568]">
                  Manage hospital departments and their resources
                </p>
              </div>
              <button className="px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins font-semibold hover:bg-[#2341b0] transition-colors duration-200 flex items-center">
                <i className="fas fa-plus mr-2"></i>
                Add New Department
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(overallStats).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-poppins text-[#4a5568] text-sm">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="font-poppins text-2xl font-bold text-[#2c4ecf]">
                        {value}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-[#f8faff] flex items-center justify-center">
                      <i
                        className={`fas ${
                          key === "totalDepartments"
                            ? "fa-hospital"
                            : key === "totalStaff"
                            ? "fa-users"
                            : key === "averageOccupancy"
                            ? "fa-bed"
                            : "fa-dollar-sign"
                        } text-[#2c4ecf] text-xl`}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {mockDepartments.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf]">
                        {dept.name}
                      </h3>
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Head: {dept.head}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg"
                        title="Edit"
                      >
                        <i className="fas fa-cog"></i>
                      </button>
                      <button
                        className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg"
                        title="View Details"
                        onClick={() => setSelectedDepartment(dept)}
                      >
                        <i className="fas fa-expand-alt"></i>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#f8faff] rounded-lg p-3">
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Staff
                      </p>
                      <p className="font-poppins text-lg font-semibold text-[#2c4ecf]">
                        {dept.staffCount}
                      </p>
                    </div>
                    <div className="bg-[#f8faff] rounded-lg p-3">
                      <p className="font-poppins text-sm text-[#4a5568]">
                        Rooms
                      </p>
                      <p className="font-poppins text-lg font-semibold text-[#2c4ecf]">
                        {dept.roomCount}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-poppins text-sm text-[#4a5568]">
                        Occupancy
                      </span>
                      <span className="font-poppins text-sm font-semibold text-[#2c4ecf]">
                        {dept.occupancyRate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-poppins text-sm text-[#4a5568]">
                        Budget
                      </span>
                      <span className="font-poppins text-sm font-semibold text-[#2c4ecf]">
                        {dept.budget}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-poppins text-sm text-[#4a5568]">
                        Equipment
                      </span>
                      <span className="font-poppins text-sm font-semibold text-[#2c4ecf]">
                        {dept.equipmentCount} units
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#e1e8ff]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-poppins text-sm text-[#4a5568]">
                          Today's Patients
                        </p>
                        <p className="font-poppins text-lg font-semibold text-[#2c4ecf]">
                          {dept.stats.patientsToday}
                        </p>
                      </div>
                      <div>
                        <p className="font-poppins text-sm text-[#4a5568]">
                          Available Beds
                        </p>
                        <p className="font-poppins text-lg font-semibold text-[#2c4ecf]">
                          {dept.stats.availableBeds}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
              <h3 className="font-poppins text-lg font-semibold text-[#2c4ecf] mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Assign Staff", icon: "fa-user-plus" },
                  { name: "Equipment Request", icon: "fa-tools" },
                  { name: "Budget Planning", icon: "fa-chart-pie" },
                  { name: "Generate Report", icon: "fa-file-alt" },
                ].map((action) => (
                  <button
                    key={action.name}
                    className="p-4 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200 flex flex-col items-center"
                  >
                    <i className={`fas ${action.icon} mb-2 text-xl`}></i>
                    <span className="text-sm text-center">{action.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentSettings;
