import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUsers,
  faUserCheck,
  faUserClock,
  faUserTimes,
  faEdit,
  faEye,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { PageHeader, PageShell } from "../common/PageShell";
import TableHead from "../common/TableHead";
import StatusBadge from "../common/StatusBadge";
import { FormField } from "../common/FormField";
import { StatGrid } from "../common/StatCard";
import { Button, IconButton } from "../common/Button";
import { Card } from "../common/Card";

const STAT_ICONS = {
  totalUsers: faUsers,
  activeUsers: faUserCheck,
  pendingApprovals: faUserClock,
  inactiveUsers: faUserTimes,
};

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
    <PageShell>
      <PageHeader
        title="User Management"
        subtitle="Manage and monitor system users"
        actions={<Button icon={faUserPlus}>Add New User</Button>}
      />

      <StatGrid stats={stats} icons={STAT_ICONS} />

      <Card className="mb-8">
        <div className="flex flex-wrap gap-4">
          <FormField
            as="select"
            label="Role"
            wrapperClassName="flex-1 min-w-[200px]"
            inputClassName="w-full px-4 py-2 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="doctor">Doctors</option>
            <option value="nurse">Nurses</option>
            <option value="admin">Administrators</option>
          </FormField>
          <FormField
            as="select"
            label="Status"
            wrapperClassName="flex-1 min-w-[200px]"
            inputClassName="w-full px-4 py-2 rounded-lg border border-line focus:border-primary focus:ring-1 focus:ring-primary font-poppins"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </FormField>
        </div>
      </Card>

      <Card padded={false}>
        <table className="w-full">
          <TableHead
            columns={[
              "User",
              "Role",
              "Department",
              "Status",
              "Last Active",
              "Actions",
            ]}
          />
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-t border-line">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-poppins text-primary font-semibold">
                        {user.name}
                      </p>
                      <p className="font-poppins text-sm text-ink">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge tone="brand" status={user.role} />
                </td>
                <td className="px-6 py-4 font-poppins text-ink">
                  {user.department}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-6 py-4 font-poppins text-ink">
                  {new Date(user.lastActive).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <IconButton icon={faEdit} title="Edit" />
                    <IconButton icon={faEye} title="View Details" />
                    <button
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      title="Deactivate"
                    >
                      <FontAwesomeIcon icon={faBan} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </PageShell>
  );
}

export default UserManagement;
