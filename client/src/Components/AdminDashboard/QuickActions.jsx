import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faUsers,
  faFileMedical,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

function QuickActions() {
  const actions = [
    { name: "Add New Doctor", icon: faUserMd },
    { name: "Add New Patient", icon: faUsers },
    { name: "Generate Reports", icon: faFileMedical },
    { name: "System Settings", icon: faCog },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-line">
      <h2 className="font-poppins text-xl font-semibold text-primary mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            className="p-4 bg-surface text-primary rounded-lg font-poppins hover:bg-line transition-colors duration-200 flex flex-col items-center"
          >
            <FontAwesomeIcon icon={action.icon} className="mb-2 text-xl" />
            <span className="text-sm text-center">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
