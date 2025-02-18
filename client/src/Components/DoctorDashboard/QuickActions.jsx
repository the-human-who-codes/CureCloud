import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendarCheck,
  faFileMedical,
  faPrescription,
} from "@fortawesome/free-solid-svg-icons";

const actions = [
  { label: "Add New Patient", icon: faUsers },
  { label: "Schedule Appointment", icon: faCalendarCheck },
  { label: "Create Prescription", icon: faPrescription },
  { label: "Generate Report", icon: faFileMedical },
];

const QuickActions = () => {
  return (
    <div>
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Quick Actions
      </h2>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
        <div className="space-y-4">
          {actions.map(({ label, icon }) => (
            <button
              key={label}
              className="w-full px-4 py-3 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={icon} className="mr-2" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
