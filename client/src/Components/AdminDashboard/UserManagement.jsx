import { useState } from "react";

function UserManagement() {
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const mockUsers = [
    {
      id: "USR001",
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@hospital.com",
      role: "doctor",
      department: "Cardiology",
      status: "active",
      lastActive: "2024-02-20T10:30:00",
      nationalId: "ID78901234",
      image: "/default-avatar.png",
    },
    {
      id: "USR002",
      name: "Nurse John Davis",
      email: "john.davis@hospital.com",
      role: "nurse",
      department: "Emergency",
      status: "active",
      lastActive: "2024-02-20T09:15:00",
      nationalId: "ID78901235",
      image: "/default-avatar.png",
    },
    {
      id: "USR003",
      name: "Admin Mary Johnson",
      email: "mary.johnson@hospital.com",
      role: "admin",
      department: "Administration",
      status: "active",
      lastActive: "2024-02-19T16:45:00",
      nationalId: "ID78901236",
      image: "/default-avatar.png",
    },
    {
      id: "USR004",
      name: "Dr. James Brown",
      email: "james.brown@hospital.com",
      role: "doctor",
      department: "Pediatrics",
      status: "inactive",
      lastActive: "2024-02-18T14:20:00",
      nationalId: "ID78901237",
      image: "/default-avatar.png",
    },
    {
      id: "USR005",
      name: "Nurse Emma Davis",
      email: "emma.davis@hospital.com",
      role: "nurse",
      department: "ICU",
      status: "pending",
      lastActive: "2024-02-20T11:00:00",
      nationalId: "ID78901238",
      image: "/default-avatar.png",
    },
  ];

  const stats = {
    totalUsers: 156,
    activeUsers: 142,
    pendingApprovals: 8,
    inactiveUsers: 6,
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
                  User Management
                </h1>
                <p className="font-poppins text-[#4a5568]">
                  Manage and monitor system users
                </p>
              </div>
              <button className="px-6 py-3 bg-[#2c4ecf] text-white rounded-lg font-poppins font-semibold hover:bg-[#2341b0] transition-colors duration-200 flex items-center">
                <i className="fas fa-user-plus mr-2"></i>
                Add New User
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Object.entries(stats).map(([key, value]) => (
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
                          key === "totalUsers"
                            ? "fa-users"
                            : key === "activeUsers"
                            ? "fa-user-check"
                            : key === "pendingApprovals"
                            ? "fa-user-clock"
                            : "fa-user-times"
                        } text-[#2c4ecf] text-xl`}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff] mb-8">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block font-poppins text-sm text-[#4a5568] mb-2">
                    Role
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-[#e1e8ff] focus:border-[#2c4ecf] focus:ring-1 focus:ring-[#2c4ecf] font-poppins"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="doctor">Doctors</option>
                    <option value="nurse">Nurses</option>
                    <option value="admin">Administrators</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block font-poppins text-sm text-[#4a5568] mb-2">
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-[#e1e8ff] focus:border-[#2c4ecf] focus:ring-1 focus:ring-[#2c4ecf] font-poppins"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#e1e8ff] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#f8faff]">
                  <tr>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      User
                    </th>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Role
                    </th>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Department
                    </th>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Status
                    </th>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Last Active
                    </th>
                    <th className="px-6 py-4 font-poppins text-sm text-[#4a5568] text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-t border-[#e1e8ff]">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className="font-poppins text-[#2c4ecf] font-semibold">
                              {user.name}
                            </p>
                            <p className="font-poppins text-sm text-[#4a5568]">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-poppins bg-[#f8faff] text-[#2c4ecf]">
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-poppins text-[#4a5568]">
                        {user.department}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-poppins ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : user.status === "inactive"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-poppins text-[#4a5568]">
                        {new Date(user.lastActive).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg"
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            title="Deactivate"
                          >
                            <i className="fas fa-ban"></i>
                          </button>
                        </div>
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
  );
}

export default UserManagement;
