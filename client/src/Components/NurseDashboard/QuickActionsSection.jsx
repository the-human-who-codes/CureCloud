import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faPills,
  faNotesMedical,
  faUserMd,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const QuickActions = () => {
  const actions = [
    {
      name: "Record Vitals",
      icon: faHeartbeat,
      color: "text-blue-600",
    },
    {
      name: "Administer Medication",
      icon: faPills,
      color: "text-green-600",
    },
    {
      name: "Update Notes",
      icon: faNotesMedical,
      color: "text-yellow-600",
    },
    {
      name: "Request Doctor",
      icon: faUserMd,
      color: "text-purple-600",
    },
    {
      name: "Emergency Alert",
      icon: faExclamationTriangle,
      color: "text-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e1e8ff]">
      <h2 className="font-poppins text-xl font-semibold text-[#2c4ecf] mb-4">
        Quick Actions
      </h2>
      <div className="space-y-4">
        {actions.map((action) => (
          <button
            key={action.name}
            className="w-full px-4 py-3 bg-[#f8faff] text-[#2c4ecf] rounded-lg font-poppins hover:bg-[#e1e8ff] transition-colors duration-200 flex items-center"
          >
            <FontAwesomeIcon
              icon={action.icon}
              className={`mr-2 ${action.color}`}
            />
            {action.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
