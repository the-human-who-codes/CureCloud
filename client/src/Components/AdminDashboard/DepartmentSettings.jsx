import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHospital,
  faUsers,
  faBed,
  faDollarSign,
  faCog,
  faExpandAlt,
  faUserPlus,
  faChartPie,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { PageHeader, PageShell } from "../common/PageShell";
import { StatGrid } from "../common/StatCard";
import { Button, IconButton } from "../common/Button";
import { Card } from "../common/Card";

const STAT_ICONS = {
  totalDepartments: faHospital,
  totalStaff: faUsers,
  averageOccupancy: faBed,
  totalBudget: faDollarSign,
};

function DepartmentSettings() {
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
    <PageShell>
      <PageHeader
        title="Department Settings"
        subtitle="Manage hospital departments and their resources"
        actions={<Button icon={faPlus}>Add New Department</Button>}
      />

      <StatGrid stats={overallStats} icons={STAT_ICONS} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {mockDepartments.map((dept) => (
          <Card key={dept.id}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-poppins text-lg font-semibold text-primary">
                  {dept.name}
                </h3>
                <p className="font-poppins text-sm text-ink">
                  Head: {dept.head}
                </p>
              </div>
              <div className="flex gap-2">
                <IconButton icon={faCog} title="Edit" />
                <IconButton icon={faExpandAlt} title="View Details" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-surface rounded-lg p-3">
                <p className="font-poppins text-sm text-ink">Staff</p>
                <p className="font-poppins text-lg font-semibold text-primary">
                  {dept.staffCount}
                </p>
              </div>
              <div className="bg-surface rounded-lg p-3">
                <p className="font-poppins text-sm text-ink">Rooms</p>
                <p className="font-poppins text-lg font-semibold text-primary">
                  {dept.roomCount}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-poppins text-sm text-ink">Occupancy</span>
                <span className="font-poppins text-sm font-semibold text-primary">
                  {dept.occupancyRate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-poppins text-sm text-ink">Budget</span>
                <span className="font-poppins text-sm font-semibold text-primary">
                  {dept.budget}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-poppins text-sm text-ink">Equipment</span>
                <span className="font-poppins text-sm font-semibold text-primary">
                  {dept.equipmentCount} units
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-line">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-poppins text-sm text-ink">
                    Today&apos;s Patients
                  </p>
                  <p className="font-poppins text-lg font-semibold text-primary">
                    {dept.stats.patientsToday}
                  </p>
                </div>
                <div>
                  <p className="font-poppins text-sm text-ink">
                    Available Beds
                  </p>
                  <p className="font-poppins text-lg font-semibold text-primary">
                    {dept.stats.availableBeds}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="font-poppins text-lg font-semibold text-primary mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Assign Staff", icon: faUserPlus },
            { name: "Equipment Request", icon: faUserPlus },
            { name: "Budget Planning", icon: faChartPie },
            { name: "Generate Report", icon: faFileAlt },
          ].map((action) => (
            <button
              key={action.name}
              className="p-4 bg-surface text-primary rounded-lg font-poppins hover:bg-line transition-colors duration-200 flex flex-col items-center"
            >
              <FontAwesomeIcon className="mb-2 text-xl" icon={action.icon} />

              <span className="text-sm text-center">{action.name}</span>
            </button>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}

export default DepartmentSettings;
